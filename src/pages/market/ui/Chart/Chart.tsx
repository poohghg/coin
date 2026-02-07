'use client';

import { CoinViewModel } from '@/src/entities/coin';
import {
  CandlestickData,
  CandlestickSeries,
  ColorType,
  createChart,
  IChartApi,
  ISeriesApi,
  LogicalRange,
  MouseEventParams,
  Time,
} from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';

// --- Types ---

interface ChartProps {
  marketCode: string;
}

interface UpbitCandle {
  candle_date_time_utc: string; // to 파라미터용 (UTC 기준)
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
}

interface LegendData {
  open: number;
  high: number;
  low: number;
  close: number;
  changeRate: number;
}

// --- Constants ---
const THEME = {
  upColor: '#D24F45',
  downColor: '#1261C4',
  bgColor: '#FFFFFF',
  textColor: '#333333',
  gridColor: '#F0F0F0',
};

type TimeFrame = 'minutes/1' | 'minutes/15' | 'minutes/60' | 'minutes/240' | 'days' | 'weeks' | 'months';

const TIMEFRAMES: { label: string; value: TimeFrame }[] = [
  { label: '1분', value: 'minutes/1' },
  { label: '15분', value: 'minutes/15' },
  { label: '1시간', value: 'minutes/60' },
  { label: '4시간', value: 'minutes/240' },
  { label: '일', value: 'days' },
  { label: '주', value: 'weeks' },
  { label: '월', value: 'months' },
];

const formatPrice = (price: number) => price.toLocaleString();
const formatRate = (rate: number) => `${(rate * 100).toFixed(2)}%`;

export const UpbitChart = ({ marketCode }: ChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  // 데이터 관리
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('days');
  const [allData, setAllData] = useState<CandlestickData[]>([]); // 전체 데이터 스토어
  const [currentLegend, setCurrentLegend] = useState<LegendData | null>(null);

  // 로딩 상태 및 무한 스크롤 제어
  const isLoadingRef = useRef(false); // Ref로 관리하여 클로저 문제 해결
  const oldestTimeRef = useRef<string | null>(null); // to 파라미터용 시간 저장

  // --- API Fetch Helper ---
  const fetchCandles = async (isLoadMore = false) => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    try {
      // 1. to 파라미터 설정
      // to가 있으면 그 시간 '이전' 데이터를 달라고 요청
      const toParam =
        isLoadMore && oldestTimeRef.current ? `&to=${oldestTimeRef.current.replace('T', ' ').replace('Z', '')}` : '';

      const url = `https://api.upbit.com/v1/candles/${timeFrame}?market=${marketCode}&count=200${toParam}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed');

      // 업비트는 [최신, ... , 과거] 순서로 줍니다.
      const json: UpbitCandle[] = await response.json();
      if (json.length === 0) return;

      // 2. [중요] 다음 요청을 위한 '가장 오래된 시간' 추출
      // sort() 하기 전에 원본 json의 맨 마지막 요소(가장 과거)를 저장해야 안전합니다.
      const lastItem = json[json.length - 1];
      oldestTimeRef.current = lastItem.candle_date_time_utc;

      // 3. 데이터 변환
      const newData: CandlestickData[] = json.map(item => {
        const date = new Date(item.candle_date_time_kst);
        const time = (date.getTime() / 1000) as Time;
        return {
          time,
          open: item.opening_price,
          high: item.high_price,
          low: item.low_price,
          close: item.trade_price,
        };
      });

      // 4. [핵심] 병합 + 중복제거 + 재정렬 (안전 장치)
      setAllData(prev => {
        // 기존 데이터와 새 데이터를 합칩니다.
        const combined = [...newData, ...prev];

        // Map을 사용하여 'time'이 중복되는 데이터를 제거합니다. (나중 데이터가 덮어씀)
        const uniqueMap = new Map();
        combined.forEach(item => {
          uniqueMap.set(item.time, item);
        });

        // Map 값을 배열로 만들고, 반드시 시간 순(오름차순)으로 정렬합니다.
        const sortedData = Array.from(uniqueMap.values()).sort((a, b) => {
          return (a.time as number) - (b.time as number);
        });

        return sortedData;
      });
    } catch (e) {
      console.error(e);
    } finally {
      isLoadingRef.current = false;
    }
  };

  // 1. TimeFrame 변경 시 초기화 및 첫 로딩
  useEffect(() => {
    setAllData([]);
    oldestTimeRef.current = null;
    fetchCandles(false);
  }, [marketCode, timeFrame]);

  // 2. allData 변경 시 차트에 반영
  useEffect(() => {
    if (seriesRef.current && allData.length > 0) {
      seriesRef.current.setData(allData);
      // 초기 로딩일 때만 fitContent (무한 스크롤 때는 위치 유지)
      // oldestTimeRef가 null이 아니라는 건 이미 로딩이 한 번 되었다는 뜻이므로
      // 로직을 정교화할 수 있지만, 여기선 데이터가 200개(초기값)일 때만 fitContent
      if (allData.length <= 200) {
        chartRef.current?.timeScale().fitContent();
      }
    }
  }, [allData]);

  // 3. 차트 생성 및 이벤트 리스너
  useEffect(() => {
    if (!chartContainerRef.current) return;
    const height = window.innerHeight - chartContainerRef.current.getBoundingClientRect().top;
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: height,
      layout: {
        background: { type: ColorType.Solid, color: THEME.bgColor },
        textColor: THEME.textColor,
        fontFamily: "'Pretendard', sans-serif",
      },
      grid: { vertLines: { color: THEME.gridColor }, horzLines: { color: THEME.gridColor } },
      rightPriceScale: { borderVisible: false },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
      },
      localization: {
        priceFormatter: (price: number) => CoinViewModel.formatPrice(price as number),
        dateFormat: 'yyyy-MM-dd',
        timeFormatter: (time: Time) => {
          const date = new Date((time as number) * 1000);
          return date.toLocaleString();
        },
      },
      crosshair: {
        mode: 1,
        vertLine: { labelVisible: true },
        horzLine: { labelVisible: true },
      },
      handleScroll: {
        horzTouchDrag: true,
        vertTouchDrag: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true, // 핀치 줌 활성화
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: THEME.upColor,
      downColor: THEME.downColor,
      borderVisible: false,
      wickUpColor: THEME.upColor,
      wickDownColor: THEME.downColor,
    });

    chartRef.current = chart;
    seriesRef.current = series;

    // --- [핵심] Logical Range Change 구독 (무한 스크롤) ---
    chart.timeScale().subscribeVisibleLogicalRangeChange((newRange: LogicalRange | null) => {
      if (newRange) {
        // 왼쪽 끝(index 0)에 가까워지면 (예: 10개 미만 남았을 때) 추가 로딩
        if (newRange.from < 10) {
          fetchCandles(true); // isLoadMore = true
        }
      }
    });

    // Crosshair 구독 (Tooltip)
    chart.subscribeCrosshairMove((param: MouseEventParams) => {
      if (!param.point || !param.time) {
        setCurrentLegend(null);
        return;
      }
      const data = param.seriesData.get(series) as CandlestickData | undefined;
      if (data) {
        const rate = (data.close - data.open) / data.open;
        setCurrentLegend({
          open: data.open,
          high: data.high,
          low: data.low,
          close: data.close,
          changeRate: rate,
        });
      }
    });

    const handleResize = () => chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []); // 의존성 배열 비움 (Ref로 상태 접근)

  const getColorClass = (rate: number) => (rate > 0 ? 'text-[#D24F45]' : rate < 0 ? 'text-[#1261C4]' : 'text-gray-900');
  const colorClass = currentLegend ? getColorClass(currentLegend.changeRate) : '';

  return (
    <div className="w-full bg-white">
      <div className="flex items-center">
        <div className="flex gap-1 rounded-lg bg-gray-100">
          {TIMEFRAMES.map(tf => (
            <button
              key={tf.value}
              onClick={() => setTimeFrame(tf.value)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                timeFrame === tf.value ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full">
        {/* Floating Legend */}
        {currentLegend && (
          <div className="pointer-events-none absolute top-0 left-3 z-10 flex gap-3 rounded border border-gray-100 bg-white/90 text-xs shadow-sm backdrop-blur-sm">
            <div className="flex gap-1">
              <span className="text-gray-500">시</span>
              <span className={colorClass}>{formatPrice(currentLegend.open)}</span>
            </div>
            <div className="flex gap-1">
              <span className="text-gray-500">고</span>
              <span className={colorClass}>{formatPrice(currentLegend.high)}</span>
            </div>
            <div className="flex gap-1">
              <span className="text-gray-500">저</span>
              <span className={colorClass}>{formatPrice(currentLegend.low)}</span>
            </div>
            <div className="flex gap-1">
              <span className="text-gray-500">종</span>
              <span className={colorClass}>
                {formatPrice(currentLegend.close)}{' '}
                <span className="ml-1">({formatRate(currentLegend.changeRate)})</span>
              </span>
            </div>
          </div>
        )}
        <div ref={chartContainerRef} className="w-full" />
      </div>
    </div>
  );
};

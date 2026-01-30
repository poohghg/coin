'use client';

import { CandlestickData, CandlestickSeries, ColorType, createChart, IChartApi, Time } from 'lightweight-charts';
import { Star } from 'lucide-react'; // --- 타입 정의 ---
import React, { useEffect, useRef, useState } from 'react';

// --- 타입 정의 ---

interface UpbitTicker {
  market: string;
  trade_price: number;
  opening_price: number;
  high_price: number;
  low_price: number;
  prev_closing_price: number;
  change: 'RISE' | 'FALL' | 'EVEN';
  change_rate: number;
  change_price: number;
  acc_trade_volume_24h: number;
  acc_trade_price_24h: number;
}

interface OrderbookUnit {
  ask_price: number;
  bid_price: number;
  ask_size: number;
  bid_size: number;
}

interface UpbitOrderbook {
  market: string;
  total_ask_size: number;
  total_bid_size: number;
  orderbook_units: OrderbookUnit[];
}

interface Trade {
  price: number;
  volume: number;
  type: 'ask' | 'bid'; // ask=매도(파랑), bid=매수(빨강)
  time: string;
}

// --- 더미 데이터 ---

const dummyTicker: UpbitTicker = {
  market: 'KRW-BTC',
  trade_price: 96250000,
  opening_price: 95000000,
  high_price: 96500000,
  low_price: 94800000,
  prev_closing_price: 95000000,
  change: 'RISE',
  change_rate: 0.0131,
  change_price: 1250000,
  acc_trade_volume_24h: 3420.12,
  acc_trade_price_24h: 150000000000,
};

const dummyOrderbook: UpbitOrderbook = {
  market: 'KRW-BTC',
  total_ask_size: 15.5,
  total_bid_size: 20.2,
  orderbook_units: [
    // 매도 호가 (Ask) - 가격 높은 순
    { ask_price: 96500000, bid_price: 0, ask_size: 2.0, bid_size: 0 },
    { ask_price: 96450000, bid_price: 0, ask_size: 0.1, bid_size: 0 },
    { ask_price: 96400000, bid_price: 0, ask_size: 3.2, bid_size: 0 },
    { ask_price: 96350000, bid_price: 0, ask_size: 1.5, bid_size: 0 },
    { ask_price: 96300000, bid_price: 0, ask_size: 0.5, bid_size: 0 },
    // 매수 호가 (Bid) - 가격 낮은 순
    { ask_price: 0, bid_price: 96250000, ask_size: 0, bid_size: 1.2 },
    { ask_price: 0, bid_price: 96200000, ask_size: 0, bid_size: 2.0 },
    { ask_price: 0, bid_price: 96150000, ask_size: 0, bid_size: 0.8 },
    { ask_price: 0, bid_price: 96100000, ask_size: 0, bid_size: 5.5 },
    { ask_price: 0, bid_price: 96050000, ask_size: 0, bid_size: 3.1 },
  ],
};

const dummyTrades: Trade[] = [
  { price: 96250000, volume: 0.012, type: 'bid', time: '11:20:01' },
  { price: 96250000, volume: 0.5, type: 'bid', time: '11:20:00' },
  { price: 96200000, volume: 1.2, type: 'ask', time: '11:19:58' },
  { price: 96250000, volume: 0.005, type: 'bid', time: '11:19:55' },
  { price: 96200000, volume: 0.1, type: 'ask', time: '11:19:50' },
  { price: 96200000, volume: 0.33, type: 'ask', time: '11:19:48' },
  { price: 96250000, volume: 0.02, type: 'bid', time: '11:19:45' },
  { price: 96250000, volume: 0.01, type: 'bid', time: '11:19:40' },
];

// --- 차트 컴포넌트 (변경 없음) ---
const TradingViewChart = ({ interval }: { interval: string }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const chart = createChart(chartContainerRef.current, {
      layout: { background: { type: ColorType.Solid, color: 'white' }, textColor: '#333' },
      width: chartContainerRef.current.clientWidth,
      height: 350,
      grid: { vertLines: { visible: false }, horzLines: { color: '#f0f3fa' } },
      rightPriceScale: { borderColor: '#f0f3fa' },
      timeScale: { borderColor: '#f0f3fa' },
    });
    chartRef.current = chart;
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#ef4444',
      downColor: '#3b82f6',
      borderVisible: false,
      wickUpColor: '#ef4444',
      wickDownColor: '#3b82f6',
    });
    const initialData: CandlestickData<Time>[] = [
      { time: '2024-05-15', open: 92000000, high: 93500000, low: 91500000, close: 93000000 },
      { time: '2024-05-16', open: 93000000, high: 94500000, low: 92800000, close: 94000000 },
      { time: '2024-05-17', open: 94000000, high: 95000000, low: 93500000, close: 93800000 },
      { time: '2024-05-18', open: 93800000, high: 94800000, low: 93200000, close: 94500000 },
      { time: '2024-05-19', open: 94500000, high: 95500000, low: 94200000, close: 95000000 },
      { time: '2024-05-20', open: 95000000, high: 96500000, low: 94800000, close: 96250000 },
    ];
    candlestickSeries.setData(initialData);
    chart.timeScale().fitContent();
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [interval]);
  return <div ref={chartContainerRef} className="h-[350px] w-full" />;
};

// --- 메인 컴포넌트 ---

export default function CoinDetail() {
  const [activeTab, setActiveTab] = useState<'order' | 'chart' | 'my'>('order');
  const [chartInterval, setChartInterval] = useState('일');

  // 주문 관련 상태
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [price, setPrice] = useState<number>(dummyTicker.trade_price);
  const [amount, setAmount] = useState<string>('');

  const totalAmount = price * (parseFloat(amount) || 0);
  const maxOrderVol = Math.max(...dummyOrderbook.orderbook_units.map(u => Math.max(u.ask_size, u.bid_size)));

  // 호가창 렌더링 헬퍼
  const renderRowHeight = 'h-[44px]'; // 행 높이 통일

  return (
    <div className="pd-[10 00px] mx-auto w-full border-x border-gray-100 bg-white font-sans text-gray-900 shadow-xl select-none">
      {/* 3. 메인 컨텐츠 */}
      <div className="bg-white pb-[280px]">
        {/* --- TAB: 호가 (Orderbook) --- */}
        {activeTab === 'order' && (
          <div className="animate-fade-in text-sm">
            {/* 3열 레이아웃: 좌측(체결/잔량) | 중앙(가격) | 우측(정보/잔량) */}
            <div className="flex">
              {/* [좌측 열] */}
              <div className="flex flex-1 flex-col border-r border-gray-50">
                {/* 상단: 매도 잔량 (Ask Size) */}
                <div className="flex flex-col justify-end">
                  {dummyOrderbook.orderbook_units
                    .filter(u => u.ask_price > 0)
                    .map((unit, i) => (
                      <div
                        key={`ask-vol-${i}`}
                        className={`${renderRowHeight} relative flex items-center justify-end px-2`}
                      >
                        {/* 파란색 바 (오른쪽 정렬 효과를 위해 div 배치) */}
                        <div
                          className="absolute top-1 right-0 bottom-1 bg-blue-100/50"
                          style={{ width: `${(unit.ask_size / maxOrderVol) * 100}%` }}
                        />
                        <span className="z-10 font-medium text-gray-600">{unit.ask_size.toFixed(3)}</span>
                      </div>
                    ))}
                </div>

                {/* 하단: 체결 내역 (Trades) */}
                <div className="border-t border-gray-100">
                  <div className="flex h-[40px] items-center justify-between bg-gray-50/50 px-2">
                    <span className="text-xs text-gray-400">체결강도</span>
                    <span className="text-xs font-bold text-red-500">166.96%</span>
                  </div>
                  <div className="flex flex-col">
                    {dummyTrades.map((trade, i) => (
                      <div key={i} className="flex h-[30px] items-center justify-between px-2 text-xs">
                        <span className={trade.type === 'bid' ? 'text-gray-800' : 'text-gray-800'}>
                          {trade.price.toLocaleString()}
                        </span>
                        <span className={trade.type === 'bid' ? 'text-red-500' : 'text-blue-500'}>
                          {trade.volume.toFixed(3)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* [중앙 열] 가격 (Prices) */}
              <div className="flex w-[120px] flex-col border-r border-gray-50">
                {/* 매도 호가 (파란색) */}
                {dummyOrderbook.orderbook_units
                  .filter(u => u.ask_price > 0)
                  .map((unit, i) => (
                    <div
                      key={`ask-price-${i}`}
                      className={`${renderRowHeight} flex cursor-pointer flex-col items-center justify-center border-b border-white bg-blue-50/30 hover:bg-gray-50`}
                      onClick={() => setPrice(unit.ask_price)}
                    >
                      <span className="text-[15px] font-bold text-blue-600">{unit.ask_price.toLocaleString()}</span>
                      <span className="text-[10px] text-blue-400">-0.90%</span>
                    </div>
                  ))}

                {/* 매수 호가 (빨간색) */}
                {dummyOrderbook.orderbook_units
                  .filter(u => u.bid_price > 0)
                  .map((unit, i) => (
                    <div
                      key={`bid-price-${i}`}
                      className={`${renderRowHeight} relative flex cursor-pointer flex-col items-center justify-center border-b border-white bg-red-50/30 hover:bg-gray-50`}
                      onClick={() => setPrice(unit.bid_price)}
                    >
                      {/* 현재가 테두리 표시 (첫번째 매수호가에 ��시) */}
                      {i === 0 && <div className="pointer-events-none absolute inset-0 border-2 border-black" />}

                      <span className="text-[15px] font-bold text-red-600">{unit.bid_price.toLocaleString()}</span>
                      <span className="text-[10px] text-red-400">-1.03%</span>
                    </div>
                  ))}
              </div>

              {/* [우측 열] */}
              <div className="flex flex-1 flex-col">
                {/* 상단: 종목 정보 (요청하신 부분) */}
                <div className="flex h-[220px] flex-col gap-3 p-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">52주 최고</span>
                    <span className="font-medium text-gray-700">{dummyTicker.high_price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">52주 최저</span>
                    <span className="font-medium text-gray-700">
                      {/*{dummyTicker.lowest_52_week_price?.toLocaleString() || '48,333'}*/}
                    </span>
                  </div>
                  <div className="my-1 h-px bg-gray-100" />

                  <div className="flex justify-between">
                    <span className="text-gray-400">시작</span>
                    <span className="font-medium text-gray-700">{dummyTicker.opening_price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">최고</span>
                    <span className="font-medium text-red-500">{dummyTicker.high_price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">최저</span>
                    <span className="font-medium text-blue-500">{dummyTicker.low_price.toLocaleString()}</span>
                  </div>

                  <div className="my-1 h-px bg-gray-100" />

                  <div className="flex justify-between">
                    <span className="text-gray-400">거래량</span>
                    <span className="font-medium text-gray-700">
                      {dummyTicker.acc_trade_volume_24h.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">어제보다</span>
                    <span className="font-medium text-red-500">2.17%</span>
                  </div>
                </div>

                {/* 하단: 매수 잔량 (Bid Size) */}
                <div className="flex flex-col border-t border-gray-100">
                  {dummyOrderbook.orderbook_units
                    .filter(u => u.bid_price > 0)
                    .map((unit, i) => (
                      <div key={`bid-vol-${i}`} className={`${renderRowHeight} relative flex items-center px-2`}>
                        {/* 빨간색 바 (왼쪽 정렬) */}
                        <div
                          className="absolute top-1 bottom-1 left-0 bg-red-100/50"
                          style={{ width: `${(unit.bid_size / maxOrderVol) * 100}%` }}
                        />
                        <span className="z-10 text-left font-medium text-gray-600">{unit.bid_size.toFixed(3)}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: 차트 (Chart) --- */}
        {activeTab === 'chart' && (
          <div className="animate-fade-in">
            <div className="flex justify-between border-b border-gray-50 bg-white px-4 py-3">
              {['1초', '1분', '1일', '1주', '1월', '1년'].map(t => (
                <button
                  key={t}
                  onClick={() => setChartInterval(t)}
                  className={`rounded-md px-2 py-1 text-xs transition-colors ${
                    chartInterval === t ? 'bg-gray-100 font-bold text-black' : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <TradingViewChart interval={chartInterval} />
          </div>
        )}

        {/* --- TAB: 내주식 (My) --- */}
        {activeTab === 'my' && (
          <div className="animate-fade-in p-8 text-center text-gray-400">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
              <Star className="h-6 w-6 text-gray-300" />
            </div>
            <p className="text-sm">보유중인 자산이 없습니다.</p>
          </div>
        )}
      </div>

      {/* 4. 하단 주문창 (Order Sheet) */}
      {/*<div className="fixed bottom-0 z-50 w-full max-w-md overflow-hidden rounded-t-2xl bg-white shadow-[0_-5px_30px_rgba(0,0,0,0.1)]">*/}
      {/*  <div className="flex">*/}
      {/*    <button*/}
      {/*      onClick={() => setOrderType('buy')}*/}
      {/*      className={`flex-1 py-3 text-sm font-bold transition-colors ${orderType === 'buy' ? 'border-t-2 border-red-500 bg-white text-red-500' : 'border-t border-gray-100 bg-gray-50 text-gray-400'}`}*/}
      {/*    >*/}
      {/*      매수*/}
      {/*    </button>*/}
      {/*    <button*/}
      {/*      onClick={() => setOrderType('sell')}*/}
      {/*      className={`flex-1 py-3 text-sm font-bold transition-colors ${orderType === 'sell' ? 'border-t-2 border-blue-500 bg-white text-blue-500' : 'border-t border-gray-100 bg-gray-50 text-gray-400'}`}*/}
      {/*    >*/}
      {/*      매도*/}
      {/*    </button>*/}
      {/*  </div>*/}

      {/*  <div className="space-y-4 p-5">*/}
      {/*    <div className="flex items-center justify-between">*/}
      {/*      <span className="w-12 text-sm font-bold text-gray-500">가격</span>*/}
      {/*      <div className="flex flex-1 items-center justify-end gap-2">*/}
      {/*        <button onClick={() => setPrice(p => p - 1000)} className="rounded-full p-2 hover:bg-gray-100">*/}
      {/*          <Minus className="h-4 w-4 text-gray-400" />*/}
      {/*        </button>*/}
      {/*        <input*/}
      {/*          type="number"*/}
      {/*          value={price}*/}
      {/*          onChange={e => setPrice(Number(e.target.value))}*/}
      {/*          className="w-32 border-b border-gray-200 p-1 text-right text-lg font-bold outline-none focus:border-black"*/}
      {/*        />*/}
      {/*        <span className="text-sm font-medium">원</span>*/}
      {/*        <button onClick={() => setPrice(p => p + 1000)} className="rounded-full p-2 hover:bg-gray-100">*/}
      {/*          <Plus className="h-4 w-4 text-gray-400" />*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*    </div>*/}

      {/*    <div className="flex items-center justify-between">*/}
      {/*      <span className="w-12 text-sm font-bold text-gray-500">수량</span>*/}
      {/*      <div className="flex flex-1 flex-col items-end gap-2">*/}
      {/*        <div className="flex items-center gap-2">*/}
      {/*          <input*/}
      {/*            type="text"*/}
      {/*            placeholder="0"*/}
      {/*            value={amount}*/}
      {/*            onChange={e => setAmount(e.target.value)}*/}
      {/*            className="w-32 border-b border-gray-200 p-1 text-right text-lg font-bold placeholder-gray-200 outline-none focus:border-black"*/}
      {/*          />*/}
      {/*          <span className="text-sm font-medium">BTC</span>*/}
      {/*        </div>*/}
      {/*        <div className="flex gap-1">*/}
      {/*          {[10, 25, 50, 100].map(pct => (*/}
      {/*            <button*/}
      {/*              key={pct}*/}
      {/*              className="rounded bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-500 hover:bg-gray-200"*/}
      {/*              onClick={() => setAmount((0.5 * (pct / 100)).toString())}*/}
      {/*            >*/}
      {/*              {pct === 100 ? '최대' : `${pct}%`}*/}
      {/*            </button>*/}
      {/*          ))}*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}

      {/*    <div className="mt-2 flex items-center justify-between border-t border-dashed border-gray-200 py-3">*/}
      {/*      <span className="text-sm text-gray-500">총 주문금액</span>*/}
      {/*      <span className="text-xl font-bold">*/}
      {/*        {totalAmount > 0 ? totalAmount.toLocaleString() : '0'}*/}
      {/*        <span className="ml-1 text-sm font-normal text-gray-500">원</span>*/}
      {/*      </span>*/}
      {/*    </div>*/}

      {/*    <button*/}
      {/*      className={`w-full rounded-xl py-4 text-lg font-bold text-white shadow-md transition-transform active:scale-[0.98] ${*/}
      {/*        orderType === 'buy' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'*/}
      {/*      }`}*/}
      {/*    >*/}
      {/*      {orderType === 'buy' ? '매수하기' : '매도하기'}*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}

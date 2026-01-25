'use client';

import { HEADER_SIZE } from '@/src/app/constant/size';
import { Coin } from '@/src/entities/coin';
import { useLiveCoin } from '@/src/entities/coin/lib/useUpbitWebSocket';
import { CoinViewModel } from '@/src/entities/coin/ui/CoinViewModel';
import { FavoriteCoinButton } from '@/src/features/coin/ui';
import { If } from '@/src/shared/uiKit';

const ListHeader = ({ fetchAt }: { fetchAt: Date }) => {
  const data = new Date(fetchAt);
  const time = `${data.getHours()}:${data.getMinutes().toString().padStart(2, '0')}`;

  return (
    <li
      className={`
        bg-white sticky z-10 flex w-full items-center py-3 text-gray-500 text-[14px] font-semibold border-y border-gray-200 shadow-sm max-[360px]:text-[0.8125em] max-[320px]:text-[0.6875em]">
    `}
      style={{ top: `${44 + HEADER_SIZE.LAYOUT_HEIGHT}px` }}
    >
      <div className="flex flex-1 min-w-0 pl-6">
        <span>순위·실시간 {time} 기준</span>
      </div>
      <div className="w-[29%] text-right">현재가</div>
      <div className="w-[18%] text-right ml-4">전일대비</div>
      <div className="w-[14%] text-right ml-4">거래대금(24H)</div>
    </li>
  );
};

const ListRow = ({ coin, rank }: { coin: Coin; rank: number }) => {
  const liveCoin = useLiveCoin(coin.market, coin);
  const changeColor = CoinViewModel.changeColor(liveCoin.change_type);

  return (
    <li className="flex w-full items-center py-3 text-[15px] max-[360px]:text-[0.8125em] max-[320px]:text-[0.6875em] rounded-2xl hover:bg-gray-200 hover:text-black cursor-pointer transition-colors duration-200">
      <div className={'flex items-center justify-center w-6'}>
        <FavoriteCoinButton coinId={liveCoin.symbol} />
      </div>
      {/* 순위 */}
      <div className="flex items-center justify-center w-8.5">
        <div className="font-medium text-gray-900">{rank}</div>
      </div>
      {/* 코인명 */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="font-medium text-gray-900">{liveCoin.korean_name}</div>
        <div className="text-[0.8em] text-gray-500 truncate">{liveCoin.english_name}</div>
      </div>
      {/* 현재가 */}
      <div className="w-[29%] text-right">
        <div className={`font-medium tabular-nums ${changeColor}`}>
          {CoinViewModel.formatPrice(liveCoin.trade_price)}
        </div>
      </div>
      {/* 전일대비 */}
      <div className="w-[18%] text-right ml-4">
        <div className={`flex justify-end items-center gap-0.5 font-medium tabular-nums ${changeColor}`}>
          {CoinViewModel.formatChangeRate(liveCoin.signed_change_rate)}
        </div>
        <div className={`text-[0.8em] tabular-nums ${changeColor}`}>
          {CoinViewModel.formatPrice(liveCoin.change_price)}
        </div>
      </div>
      {/* 거래대금 */}
      <div className="w-[14%] text-right ml-4">
        <div className="font-medium tabular-nums text-gray-900">
          {CoinViewModel.formatVolume(liveCoin.acc_trade_price_24h)}
        </div>
      </div>
    </li>
  );
};

interface RealTimeChartProps {
  coins: Coin[];
  fetchedAt: Date;
}

const RealTimeChart = ({ coins, fetchedAt }: RealTimeChartProps) => {
  return (
    <div>
      <ul className="divide-y divide-gray-100">
        <ListHeader fetchAt={fetchedAt} />
        {coins.map((coin, index) => (
          <ListRow key={coin.market} coin={coin} rank={index + 1} />
        ))}
        <If condition={coins.length === 0}>
          <div className="text-center text-gray-500 py-10">해당 코인이 없습니다.</div>
        </If>
      </ul>
    </div>
  );
};

export default RealTimeChart;

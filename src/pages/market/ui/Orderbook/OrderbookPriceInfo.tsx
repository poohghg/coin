import { CoinDetail } from '@/src/entities/coin/model/type';
import { CoinViewModel } from '@/src/entities/coin/ui';
import React from 'react';

interface OrderbookPriceInfoProps {
  coin: CoinDetail;
}

export const OrderbookPriceInfo = ({ coin }: OrderbookPriceInfoProps) => {
  return (
    <div className={'text-[11px]'}>
      <div className="border-b border-gray-300 py-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">거래량</span>
          <span>{CoinViewModel.formatVolume(coin.acc_trade_volume_24h)}</span>
        </div>
        <div className={'text-right'}>{coin.symbol}</div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">거래대금</span>
          <span>{CoinViewModel.formatTradePrice(coin.acc_trade_price_24h)}</span>
        </div>
      </div>
      <div className="border-b border-gray-300 py-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">52주 최고</span>
          <span className="text-red-500">{CoinViewModel.formatPrice(coin.highest_52_week_price)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">52주 최저</span>
          <span className="text-blue-500">{CoinViewModel.formatPrice(coin.lowest_52_week_price)}</span>
        </div>
      </div>
      <div className="space-y-1 py-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">전일종가</span>
          <span>{CoinViewModel.formatPrice(coin.prev_closing_price)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">당일고가</span>
          <span className="text-red-500">{CoinViewModel.formatPrice(coin.high_price)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">당일저가</span>
          <span className="text-blue-500">{CoinViewModel.formatPrice(coin.low_price)}</span>
        </div>
      </div>
    </div>
  );
};

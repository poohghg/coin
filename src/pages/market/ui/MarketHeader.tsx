'use client';

import { CoinDetail } from '@/src/entities/coin/model/type';
import { CoinViewModel } from '@/src/entities/coin/ui';
import { FavoriteCoinButton } from '@/src/features/coin/ui';
import React from 'react';

interface DetailHeaderProps {
  coin: CoinDetail;
}

export const MarketHeader = ({ coin }: DetailHeaderProps) => {
  const changeColor = CoinViewModel.changeColorClass(coin.change_type);
  return (
    <section className="flex items-center justify-between px-3 py-3 shadow-sm">
      <div className="flex flex-grow flex-col">
        <div className="mb-2 flex items-center gap-2">
          <h1 className="text-lg font-semibold text-gray-900">{coin.korean_name}</h1>
          <span className="rounded-full bg-gray-100 py-0.5 text-xs font-medium text-gray-500">
            {coin.symbol.toUpperCase()}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-3xl font-bold text-gray-900">{coin.trade_price.toLocaleString()}원</div>
          <div className={`text-sm font-medium`}>
            <span>어제보다</span>
            <span className={`${changeColor}`}> {CoinViewModel.formatSignedPrice(coin.signed_change_price)}</span>
            <span className={`${changeColor}`}> ({CoinViewModel.formatChangeRate(coin.signed_change_rate)})</span>
          </div>
        </div>
      </div>
      <FavoriteCoinButton coinId={coin.market} starClassName="h-6 w-6" />
    </section>
  );
};

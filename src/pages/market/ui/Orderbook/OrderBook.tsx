import { Spacing } from '@/src/shared/uiKit';
import React from 'react';

interface OrderBookProps {
  AskOrderBooks: React.ReactNode;
  BidOrderBooks: React.ReactNode;
  PriceInfo: React.ReactNode;
  RecentTrades: React.ReactNode;
}

export const OrderBook = ({ AskOrderBooks, BidOrderBooks, PriceInfo, RecentTrades }: OrderBookProps) => {
  return (
    <div>
      <div className="flex w-full">
        {/* 매도 리스트 */}
        {AskOrderBooks}
        {/* 우측 정보 패널 */}
        <div className="relative w-[32vw]">
          <div className={'absolute bottom-0 left-0 w-full'}>{PriceInfo}</div>
        </div>
      </div>
      <Spacing size={1} className={'bg-gray-300'} />
      <div className="flex w-full">
        {/* 체결창 */}
        <div className="w-[32vw]">{RecentTrades}</div>
        {/* 매도 리스트 */}
        {BidOrderBooks}
      </div>
    </div>
  );
};

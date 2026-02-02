import { CoinChangeType } from '@/src/entities/coin/model/type';
import { CoinViewModel } from '@/src/entities/coin/ui';
import { Orderbook } from '@/src/entities/orderbook';
import { TradeSide, TradeTick } from '@/src/entities/trade';
import { Button, cn, If } from '@/src/shared/uiKit';
import React, { useMemo } from 'react';

const OrderQuantity = ({
  barWidth,
  size,
  sideColor,
  type,
}: {
  type: TradeSide;
  barWidth: number;
  size: number;
  sideColor: string;
}) => {
  return (
    <div
      className={`relative flex h-full w-[32vw] items-center py-1.5 ${type === 'ASK' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={cn('h-full opacity-50', sideColor)} style={{ width: `${barWidth}%` }} />
      <span className="absolute z-10 text-[11px] text-gray-800">{CoinViewModel.formatVolume(size)}</span>
    </div>
  );
};

const OrderPrice = ({ price, rate, changeType }: { price: number; rate: number; changeType: CoinChangeType }) => {
  const color = CoinViewModel.changeColorClass(changeType);
  return (
    <Button
      className={'flex h-full flex-1 flex-col items-center justify-center gap-0 rounded-none border-x border-gray-300'}
    >
      {/* 가격 */}
      <div className="text-xs font-bold">
        <span className={color}>{CoinViewModel.formatPrice(price)}</span>
      </div>
      {/* 변동률 */}
      <div className="text-xs">
        <span className={color}>{CoinViewModel.formatChangeRate(rate)}</span>
      </div>
    </Button>
  );
};

const OrderBookRow = ({
  type,
  unit,
  closePrice,
  maxVol,
}: {
  type: TradeSide;
  unit: { price: number; size: number };
  closePrice: number;
  maxVol: number;
}) => {
  const sideColor = type === 'ASK' ? 'bg-blue-500' : 'bg-red-500';
  const barWidth = Math.min((unit.size / maxVol) * 100, 100);
  const changeRate = CoinViewModel.getChangeRate(unit.price, closePrice);
  const changeType = CoinViewModel.getChangeType(unit.price, closePrice);
  return (
    <li
      className={`flex h-[45px] items-center justify-between ${type === `ASK` ? `hover:bg-blue-100` : `hover:bg-red-100`} hover:bg-opacity-10`}
    >
      <If condition={type === 'ASK'}>
        <OrderQuantity type={type} barWidth={barWidth} size={unit.size} sideColor={sideColor} />
      </If>
      <OrderPrice price={unit.price} rate={changeRate} changeType={changeType} />
      <If condition={type === 'BID'}>
        <OrderQuantity type={type} barWidth={barWidth} size={unit.size} sideColor={sideColor} />
      </If>
    </li>
  );
};

interface OrderBookListProps {
  type: TradeSide;
  orderBooks: Orderbook;
  prevClose: number;
  recentTrade: TradeTick;
}

export const OrderBookList = ({ type, orderBooks, prevClose, recentTrade }: OrderBookListProps) => {
  const maxVol = Math.max(orderBooks.totalAskSize, orderBooks.totalBidSize);

  const units = useMemo(() => {
    return type === 'ASK' ? [...orderBooks.units].reverse() : orderBooks.units;
  }, [type, orderBooks.units]);

  return (
    <ul className="flex flex-1 flex-col justify-end">
      {units.map((u, idx) => {
        return (
          <OrderBookRow
            key={`ask-${idx}`}
            type={type}
            unit={type === 'ASK' ? { price: u.askPrice, size: u.askSize } : { price: u.bidPrice, size: u.bidSize }}
            closePrice={prevClose}
            maxVol={maxVol}
          />
        );
      })}
    </ul>
  );
};

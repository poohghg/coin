import { CoinDetail } from '@/src/entities/coin/model/type';
import { DerivedCoin, DerivedCoinProps } from './DerivedCoin';

export interface DerivedCoinDetailProps extends DerivedCoinProps {
  opening_price: number;
  high_price: number;
  low_price: number;
  prev_closing_price: number;
  trade_volume: number;
  acc_trade_volume: number;
  acc_trade_volume_24h: number;
  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
}

export class DerivedCoinDetail extends DerivedCoin implements CoinDetail {
  constructor(private readonly detailProps: DerivedCoinDetailProps) {
    super(detailProps);
  }

  get opening_price() {
    return this.detailProps.opening_price;
  }
  get high_price() {
    return this.detailProps.high_price;
  }
  get low_price() {
    return this.detailProps.low_price;
  }
  get prev_closing_price() {
    return this.detailProps.prev_closing_price;
  }
  get trade_volume() {
    return this.detailProps.trade_volume;
  }
  get acc_trade_volume() {
    return this.detailProps.acc_trade_volume;
  }
  get acc_trade_volume_24h() {
    return this.detailProps.acc_trade_volume_24h;
  }
  get highest_52_week_price() {
    return this.detailProps.highest_52_week_price;
  }
  get highest_52_week_date() {
    return this.detailProps.highest_52_week_date;
  }
  get lowest_52_week_price() {
    return this.detailProps.lowest_52_week_price;
  }
  get lowest_52_week_date() {
    return this.detailProps.lowest_52_week_date;
  }

  toJSON(): CoinDetail {
    return {
      ...super.toJSON(),
      opening_price: this.opening_price,
      high_price: this.high_price,
      low_price: this.low_price,
      prev_closing_price: this.prev_closing_price,
      trade_volume: this.trade_volume,
      acc_trade_volume: this.acc_trade_volume,
      acc_trade_volume_24h: this.acc_trade_volume_24h,
      highest_52_week_price: this.highest_52_week_price,
      highest_52_week_date: this.highest_52_week_date,
      lowest_52_week_price: this.lowest_52_week_price,
      lowest_52_week_date: this.lowest_52_week_date,
    };
  }
}

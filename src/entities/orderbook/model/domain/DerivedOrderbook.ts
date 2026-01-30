import { Orderbook, OrderbookUnit } from '@/src/entities/orderbook/model/type';

interface Props {
  market: string;
  timestamp: number;
  totalAskSize: number;
  totalBidSize: number;
  units: OrderbookUnit[];
}

export class DerivedOrderbook implements Orderbook {
  constructor(private readonly props: Props) {}

  get market() {
    return this.props.market;
  }

  get timestamp() {
    return this.props.timestamp;
  }

  get totalAskSize() {
    return this.props.totalAskSize;
  }

  get totalBidSize() {
    return this.props.totalBidSize;
  }

  get units() {
    return this.props.units;
  }

  // get askUnits() {
  //   return this.props.units.filter(unit => unit.askPrice > 0);
  // }

  toJSON(): Orderbook {
    return { ...this.props };
  }
}

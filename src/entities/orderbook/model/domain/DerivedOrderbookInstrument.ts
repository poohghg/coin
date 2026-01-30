import { OrderbookInstrument } from '@/src/entities/orderbook/model/type';

interface OrderbookInstrumentProps {
  market: string;
  quoteCurrency: string;
  tickSize: number;
  supportedLevels: number[];
}

export class DerivedOrderbookInstrument implements OrderbookInstrument {
  constructor(public readonly props: OrderbookInstrumentProps) {}

  get market() {
    return this.props.market;
  }

  get quoteCurrency() {
    return this.props.quoteCurrency;
  }

  get tickSize() {
    return this.props.tickSize;
  }

  get supportedLevels() {
    return this.props.supportedLevels;
  }

  toJSON(): OrderbookInstrument {
    return { ...this.props };
  }
}

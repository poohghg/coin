// entities/trade/model/domain/DerivedTradeTick.ts
import { TradeTick } from '../type';

export class DerivedTradeTick implements TradeTick {
  constructor(private readonly props: TradeTick) {}

  get market() {
    return this.props.market;
  }

  get timestamp() {
    return this.props.timestamp;
  }

  get price() {
    return this.props.price;
  }

  get volume() {
    return this.props.volume;
  }

  get prevClosingPrice() {
    return this.props.prevClosingPrice;
  }

  get changePrice() {
    return this.props.changePrice;
  }

  get side() {
    return this.props.side;
  }

  get id() {
    return this.props.id;
  }

  get tradeDateUtc() {
    return this.props.tradeDateUtc;
  }

  get tradeTimeUtc() {
    return this.props.tradeTimeUtc;
  }

  toJSON(): TradeTick {
    return { ...this.props };
  }
}

export type TradeSide = 'ASK' | 'BID'; // ask: 매도, bid: 매수

export interface OrderbookUnit {
  askPrice: number;
  bidPrice: number;
  askSize: number;
  bidSize: number;
}

export interface Orderbook {
  market: string;
  timestamp: number;
  totalAskSize: number;
  totalBidSize: number;
  units: OrderbookUnit[];
}

export interface OrderbookInstrument {
  market: string;
  quoteCurrency: string;
  tickSize: number;
  supportedLevels: number[];
}

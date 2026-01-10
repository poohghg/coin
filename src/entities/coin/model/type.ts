export type CoinChangeType = 'RISE' | 'FALL' | 'EVEN';

export interface MarketEvent {
  warning: boolean;
  caution: {
    PRICE_FLUCTUATIONS: boolean; // 급등락
    TRADING_VOLUME_SOARING: boolean; // 거래량 급증
    DEPOSIT_AMOUNT_SOARING: boolean; // 입금액 급증
    GLOBAL_PRICE_DIFFERENCES: boolean; // 글로벌 시세 차이
    CONCENTRATION_OF_SMALL_ACCOUNTS: boolean; // 소액 계좌 집중
  };
}

// 코인명,현재가,전일대비(가격, 퍼센트),거래대금
export interface Coin {
  market: string;
  korean_name: string;
  english_name: string;
  trade_price: number;
  change_price: number;
  change_rate: number;
  trade_volume: number;
  change_type: CoinChangeType;
  market_event: MarketEvent;
  // symbol: string;
  // name: string;
  // price: number;
  // image: string;
  // change24h: number;
  // volume24h: number;
  // marketCap: number;
  // formattedPrice: string;
  // formattedChange24h: string;
  // changeColor: string;
  // formattedVolume24h: string;
  // formattedMarketCap: string;
  // marketEvent: MarketEvent;
}

export interface CoinDetail extends Coin {
  opening_price: number;
  high_price: number;
  low_price: number;
  prev_closing_price: number;

  acc_trade_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume: number;
  acc_trade_volume_24h: number;

  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
}

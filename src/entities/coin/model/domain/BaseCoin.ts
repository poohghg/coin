import { Coin, CoinChangeType, MarketEvent } from '@/src/entities/coin/model/type';

// 코인명,현재가,전일대비(가격, 퍼센트),거래대금
export class BaseCoin implements Coin {
  constructor(
    public readonly market: string,
    public readonly korean_name: string,
    public readonly english_name: string,
    public readonly trade_price: number,
    public readonly change_price: number,
    public readonly change_rate: number,
    public readonly trade_volume: number,
    public readonly change_type: CoinChangeType,
    public readonly market_event: MarketEvent
  ) {}

  // 아래 부분은 뷰모델로 옮기는게 맞음
  // get formattedChange24h(): string {
  //   const sign = this.change24h > 0 ? '+' : '';
  //   const formatted = Formatter.asGeneralNumber(this.change24h);
  //   return `${sign}${formatted}%`;
  // }
  //
  // get changeColor(): string {
  //   if (this.change24h > 0) return 'text-green-400';
  //   if (this.change24h < 0) return 'text-red-400';
  //   return 'text-gray-400';
  // }
  //
  // get formattedVolume24h(): string {
  //   return Formatter.asAbbreviatedUSD(this.volume24h);
  // }
  //
  // get formattedMarketCap(): string {
  //   return Formatter.asAbbreviatedUSD(this.marketCap);
  // }
  //
  // toJSON(): Coin {
  //   return {
  //     symbol: this._symbol,
  //     name: this._name,
  //     image: this._image,
  //     price: this._price,
  //     change24h: this._change24h,
  //     volume24h: this._volume24h,
  //     marketCap: this._marketCap,
  //     formattedPrice: this.formattedPrice,
  //     formattedChange24h: this.formattedChange24h,
  //     changeColor: this.changeColor,
  //     formattedVolume24h: this.formattedVolume24h,
  //     formattedMarketCap: this.formattedMarketCap,
  //   };
  // }

  toJSON(): Coin {
    return {
      market: this.market,
      korean_name: this.korean_name,
      english_name: this.english_name,
      trade_price: this.trade_price,
      change_price: this.change_price,
      change_rate: this.change_rate,
      trade_volume: this.trade_volume,
      change_type: this.change_type,
      market_event: this.market_event,
      // isWarning: this.isWarning,
      // isCautionPriceFluctuations: this.isCautionPriceFluctuations,
      // isCautionTradingVolumeSoaring: this.isCautionTradingVolumeSoaring,
      // isCautionDepositAmountSoaring: this.isCautionDepositAmountSoaring,
      // isCautionGlobalPriceDifferences: this.isCautionGlobalPriceDifferences,
      // isCautionConcentrationOfSmallAccounts: this.isCautionConcentrationOfSmallAccounts,
    };
  }
}

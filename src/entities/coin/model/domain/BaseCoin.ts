import { Coin } from '@/src/entities/coin/model/type';
import { Formatter } from '@/src/shared/lib/formatCurrency';

export class BaseCoin implements Coin {
  constructor(
    private _symbol: string,
    private _name: string,
    private _image: string,
    private _price: number,
    private _change24h: number,
    private _volume24h: number,
    private _marketCap: number
  ) {}

  get symbol(): string {
    return this._symbol;
  }

  get name(): string {
    return this._name;
  }

  get image(): string {
    return this._image;
  }

  get price(): number {
    return this._price;
  }

  get change24h(): number {
    return this._change24h;
  }

  get volume24h(): number {
    return this._volume24h;
  }

  get marketCap(): number {
    return this._marketCap;
  }

  get formattedPrice(): string {
    return Formatter.asUSD(this.price);
  }

  get formattedChange24h(): string {
    const sign = this.change24h > 0 ? '+' : '';
    const formatted = Formatter.asGeneralNumber(this.change24h);
    return `${sign}${formatted}%`;
  }

  get changeColor(): string {
    if (this.change24h > 0) return 'text-green-400';
    if (this.change24h < 0) return 'text-red-400';
    return 'text-gray-400';
  }

  get formattedVolume24h(): string {
    return Formatter.asAbbreviatedUSD(this.volume24h);
  }

  get formattedMarketCap(): string {
    return Formatter.asAbbreviatedUSD(this.marketCap);
  }

  toJSON(): Coin {
    return {
      symbol: this._symbol,
      name: this._name,
      image: this._image,
      price: this._price,
      change24h: this._change24h,
      volume24h: this._volume24h,
      marketCap: this._marketCap,
      formattedPrice: this.formattedPrice,
      formattedChange24h: this.formattedChange24h,
      changeColor: this.changeColor,
      formattedVolume24h: this.formattedVolume24h,
      formattedMarketCap: this.formattedMarketCap,
    };
  }
}

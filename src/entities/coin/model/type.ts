export interface Coin {
  symbol: string;
  name: string;
  price: number;
  image: string;
  change24h: number;
  volume24h: number;
  marketCap: number;
  formattedPrice: string;
  formattedChange24h: string;
  changeColor: string;
  formattedVolume24h: string;
  formattedMarketCap: string;
}

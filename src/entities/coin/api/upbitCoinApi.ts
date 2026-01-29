import { CoinMarketDTO, CoinMarketsSchema, CoinTickerDTO, CoinTickersSchema } from '@/src/entities/coin/model/schema';
import { FetchBuilder, ISuccessResponse } from '@/src/shared/lib/api';

export interface UpbitCoinApi {
  fetchCoinMarketAll(): Promise<ISuccessResponse<CoinMarketDTO[]>>;
  fetchCoinTicker(): Promise<ISuccessResponse<CoinTickerDTO[]>>;
  fetchCoinTickerByMarket(market: string): Promise<ISuccessResponse<CoinTickerDTO[]>>;
}

export class UpbitCoinApiImpl implements UpbitCoinApi {
  /**
   * 업비트에서 지원하는 모든 마켓 코드와 마켓명을 가져옵니다.
   * https://docs.upbit.com/kr/reference/list-trading-pairs
   */
  async fetchCoinMarketAll() {
    const url = 'https://api.upbit.com/v1/market/all';
    const res = await new FetchBuilder(url)
      .params({
        isDetails: 'true',
      })
      .build()
      .request<CoinMarketDTO[]>();

    return {
      ...res,
      data: CoinMarketsSchema.parse(res.data),
    };
  }

  /**
   * 업비트에서 KRW 마켓의 모든 코인 시세 정보를 가져옵니다.
   * https://docs.upbit.com/kr/reference/list-quote-tickers
   */
  async fetchCoinTicker() {
    const url = 'https://api.upbit.com/v1/ticker/all';
    const res = await new FetchBuilder(url)
      .params({
        quote_currencies: 'KRW',
      })
      .build()
      .request<CoinTickerDTO[]>();

    return {
      ...res,
      data: CoinTickersSchema.parse(res.data),
    };
  }

  /**
   * 특정 마켓의 현재가 정보를 가져옵니다.
   * 페어 단위 현재가 조회
   * https://api.upbit.com/v1/ticker
   */
  async fetchCoinTickerByMarket(market: string) {
    const url = 'https://api.upbit.com/v1/ticker';
    const res = await new FetchBuilder(url)
      .params({
        markets: market,
      })
      .build()
      .request<CoinTickerDTO[]>();

    return {
      ...res,
      data: CoinTickersSchema.parse(res.data),
    };
  }
}

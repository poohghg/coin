import { CoinDTO } from '@/src/entities/coin/model/dto';
import { FetchBuilder, IErrorResponse, ISuccessResponse } from '@/src/shared/lib/api';

export interface CoinApi {
  fetchCoinList(): Promise<ISuccessResponse<CoinDTO[]> | IErrorResponse<null>>;
}

export class CoinApiImpl implements CoinApi {
  async fetchCoinList() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets';
    const res = await new FetchBuilder(url)
      .params({
        vs_currency: 'usd',
        per_page: '250',
      })
      .build()
      .request<CoinDTO[]>();

    return res;
  }
}

import {
  OrderbookDTO,
  OrderbookInstrumentDTO,
  OrderbookInstrumentsSchema,
  OrderbooksSchema,
} from '@/src/entities/orderbook/model/schema';
import { FetchBuilder, ISuccessResponse } from '@/src/shared/lib/api';

export interface UpbitOrderbookApi {
  fetchOrderbook(market: string): Promise<ISuccessResponse<OrderbookDTO[]>>;
  fetchOrderbookInstruments(): Promise<ISuccessResponse<OrderbookInstrumentDTO[]>>;
}

export class UpbitOrderbookApiImpl implements UpbitOrderbookApi {
  /**
   * 특정 마켓의 호가 정보 조회
   * https://docs.upbit.com/kr/reference/list-orderbook-instruments
   */
  async fetchOrderbook(market: string) {
    const url = 'https://api.upbit.com/v1/orderbook';
    const res = await new FetchBuilder(url).params({ markets: market }).build().request<OrderbookDTO[]>();

    return {
      ...res,
      data: OrderbooksSchema.parse(res.data),
    };
  }

  /**
   * 업비트 호가 정책 조회
   * https://docs.upbit.com/kr/reference/list-orderbook-instruments
   */
  async fetchOrderbookInstruments() {
    const url = 'https://api.upbit.com/v1/orderbook/instruments';
    const res = await new FetchBuilder(url).build().request<OrderbookInstrumentDTO[]>();

    return {
      ...res,
      data: OrderbookInstrumentsSchema.parse(res.data),
    };
  }
}

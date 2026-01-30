import { UpbitOrderbookApi, UpbitOrderbookApiImpl } from '@/src/entities/orderbook/api/UpbitOrderbookApi';
import { OrderbookMapper } from '@/src/entities/orderbook/model/mapper';
import { Orderbook } from '@/src/entities/orderbook/model/type';

export interface OrderbookRepository {
  getOrderbook(market: string): Promise<Orderbook>;
}

export class OrderbookRepositoryImpl implements OrderbookRepository {
  private api: UpbitOrderbookApi;

  constructor() {
    this.api = new UpbitOrderbookApiImpl();
  }

  async getOrderbook(market: string) {
    const res = await this.api.fetchOrderbook(market);
    const dto = res.data[0];

    return OrderbookMapper.toOrderbook(dto);
  }
}

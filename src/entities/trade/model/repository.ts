import { UpbitTradeApi, UpbitTradeApiImpl } from '@/src/entities/trade/api/UpbitTradeApiImpl';
import { TradeTickMapper } from '@/src/entities/trade/model/mapper';
import { TradeTick } from '@/src/entities/trade/model/type';

export interface TradeRepository {
  getRecentTrades(market: string, count?: number, to?: string, cursor?: string): Promise<TradeTick[]>;
}

export class TradeRepositoryImpl implements TradeRepository {
  private api: UpbitTradeApi;

  constructor() {
    this.api = new UpbitTradeApiImpl();
  }

  async getRecentTrades(market: string, count?: number, to?: string, cursor?: string) {
    const res = await this.api.fetchTradeTicks(market, count, to, cursor);
    return res.data.map(TradeTickMapper.toTradeTick);
  }
}

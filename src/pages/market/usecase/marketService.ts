import { CoinRepository, CoinRepositoryImpl } from '@/src/entities/coin';
import { CoinDetail } from '@/src/entities/coin/model/type';
import { OrderbookRepository, OrderbookRepositoryImpl } from '@/src/entities/orderbook/model/repository';
import { Orderbook } from '@/src/entities/orderbook/model/type';

interface MarketUseCase {
  getCoinDetail(market: string): Promise<CoinDetail>;
  getOrderbook(market: string): Promise<Orderbook>;
}

class MarketService implements MarketUseCase {
  constructor(
    private coinRepository: CoinRepository,
    private orderbookRepository: OrderbookRepository
  ) {
    this.coinRepository = coinRepository;
  }

  getCoinDetail = async (market: string) => {
    return await this.coinRepository.getCoinDetail(market);
  };

  getOrderbook = async (market: string) => {
    return await this.orderbookRepository.getOrderbook(market);
  };
}

const coinRepository = new CoinRepositoryImpl();
const orderbookRepository = new OrderbookRepositoryImpl();
export const marketService = new MarketService(coinRepository, orderbookRepository);

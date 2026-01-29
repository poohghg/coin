import { Coin, CoinRepository, CoinRepositoryImpl } from '@/src/entities/coin';

interface HomeUseCase {
  getCoinList(): Promise<{
    data: Coin[];
    fetchedAt: Date;
  }>;
}

class MarketService implements HomeUseCase {
  constructor(private coinRepository: CoinRepository) {
    this.coinRepository = coinRepository;
  }

  getCoinDetail = async (market: string) => {
    const date = new Date();

    const coin = await this.coinRepository.getCoinDetail(market);

    return {
      data: coin,
      fetchedAt: date,
    };
  };
}

const coinRepository = new CoinRepositoryImpl();
export const homeUseCase = new MarketService(coinRepository);

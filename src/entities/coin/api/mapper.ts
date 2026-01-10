import { Coin } from '@/src/entities/coin';
import { CoinMarketDTO, CoinPriceDTO } from '@/src/entities/coin/api/schema';
import { BaseCoin } from '@/src/entities/coin/model/domain';

export class CoinMapper {
  static toCoin(coinMarketDTO: CoinMarketDTO, coinPriceDTO: CoinPriceDTO): Coin {
    return new BaseCoin(
      coinMarketDTO.market,
      coinMarketDTO.korean_name,
      coinMarketDTO.english_name,
      coinPriceDTO.trade_price,
      coinPriceDTO.change_price,
      coinPriceDTO.change_rate,
      coinPriceDTO.acc_trade_volume_24h,
      coinPriceDTO.change,
      coinMarketDTO.market_event
    );
  }
}

import { Coin } from '@/src/entities/coin';
import { DerivedCoin } from '@/src/entities/coin/model/domain/DerivedCoin';
import { CoinMarketDTO, CoinPriceDTO, UpbitSocketTickerPartialDTO } from '@/src/entities/coin/model/schema';

export class CoinMapper {
  static toCoin(coinMarketDTO: CoinMarketDTO, coinPriceDTO: CoinPriceDTO): Coin {
    return new DerivedCoin(
      coinMarketDTO.market,
      coinMarketDTO.korean_name,
      coinMarketDTO.english_name,
      coinPriceDTO.trade_price,
      coinPriceDTO.opening_price,
      coinPriceDTO.high_price,
      coinPriceDTO.low_price,
      coinPriceDTO.change_price,
      coinPriceDTO.change_rate,
      coinPriceDTO.signed_change_rate,
      coinPriceDTO.trade_volume,
      coinPriceDTO.acc_trade_price,
      coinPriceDTO.acc_trade_price_24h,
      coinPriceDTO.change,
      coinMarketDTO.market_event
    ).toJSON();
  }

  static toCoinFromSocket(currentCoin: Coin, socketDTO: UpbitSocketTickerPartialDTO): Coin {
    return new DerivedCoin(
      currentCoin.market,
      currentCoin.korean_name,
      currentCoin.english_name,
      socketDTO.trade_price,
      currentCoin.opening_price,
      socketDTO.high_price,
      socketDTO.low_price,
      socketDTO.change_price,
      socketDTO.change_rate,
      socketDTO.signed_change_rate,
      socketDTO.trade_volume,
      socketDTO.acc_trade_price,
      socketDTO.acc_trade_price_24h,
      socketDTO.change,
      {
        warning: currentCoin.isWarning,
        caution: {
          PRICE_FLUCTUATIONS: currentCoin.isCautionPriceFluctuations,
          TRADING_VOLUME_SOARING: currentCoin.isCautionTradingVolumeSoaring,
          DEPOSIT_AMOUNT_SOARING: currentCoin.isCautionDepositAmountSoaring,
          GLOBAL_PRICE_DIFFERENCES: currentCoin.isCautionGlobalPriceDifferences,
          CONCENTRATION_OF_SMALL_ACCOUNTS: currentCoin.isCautionConcentrationOfSmallAccounts,
        },
      }
    );
  }
}

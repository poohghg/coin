import { z } from 'zod';

export const CoinMarketSchema = z.object({
  market: z.string(), // 페어의 고유한 코드
  korean_name: z.string(),
  english_name: z.string(),
  market_event: z.object({
    warning: z.boolean(),
    caution: z.object({
      PRICE_FLUCTUATIONS: z.boolean(),
      TRADING_VOLUME_SOARING: z.boolean(),
      DEPOSIT_AMOUNT_SOARING: z.boolean(),
      GLOBAL_PRICE_DIFFERENCES: z.boolean(),
      CONCENTRATION_OF_SMALL_ACCOUNTS: z.boolean(),
    }),
  }),
});

export const CoinMarketsSchema = z.array(CoinMarketSchema);
export type CoinMarketDTO = z.infer<typeof CoinMarketSchema>;

export const CoinPriceSchema = z.object({
  market: z.string(),

  trade_date: z.string(),
  trade_time: z.string(),
  trade_date_kst: z.string(),
  trade_time_kst: z.string(),
  trade_timestamp: z.number(),

  opening_price: z.number(),
  high_price: z.number(),
  low_price: z.number(),
  trade_price: z.number(),
  prev_closing_price: z.number(),

  change: z.enum(['EVEN', 'RISE', 'FALL']),
  change_price: z.number(),
  change_rate: z.number(),
  signed_change_price: z.number(),
  signed_change_rate: z.number(),

  trade_volume: z.number(),

  acc_trade_price: z.number(),
  acc_trade_price_24h: z.number(),
  acc_trade_volume: z.number(),
  acc_trade_volume_24h: z.number(),

  highest_52_week_price: z.number(),
  highest_52_week_date: z.string(),
  lowest_52_week_price: z.number(),
  lowest_52_week_date: z.string(),

  timestamp: z.number(),
});

export const CoinPricesSchema = z.array(CoinPriceSchema);
export type CoinPriceDTO = z.infer<typeof CoinPriceSchema>;

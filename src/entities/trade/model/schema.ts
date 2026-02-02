import { z } from 'zod';

export const TradeTickSchema = z.object({
  market: z.string(),
  trade_date_utc: z.string(),
  trade_time_utc: z.string(),
  timestamp: z.number(),
  trade_price: z.number(),
  trade_volume: z.number(),
  prev_closing_price: z.number().optional(),
  change_price: z.number().optional(),
  ask_bid: z.string(), // "ASK" | "BID"
  sequential_id: z.number(),
});

export const TradeTicksSchema = z.array(TradeTickSchema);

export type UpbitTradeTickDTO = z.infer<typeof TradeTickSchema>;

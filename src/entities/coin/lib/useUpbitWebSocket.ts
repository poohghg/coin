import { Coin } from '@/src/entities/coin';
import { useUpbitSocketBase } from '@/src/entities/coin/lib/useUpbitSocketBase';
import { CoinMapper } from '@/src/entities/coin/model/mapper';
import { UpbitSocketTickerDTO, UpbitSocketTickerPartialSchema } from '@/src/entities/coin/model/schema';
import { useMemo } from 'react';

export const useLiveCoin = (code: string, initialCoin: Coin) => {
  const { data: socketData } = useUpbitSocketBase<UpbitSocketTickerDTO>({
    type: 'ticker',
    code: code,
  });

  return useMemo(() => {
    if (!socketData) {
      return initialCoin;
    }

    const result = UpbitSocketTickerPartialSchema.safeParse(socketData);

    if (!result.success) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[Socket Error] ${code}:`, result.error);
      }
      return initialCoin;
    }

    return CoinMapper.toCoinFromSocket(initialCoin, result.data);
  }, [socketData, initialCoin, code]);
};

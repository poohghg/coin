import { Coin } from '@/src/entities/coin/model';
import { useSearchCoinStore } from '@/src/features/coin';
import { useMemo } from 'react';

export const useSearchedCoins = (coins: Coin[]) => {
  const searchQuery = useSearchCoinStore(state => state.query);
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return useMemo(() => {
    if (!normalizedQuery) {
      return coins;
    }

    return coins.filter(
      coin =>
        coin.korean_name.toLowerCase().includes(normalizedQuery) ||
        coin.english_name.toLowerCase().includes(normalizedQuery) ||
        coin.symbol.toLowerCase().includes(normalizedQuery)
    );
  }, [coins, normalizedQuery]);
};

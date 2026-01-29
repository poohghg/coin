import { Coin } from '@/src/entities/coin/model/type';
import { homeUseCase } from '@/src/pages/home/usecase/homeService';
import { ServerFetcher } from '@/src/shared/uiKit';
import { ReactNode } from 'react';

interface CoinListFetcherProps {
  children: (data: { data: Coin[]; fetchedAt: Date }) => ReactNode;
}

const CoinListFetcher = ({ children }: CoinListFetcherProps) => {
  return (
    <ServerFetcher
      fetcher={homeUseCase.getCoinList}
      errorComponent={error => {
        return <>Failed to load coin data. Please try again later.</>;
        // if (error.equals(HttpErrorCodes.TOO_MANY_REQUESTS)) {
        //   return <>Rate limit exceeded. Please try again later.</>;
        // }
        // return <>An error occurred while fetching market data.</>;
      }}
    >
      {data => children(data)}
    </ServerFetcher>
  );
};

export default CoinListFetcher;

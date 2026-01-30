import { CoinDetail } from '@/src/entities/coin/model/type';
import { MarketTabList } from '@/src/pages/market/ui/MarketTabList';
import { OrderBook } from '@/src/pages/market/ui/OrderBook';
import { marketService } from '@/src/pages/market/usecase/marketService';
import { ServerFetcher, Spacing, Tabs, TabsPanel } from '@/src/shared/uiKit';
import { FilterBar } from '@/src/shared/uiKit/ui/FilterBar/ui/FilterBar';

interface MarketTabProps {
  coin: CoinDetail;
}

export const MarketTab = ({ coin }: MarketTabProps) => {
  return (
    <Tabs defaultKey={'a'} className={'w-full px-3'}>
      <MarketTabList />
      <Spacing size={12} />
      <TabsPanel tabKey={'a'}>
        <ServerFetcher fetcher={() => marketService.getOrderbook(coin.market)}>
          {orderbook => <OrderBook orderBook={orderbook} coin={coin} />}
        </ServerFetcher>
        {/*<CoinDetail />*/}
      </TabsPanel>
    </Tabs>
  );
};

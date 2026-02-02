import { CoinDetail } from '@/src/entities/coin/model/type';
import { MarketTabList } from '@/src/pages/market/ui/MarketTabList';
import { OrderBook } from '@/src/pages/market/ui/Orderbook/OrderBook';
import { OrderBookList } from '@/src/pages/market/ui/Orderbook/OrderBookList';
import { OrderbookPriceInfo } from '@/src/pages/market/ui/Orderbook/OrderbookPriceInfo';
import { RecentTrades } from '@/src/pages/market/ui/Orderbook/RecentTrades';

import { marketService } from '@/src/pages/market/usecase/marketService';
import { ServerFetcher, Spacing, Tabs, TabsPanel } from '@/src/shared/uiKit';

interface MarketTabProps {
  coin: CoinDetail;
}

export const MarketTab = ({ coin }: MarketTabProps) => {
  return (
    <Tabs defaultKey={'a'} className={'w-full px-3'}>
      <MarketTabList />
      <Spacing size={12} />
      <TabsPanel tabKey={'a'}>
        <ServerFetcher fetcher={() => marketService.getMarketData(coin.market)}>
          {({ orderBook, recentTrades }) => (
            <OrderBook
              AskOrderBooks={
                <OrderBookList
                  type="ASK"
                  orderBooks={orderBook}
                  prevClose={coin.prev_closing_price}
                  recentTrade={recentTrades[0]}
                />
              }
              BidOrderBooks={
                <OrderBookList
                  type="BID"
                  orderBooks={orderBook}
                  prevClose={coin.prev_closing_price}
                  recentTrade={recentTrades[0]}
                />
              }
              PriceInfo={<OrderbookPriceInfo coin={coin} />}
              RecentTrades={<RecentTrades tradeTicks={recentTrades} />}
            />
          )}
        </ServerFetcher>
      </TabsPanel>
    </Tabs>
  );
};

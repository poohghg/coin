'use client';

import { Coin } from '@/src/entities/coin';
import { CoinSearchBar, FavoritesCoins, useSearchedCoins, useSortCoins } from '@/src/features/coin';
import { HomeTabs } from '@/src/pages/home/constant';
import { ListFilter } from '@/src/pages/home/ui/ListFilter';
import RealTimeChart from '@/src/pages/home/ui/RealTimeChart';
import { If, Spacing, Tabs } from '@/src/shared/uiKit';

interface HomeTabPanelsProps {
  coins: Coin[];
  fetchedAt: Date;
}

const HomeTabPanels = ({ coins, fetchedAt }: HomeTabPanelsProps) => {
  const searchedCoins = useSearchedCoins(coins);
  const { sortedCoins, sortState, changeSortState, changeDirection } = useSortCoins(searchedCoins);
  return (
    <div>
      <CoinSearchBar />
      <Spacing size={24} />
      <ListFilter changeSortState={changeSortState} sortState={sortState} changeDirection={changeDirection} />
      {HomeTabs.map(({ tabKey }) => (
        <Tabs.Panel key={tabKey} tabKey={tabKey}>
          <If condition={tabKey === 'live'}>
            <RealTimeChart coins={sortedCoins} fetchedAt={fetchedAt} />
          </If>
          <If condition={tabKey === 'favorite'}>
            <FavoritesCoins coins={sortedCoins}>
              {favoriteCoins => <RealTimeChart coins={favoriteCoins} fetchedAt={fetchedAt} />}
            </FavoritesCoins>
          </If>
        </Tabs.Panel>
      ))}
    </div>
  );
};

export default HomeTabPanels;

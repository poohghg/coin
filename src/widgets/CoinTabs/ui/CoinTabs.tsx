import { CoinListFetcher } from '@/src/entities/coin';
import { CoinSearchBar, CoinTabKeys } from '@/src/features/coin';
import { Tabs } from '@/src/shared/uiKit';
import CoinTabList from '@/src/widgets/CoinTabs/ui/CoinTabList';
import CoinTabPanels from '@/src/widgets/CoinTabs/ui/CoinTabPanels';
import React from 'react';

const COIN_TABS: {
  tabKey: CoinTabKeys;
  label: string;
}[] = [
  { tabKey: 'all', label: 'All Coins' },
  { tabKey: 'favorites', label: 'My Favorites' },
];

const CoinTabs = () => {
  return (
    <Tabs className="mb-6 space-y-4" defaultKey="all">
      <CoinTabList tabList={COIN_TABS} />
      <CoinSearchBar />
      <CoinListFetcher>{coins => <CoinTabPanels coins={coins} tabList={COIN_TABS} />}</CoinListFetcher>
    </Tabs>
  );
};

export default CoinTabs;

'use client';

import { CoinTabKeys } from '@/src/features/coin';
import { Tabs } from '@/src/shared/uiKit';
import React, { ReactNode } from 'react';

interface CoinTabListProps {
  tabList: {
    tabKey: CoinTabKeys;
    label: ReactNode;
  }[];
}

const CoinTabList = ({ tabList }: CoinTabListProps) => {
  return (
    <Tabs.List className="mb-6 space-y-4">
      {tabList.map(({ tabKey, label }) => (
        <Tabs.Trigger
          key={tabKey}
          className="px-4 py-2 text-sm font-semibold text-gray-400 aria-selected:text-blue-600 hover:text-white transition duration-75"
          tabKey={tabKey}
        >
          {label}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  );
};

export default CoinTabList;

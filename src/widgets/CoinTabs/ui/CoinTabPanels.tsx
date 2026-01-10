'use client';

import { Coin } from '@/src/entities/coin';
import { CoinTabKeys, FavoritesCoins, useSearchedCoins, useSortCoins } from '@/src/features/coin';
import { SwitchCase, Tabs } from '@/src/shared/uiKit';
import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react';

const CoinListTable = dynamic(() => import('@/src/features/coin/ui/CoinListTable/CoinListTable'), {
  ssr: false,
  loading: () => <div className="text-center text-gray-400">Loading coins...</div>,
});

/**
 *  data 처리 flow
 *  1. useSearchedCoins: 검색어에 따른 코인 필터링
 *  2. useSortCoins: 정렬 상태에 따른 코인 정렬
 *  3. FavoritesCoins: 즐겨찾기 코인 필터링 (favorites 탭에서만)
 */

interface CoinTabPadelProps {
  coins: Coin[];
  tabList: {
    tabKey: CoinTabKeys;
    label: ReactNode;
  }[];
}

const CoinTabPanels = ({ coins, tabList }: CoinTabPadelProps) => {
  // 두 훅의 위치는 feature 레벨에 맞게 조정
  const searchedCoins = useSearchedCoins(coins);
  const { sortedCoins, sortState, changeSortState } = useSortCoins(searchedCoins);

  return (
    <>
      {tabList.map(({ tabKey }) => (
        <SwitchCase
          key={tabKey}
          value={tabKey}
          caseBy={{
            favorites: () => (
              <Tabs.Panel tabKey="favorites">
                <FavoritesCoins coins={sortedCoins}>
                  {favoriteCoins => (
                    // 엔티티 레벨이 맞음
                    // 이름을 coinList로 변경해야함
                    <CoinListTable coins={favoriteCoins} sortState={sortState} onChangeSort={changeSortState} />
                  )}
                </FavoritesCoins>
              </Tabs.Panel>
            ),
          }}
          defaultComponent={() => (
            <Tabs.Panel tabKey={tabKey}>
              <CoinListTable coins={sortedCoins} sortState={sortState} onChangeSort={changeSortState} />
            </Tabs.Panel>
          )}
        />
      ))}
    </>
  );
};

export default CoinTabPanels;

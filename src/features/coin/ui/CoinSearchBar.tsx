'use client';

import { useSearchCoinStore } from '@/src/features/coin';
import { SearchBar } from '@/src/shared/uiKit';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';

const CoinSearchBar = () => {
  const [localQuery, setLocalQuery] = useState('');
  const setQuery = useSearchCoinStore(state => state.setQuery);

  const debouncedSetQuery = useCallback(
    debounce((newQuery: string) => {
      setQuery(newQuery);
    }, 100),
    []
  );

  const handleSearchQueryChange = (newQuery: string) => {
    setLocalQuery(newQuery);
    debouncedSetQuery(newQuery);
  };

  return (
    <SearchBar
      placeholder="Search something... (BTC, Bitcoin, B...)"
      value={localQuery}
      onChange={handleSearchQueryChange}
    />
  );
};

export default CoinSearchBar;

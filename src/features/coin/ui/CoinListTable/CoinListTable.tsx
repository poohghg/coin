'use client';

import { Coin } from '@/src/entities/coin';
import { CoinSortableField, CoinSortState } from '@/src/features/coin';
import { CoinTableHeadContent } from '@/src/features/coin/ui/CoinListTable/CoinTableHeadContent';
import { CoinTableRowContent } from '@/src/features/coin/ui/CoinListTable/CoinTableRowContent';
import { SwitchCase } from '@/src/shared/uiKit';
import React from 'react';
import { TableVirtuoso } from 'react-virtuoso';

interface CoinListTableProps {
  sortState: CoinSortState;
  coins: Coin[];
  onChangeSort: (field: CoinSortableField) => void;
}

const CoinListTable = ({ sortState, coins, onChangeSort }: CoinListTableProps) => {
  return (
    <SwitchCase
      value={coins.length}
      caseBy={{
        0: () => <div className="py-20 text-center text-gray-400">No coins found.</div>,
      }}
      defaultComponent={() => (
        <div className="bg-gray-800 rounded-xl overflow-x-auto shadow-xl">
          <TableVirtuoso
            style={{ height: 800 }}
            data={coins}
            overscan={5}
            components={{
              Table: props => <table {...props} className="min-w-full divide-y divide-gray-700 table-fixed" />,
              TableBody: React.forwardRef((props, ref) => (
                <tbody {...props} ref={ref} className="divide-y divide-gray-700" />
              )),
              TableHead: React.forwardRef((props, ref) => (
                <thead {...props} ref={ref} className="sticky top-0 bg-gray-800/90 backdrop-blur-sm z-10" />
              )),
              TableRow: props => (
                <tr {...props} className={'hover:bg-gray-700 transition duration-150 ease-in-out flex'} />
              ),
            }}
            fixedHeaderContent={() => <CoinTableHeadContent sortState={sortState} onChangeSort={onChangeSort} />}
            itemContent={(_, coin) => <CoinTableRowContent key={coin.name} coin={coin} />}
          />
        </div>
      )}
    />
  );
};

export default CoinListTable;

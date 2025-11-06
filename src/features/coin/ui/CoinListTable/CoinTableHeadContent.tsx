import { CoinSortableField, CoinSortState } from '@/src/features/coin';
import { IconArrow } from '@/src/shared/uiKit';

const HEADERS: { label: string; sortValue: CoinSortableField; width: string }[] = [
  { label: 'Price', sortValue: 'price', width: 'w-40' },
  { label: '24h %', sortValue: 'change24h', width: 'w-32' },
  { label: '24h Volume', sortValue: 'volume24h', width: 'w-48' },
  { label: 'Market Cap', sortValue: 'marketCap', width: 'w-48' },
];

interface CoinTableHeadProps {
  sortState: CoinSortState;
  onChangeSort: (field: CoinSortableField) => void;
}

export const CoinTableHeadContent = ({ sortState, onChangeSort }: CoinTableHeadProps) => {
  const handleChangeSort = (field: CoinSortableField) => () => {
    onChangeSort(field);
  };

  const iconClassName = (sortValue: CoinSortableField) => {
    if (sortValue !== sortState.field) {
      return 'opacity-50';
    }
    return sortState.direction === 'DESC' ? 'bg-blue-900 rotate-0' : 'bg-blue-900 rotate-180';
  };

  return (
    <tr className="text-xs text-gray-400 uppercase tracking-wider flex">
      <th className="px-4 py-4 text-left flex-1 min-w-70 max-w-80">Name</th>
      {HEADERS.map(({ label, sortValue, width }) => (
        <th key={label} className={`px-4 py-4 text-right flex-1`}>
          <div
            className="flex justify-end items-center space-x-1 cursor-pointer"
            role={'button'}
            onClick={handleChangeSort(sortValue)}
          >
            <span>{label}</span>
            <IconArrow className={`h-4 w-4 transition-all duration-100 rounded-2xl ${iconClassName(sortValue)}`} />
          </div>
        </th>
      ))}
    </tr>
  );
};

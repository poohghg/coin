import { Coin } from '@/src/entities/coin';
import { useFavoriteCoinStore } from '@/src/features/coin';
import { Formatter } from '@/src/shared/lib/formatCurrency';
import { IconStar, toasts } from '@/src/shared/uiKit';
import Image from 'next/image';

interface CoinTableRowProps {
  coin: Coin;
}

export const CoinTableRowContent = ({ coin }: CoinTableRowProps) => {
  const { isFavorite, toggleFavorite } = useFavoriteCoinStore();

  const handleToggleFavorite = () => {
    const isToggled = toggleFavorite(coin.name);
    toasts.success(isToggled ? 'Successfully added!' : 'Successfully deleted!');
  };

  return (
    <>
      <td className="px-4 py-4 whitespace-nowrap flex-1 min-w-70 max-w-80">
        <div className="flex items-center space-x-3">
          <button onClick={handleToggleFavorite}>
            <IconStar
              className={`h-4 w-4 cursor-pointer transition-colors ${
                isFavorite(coin.name) ? 'text-yellow-500 fill-current' : 'text-gray-500 '
              }`}
            />
          </button>
          <Image src={coin.image} alt={coin.name} width={24} height={24} className="h-6 w-6 rounded-full" />
          <div className="flex flex-col">
            <span className="text-base font-semibold text-white">{coin.symbol}</span>
            <span className="text-xs text-gray-400">{coin.name}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right flex-1">
        <div className="flex flex-col">
          <span className="text-base font-semibold text-white">{Formatter.asGeneralNumber(coin.price)}</span>
          <span className="text-xs text-gray-400">{coin.formattedPrice}</span>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right flex-1">
        <span className={`text-sm font-medium ${coin.changeColor}`}>{coin.formattedChange24h}</span>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right flex-1">
        <span className="text-sm font-medium text-white">{coin.formattedVolume24h}</span>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right flex-1">
        <span className="text-sm font-medium text-white">{coin.formattedMarketCap}</span>
      </td>
    </>
  );
};

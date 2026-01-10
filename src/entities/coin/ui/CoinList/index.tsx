import { Coin } from '@/src/entities/coin';

interface CoinListProps {
  coins: Coin[];
}

const CoinList = ({ coins }: CoinListProps) => {
  return (
    <ul className="divide-y divide-gray-100">
      {coins.map(coin => (
        <li className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
          {/*<div className="flex items-center space-x-4">*/}
          {/*  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />*/}
          {/*  <div>*/}
          {/*    <p className="text-lg font-medium text-gray-900">*/}
          {/*      {coin.name} ({coin.symbol.toUpperCase()})*/}
          {/*    </p>*/}
          {/*    <p className="text-sm text-gray-500">Current Price: ${coin.current_price.toLocaleString()}</p>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </li>
      ))}
    </ul>
  );
};

export default CoinList;

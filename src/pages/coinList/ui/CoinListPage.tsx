import { CoinTabs } from '@/src/widgets/CoinTabs';

const CoinListPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold">Coin List</h1>
        </div>
        <CoinTabs />
      </div>
    </div>
  );
};

export default CoinListPage;

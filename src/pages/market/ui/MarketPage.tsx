import { MarketHeader } from '@/src/pages/market/ui/MarketHeader';
import { MarketTab } from '@/src/pages/market/ui/MarketTab';
import { marketService } from '@/src/pages/market/usecase/marketService';

const marketPage = async ({ params }: { params: Promise<{ market: string }> }) => {
  const { market } = await params;

  const coinDetail = await marketService.getCoinDetail(market);

  if (!coinDetail) {
    return <div>Coin not found</div>;
  }

  return (
    <div className="flex w-full flex-col">
      <MarketHeader coin={coinDetail} />
      <MarketTab coin={coinDetail} />
    </div>
  );
};

export default marketPage;

import { MarketHeader } from '@/src/pages/market/ui/MarketHeader';
import { MarketTab } from '@/src/pages/market/ui/MarketTab';
import { marketService } from '@/src/pages/market/usecase/marketService';
import { ServerFetcher } from '@/src/shared/uiKit';

const marketPage = async ({ params }: { params: Promise<{ market: string }> }) => {
  const { market } = await params;

  return (
    <ServerFetcher
      fetcher={() => marketService.getCoinDetail(market)}
      errorComponent={error => {
        console.log('MarketPage error:', error);
        return <div className="mt-10 text-center">해당 코인에 대한 정보가 없습니다.</div>;
      }}
    >
      {coinDetail => (
        <div className="flex w-full flex-col">
          <MarketHeader coin={coinDetail} />
          <MarketTab coin={coinDetail} />
        </div>
      )}
    </ServerFetcher>
  );
};

export default marketPage;

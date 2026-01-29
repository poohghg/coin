import CoinDetail from '@/src/pages/market/ui/Context';

const marketPage = async ({ params }: { params: Promise<{ market: string }> }) => {
  const { market } = await params;
  return <CoinDetail />;
};

export default marketPage;

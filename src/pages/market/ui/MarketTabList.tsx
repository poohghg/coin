import { TabsList, TabsListActive, TabsTrigger } from '@/src/shared/uiKit';

export const MarketTabList = () => {
  return (
    <div className="py-3">
      <TabsList>
        <TabsListActive type={'button'} />
        <TabsTrigger className="text-[15px] font-semibold text-gray-400" tabKey={'a'}>
          호가
        </TabsTrigger>
        <TabsTrigger className="text-[15px] font-semibold text-gray-400" tabKey={'b'}>
          차트
        </TabsTrigger>
        <TabsTrigger className="text-[15px] font-semibold text-gray-400" tabKey={'c'}>
          내 자산
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

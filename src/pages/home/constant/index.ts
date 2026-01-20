// 실시간 차트, 관심 차트, 내 보유
export const HomeTabs: {
  tabKey: 'live' | 'favorite' | 'portfolio';
  label: string;
}[] = [
  { tabKey: 'live', label: '실시간 차트' },
  { tabKey: 'favorite', label: '즐겨찾기 차트' },
  { tabKey: 'portfolio', label: '내 보유' },
];

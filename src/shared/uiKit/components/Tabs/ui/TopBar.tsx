import { useTabsContext } from '@/src/shared/uiKit/components/Tabs/Context';

const TabBar = () => {
  const { selectedKey } = useTabsContext();
  return (
    <div
      ref={el => {
        if (el && selectedKey) {
          const selectedTab = document.getElementById(`tab-${selectedKey}`);
          if (selectedTab) {
            const rect = selectedTab.getBoundingClientRect();
            el.style.transform = `translateX(${selectedTab.offsetLeft}px)`;
            el.style.width = `${rect.width}px`;
          }
        }
      }}
      className="absolute bottom-0 transform-transition duration-300 h-0.5 bg-blue-500 rounded-full"
    />
  );
};

export default TabBar;

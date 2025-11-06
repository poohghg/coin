import { MergeElementProps } from '@/src/shared/model/reactElement';
import TabBar from '@/src/shared/uiKit/components/Tabs/ui/TopBar';
import { forwardRef, memo } from 'react';

interface TabsListProps {
  withBar?: boolean;
}

const TabsList = forwardRef<HTMLDivElement, MergeElementProps<'div', TabsListProps>>(
  ({ withBar, className, ...props }, ref) => {
    const hasWithBar = withBar ?? true;

    return (
      <div ref={ref} role="tablist" className={`relative ${className}`} {...props}>
        {hasWithBar && <TabBar />}
        {props.children}
      </div>
    );
  }
);

TabsList.displayName = 'TabsList';
export default memo(TabsList);

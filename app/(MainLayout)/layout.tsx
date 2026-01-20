import { MainLayout as Layout } from '@/src/app/ui';
import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default MainLayout;

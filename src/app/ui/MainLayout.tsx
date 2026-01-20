import { MainHeader } from '@/src/widgets/MainHeader';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
};

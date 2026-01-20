import { Navbar } from '@/src/widgets/MainHeader/ui/Navbar';
import Link from 'next/link';

export function MainHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="px-4">
        <div className="flex items-center justify-between h-16">
          <Link className="flex items-center space-x-2" href="/">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-[15px]">C</span>
            </div>
            <h1 className="text-[15px] font-bold text-gray-900">COIN Portfolio</h1>
          </Link>
          <Navbar />
        </div>
      </div>
    </header>
  );
}

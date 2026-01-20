'use client';

import { Home, Wallet } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathName = usePathname();

  return (
    <nav className="flex items-center space-x-1">
      <Link
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors hover: ${
          pathName === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-200'
        }`}
        href="/"
      >
        <Home className="w-5 h-5" />
        <span className="font-medium">홈</span>
      </Link>
      <Link
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          pathName === '/account' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-200'
        }`}
        href="/account"
      >
        <Wallet className="w-5 h-5" />
        <span className="font-medium">내 계좌</span>
      </Link>
    </nav>
  );
};

'use client';

import { useRouter } from 'next/navigation';

const RetryButton = () => {
  const router = useRouter();
  return (
    <button
      className="ml-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      onClick={() => router.refresh()}
    >
      Retry
    </button>
  );
};

export default RetryButton;

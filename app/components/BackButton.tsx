'use client';

import { useRouter } from 'next/navigation';
import { ArrowIcon } from './Icons';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-6 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-[#5C584F] transition hover:bg-[#E5DBCC]/60 hover:text-[#1F1F1B]"
    >
      <ArrowIcon size={16} />
      Back
    </button>
  );
}

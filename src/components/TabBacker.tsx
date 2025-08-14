import React from 'react'
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

function TabBacker() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.back()}
        className="flex cursor-pointer items-center mb-4 gap-0 hover:gap-1 transition-all duration-200 ease-in-out opacity-70"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="mb-[1px]">Back</span>
      </button>
    </div>
  );
}

export default TabBacker

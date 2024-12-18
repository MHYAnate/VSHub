import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const InteractiveMap = dynamic(
  () => import('@/components/map/interactive-map'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-screen w-full flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading map...</div>
      </div>
    )
  }
);

export default function Home() {
  return (
    <Suspense fallback={<div>Loading map...</div>}>
      <main>
        <InteractiveMap />
      </main>
    
  </Suspense>
  );
}
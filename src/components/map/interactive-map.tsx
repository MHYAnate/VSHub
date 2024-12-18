"use client";

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./map-container'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="text-gray-600">Loading map...</div>
    </div>
  ),
});

export default function InteractiveMap() {
  return <Map center={[51.505, -0.09]} zoom={13} />;
}
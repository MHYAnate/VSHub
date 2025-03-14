"use client";
import { usePWAInstall } from '@/hooks/usePWAInstall';

export default function InstallPWA() {
  const { isInstallable, handleInstall } = usePWAInstall();
  

  if (!isInstallable) return null;

  return (
    <button
      onClick={handleInstall}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Install App
    </button>
  );
}
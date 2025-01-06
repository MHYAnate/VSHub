import { Metadata } from 'next';
import { pwaConfig } from './pwa.config';

export const siteMetadata: Metadata = {
  title: pwaConfig.name,
  description: pwaConfig.description,
  manifest: '/manifest.json',
  themeColor: pwaConfig.themeColor,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  icons: [
    { rel: 'apple-touch-icon', url: '/icons/icon-192x192.png' },
    { rel: 'icon', url: '/favicon.ico' }
  ]
};
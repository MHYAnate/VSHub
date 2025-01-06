// PWA configuration
export const pwaConfig = {
  name: "Service spot 1",
  shortName: 'Sspot1',
  description: "A Dynamic Service platform",
  backgroundColor: '#ffffff',
  themeColor: '#000000',
  display: 'standalone',
  scope: '/',
  startUrl: '/',
  icons: [
    {
      src: '/service/111.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any maskable'
    },
    {
      src: '/service/111.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ]
};
import localFont from 'next/font/local'

export const cooperBT = localFont({
  src: [
    {
      path: '../public/fonts/CooperBT-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/CooperBT-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-cooperbt'
})

export const ttHovesPro = localFont({
  src: [
    {
      path: '../public/fonts/TTHovesPro-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/TTHovesPro-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-tthovespro'
}) 
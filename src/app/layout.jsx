import { cooperBT, ttHovesPro } from '../fonts'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cooperBT.variable} ${ttHovesPro.variable}`}>
      <body>{children}</body>
    </html>
  )
} 
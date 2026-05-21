import type { Metadata } from 'next'
import { Mulish, Inter } from 'next/font/google'
import './globals.css'

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-mulish',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport = {
  themeColor: '#0a192f',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'SSP Global – Software Organization in Tirupati | Training, Placements & Solutions',
  description: 'SSP Global is a leading Software Organization in Tirupati offering Software Training, Placement Support, AI Solutions, DevOps Services, Cloud Technologies & Custom Software Development.',
  keywords: [
    'SSP Global',
    'Software Organization in Tirupati',
    'Software Training Tirupati',
    'Placements Tirupati',
    'AI Training Tirupati',
    'DevOps Training Tirupati',
    'Cloud Training Tirupati',
    'Software Solutions Tirupati',
    'SSP Global Tirupati',
    'SSP STI',
    'SSP SS',
    'Software Institute Tirupati',
    'IT Training Andhra Pradesh',
  ],
  authors: [{ name: 'SSP Global' }],
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${mulish.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/images/SSP.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}

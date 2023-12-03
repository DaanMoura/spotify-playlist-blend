import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthSessionProvider from '../components/AuthSessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Playlist Matcher',
  description: 'Get the songs that you most repeat in yours playlists',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthSessionProvider>
        <body className={`${inter.className} bg-gradient-to-bl from-gray-900 to-gray-700 w-screen min-h-screen overflow-x-hidden`}>
          <div className="flex justify-center w-full h-full ">
            {children}
          </div>
        </body>
      </AuthSessionProvider>
    </html>
  )
}

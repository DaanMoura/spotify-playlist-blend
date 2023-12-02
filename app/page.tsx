"use client"

import { signIn, signOut, useSession, } from 'next-auth/react'
import Image from 'next/image'
import SpotifySearch from './components/SpotifySearch'
import sdk from '@/app/lib/spotify-sdk/ClientInstance'
import Playlists from './components/Playlists'
import { useEffect, useState } from 'react'
import { JWT,  getToken, encode} from 'next-auth/jwt'
import { env } from './env'

export default function Home() {
  const session = useSession()

  const [accessToken, setAccessToken] = useState<string | null>()
  useEffect(() => {
    (async () => {
      const accessToken = await sdk.getAccessToken()
      if (!accessToken) return


      setAccessToken(accessToken.access_token)
    })()
  , [session]})

  if (!session || session.status !== 'authenticated') {
    return (
      <div>
        <h1>Spotify Web API Typescript SDK in Next.js</h1>
        <button onClick={() => signIn("spotify")}>Sign in with Spotify</button>
      </div>
    )
  }

  return (
    <div>
      <p>Logged in as {session.data.user?.name}</p>
      <button onClick={() => signOut()}>Sign out</button>
      <Playlists sdk={sdk}/>
      token: {accessToken}
    </div> 
  )
}

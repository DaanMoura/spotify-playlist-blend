"use client"

import { signIn, signOut, useSession  } from 'next-auth/react'
import sdk from '@/app/lib/spotify-sdk/ClientInstance'
import Playlists from './components/Playlists'

export default function Home() {
  const session = useSession()

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
    </div> 
  )
}

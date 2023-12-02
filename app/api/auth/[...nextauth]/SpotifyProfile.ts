import { REFRESH_ACCESS_TOKEN_ERROR } from '@/constants/error'
import { env } from '@/app/env'
import { JWT } from 'next-auth/jwt'
import SpotifyProvider from 'next-auth/providers/spotify'

if (!env.SPOTIFY_CLIENT_ID) {
  throw new Error('Missing SPOTIFY_CLIENT_ID')
}

if (!env.SPOTIFY_CLIENT_SECRET) {
  throw new Error('Missing SPOTIFY_CLIENT_SECRET')
}

const spotifyProfile = SpotifyProvider({
  clientId: env.SPOTIFY_CLIENT_ID,
  clientSecret: env.SPOTIFY_CLIENT_SECRET
})

const authURL = new URL('https://accounts.spotify.com/authorize')

const scopes = [
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'playlist-read-private',
  'playlist-read-collaborative'
]

authURL.searchParams.append('scope', scopes.join(' '))

spotifyProfile.authorization = authURL.toString()

export default spotifyProfile

export async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(authURL, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    })

    const refreshedToken = await response.json()

    if (!response.ok) {
      throw refreshedToken
    }

    return {
      ...token,
      refreshAccessToken: refreshedToken.access_token,
      token_type: refreshedToken.token_type,
      expires_at: refreshedToken.expires_at,
      expires_in: (refreshedToken.expires_at ?? 0) - Date.now() / 1000,
      refresh_token: refreshedToken.refresh_token ?? token.refresh_token,
      scope: refreshedToken.scope
    }
  } catch (error) {
    console.error(error)
    return {
      ...token,
      error: REFRESH_ACCESS_TOKEN_ERROR
    }
  }
}

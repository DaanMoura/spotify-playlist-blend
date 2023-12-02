import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { accessTokenError } from "@/app/api/shared/errors";
import { getSpotifySdk } from "../../shared/sdk";
import { Episode, Page, PlaylistedTrack, SpotifyApi, Track } from "@spotify/web-api-ts-sdk";

type PlaylistTrack = Track | Episode

interface PlaylistWithTracks {
  name: string
  url: string
  tracks: PlaylistTrack[]
}
const getAllTracksOfPlaylist = async (sdk: SpotifyApi, playlistId: string): Promise<PlaylistWithTracks> => {
  const tracks: PlaylistTrack[] = []

  const playlistInfo = await sdk.playlists.getPlaylist(
    playlistId,
    undefined,
  )

  const playlistTacks = await sdk.playlists.getPlaylistItems(
    playlistId,
    undefined,
    undefined,
    50, 0
  )
  tracks.push(...playlistTacks.items.map(t => t.track))

  let next = playlistTacks.next
  while (next) {
    const nextPlaylist = await sdk.makeRequest<Page<PlaylistedTrack>>('GET', next)
    tracks.push(...nextPlaylist.items.map(t => t.track))
    next = nextPlaylist.next
  }

  return {
    name: playlistInfo.name,
    url: playlistInfo.external_urls.spotify,
    tracks
  }
}

const rankTracksAmongPlaylists = (playlists: PlaylistWithTracks[], limit = 100) => {
  const allTracks = playlists.flatMap(playlist => playlist.tracks)
  const tracksWithFrequency: Record<string, { track: PlaylistTrack, frequency: number }> = {}

  allTracks.forEach(track => {
    const trackId = track.id
    tracksWithFrequency[trackId] = {
      track,
      frequency: tracksWithFrequency[trackId] ? tracksWithFrequency[trackId].frequency + 1 : 1
    }
  })

  const rankedTracks = Object.values(tracksWithFrequency).map(item => ({
    ...item.track,
    frequency: item.frequency
  })).filter(track => track.frequency > 1)

  rankedTracks.sort((a, b) => b.frequency - a.frequency)

  const max = Math.min(limit, rankedTracks.length)
  return rankedTracks.slice(0, max)
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req })

  if (!token) {
    return accessTokenError
  }

  const url = new URL(req.url)
  const searchParams = url.searchParams
  const playlistIds = searchParams.get('playlists')

  if (!playlistIds) {
    return new Response('No playlists provided', { status: 400 })
  }

  const playlistIdsArray = playlistIds.split(',')

  const sdk = getSpotifySdk(token)
  const playlists = await Promise.all(playlistIdsArray.map(async (playlistId) => {
    return await getAllTracksOfPlaylist(sdk, playlistId)
  }))

  const rankedTracks = rankTracksAmongPlaylists(playlists)

  return Response.json(rankedTracks)
}
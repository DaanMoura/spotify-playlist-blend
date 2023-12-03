import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { accessTokenError } from "@/app/api/shared/errors";
import { getSpotifySdk } from "../../shared/sdk";
import { SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import { PlaylistTrackWithFrequency, PlaylistWithTracks } from "@/types";

const SIZE = 50
const getAllTracksOfPlaylist = async (sdk: SpotifyApi, playlistId: string): Promise<PlaylistWithTracks> => {
  const tracks: Track[] = []

  const playlistInfo = await sdk.playlists.getPlaylist(
    playlistId,
    undefined,
  )

  let offset = 0

  const playlistTracks = await sdk.playlists.getPlaylistItems(
    playlistId,
    undefined,
    'items(track(name, id, artists(name), album(images))),total',
    SIZE, offset, 'track'
  )

  const total = playlistTracks.total
  tracks.push(...playlistTracks.items.map(t => t.track) as Track[])

  offset = offset + SIZE

  while (offset < total) {
    const nextPlaylist = await sdk.playlists.getPlaylistItems(
      playlistId,
      undefined,
      'items(track(name, id, artists(name), album(images))),total',
      SIZE, offset, 'track'
    )
    tracks.push(...nextPlaylist.items.map(t => t.track) as Track[])
    offset = offset + SIZE
  }

  return {
    name: playlistInfo.name,
    url: playlistInfo.external_urls.spotify,
    tracks
  }
}

const rankTracksAmongPlaylists = (playlists: PlaylistWithTracks[]) => {
  const allTracks = playlists.flatMap(playlist => playlist.tracks)
  const tracksWithFrequency: Record<string, { track: Track, frequency: number }> = {}

  allTracks.forEach(track => {
    const trackId = track.id
    tracksWithFrequency[trackId] = {
      track,
      frequency: tracksWithFrequency[trackId] ? tracksWithFrequency[trackId].frequency + 1 : 1
    }
  })

  const rankedTracks: PlaylistTrackWithFrequency[] = Object.values(tracksWithFrequency).map(item => ({
    ...item.track,
    frequency: item.frequency
  })).filter(track => track.frequency > 1)

  rankedTracks.sort((a, b) => b.frequency - a.frequency)

  return rankedTracks
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
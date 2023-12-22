import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { accessTokenError } from "../../shared/errors";
import { getSpotifySdk } from "../../shared/sdk";

function sliceArrayIntoChunks<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }

  return result;
}

interface CreatePlaylistPayload {
  /** Array of track ID */
  tracks: string[]
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req })

  if (!token) {
    return accessTokenError
  }

  const payload: CreatePlaylistPayload = await req.json()

  const sdk = getSpotifySdk(token)
 
  const currentUserProfile = await sdk.currentUser.profile()
  const userId = currentUserProfile.id
  const newPlaylist = await sdk.playlists.createPlaylist(userId, {
    name: 'Your most added songs'
  })
  const playlistId = newPlaylist.id

  const slicedTracksArray = sliceArrayIntoChunks<string>(payload.tracks, 100) 
  slicedTracksArray.forEach(async (tracks) => {
    await sdk.playlists.addItemsToPlaylist(playlistId, tracks)
  })

  return Response.json({
    url: newPlaylist.external_urls.spotify,
    href: newPlaylist.href,
    uri: newPlaylist.uri
  })
}
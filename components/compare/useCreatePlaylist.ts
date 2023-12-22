"use client"

import getClientToken from "@/app/getClientToken"
import { SERVER_ERROR } from "@/constants/error"
import { NewPlaylist, PlaylistTrackWithFrequency } from "@/types"
import { useMutation } from "@tanstack/react-query"

const useCreatePlaylist = () => {
  const mutationFn = async (tracks: PlaylistTrackWithFrequency[]) => {
    const token = await getClientToken()
    const playlist = await fetch('/api/playlists/create', {
      method: 'POST',
      body: JSON.stringify({
        tracks: tracks.map(track => track.uri)
      }),
      headers: { Authorization: 'Bearer ' + token }
    })

    if (!playlist.ok) {
      throw new Error(SERVER_ERROR)
    }

    return await playlist.json() as NewPlaylist
  }

  const { mutate, isSuccess, isPending, isError, data} = useMutation({
    mutationFn,
    onSuccess: (data) => {
      window.open(data.url, '_blank')
    }
  })


  return {
    createPlaylist: mutate,
    isSuccess,
    isPending,
    isError
  }
}

export default useCreatePlaylist
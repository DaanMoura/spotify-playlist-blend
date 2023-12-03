"use client"

import getClientToken from "@/app/getClientToken"
import { SERVER_ERROR } from "@/constants/error"
import { PlaylistTrackWithFrequency } from "@/types"
import { useQuery } from "@tanstack/react-query"

const useCompare = (playlistIds: string[]) => {
  const queryFn = async () => {
    const token = await getClientToken()
    const results = await fetch('/api/playlists/match?playlists=' + playlistIds.join(','), {
      headers: { Authorization: 'Bearer ' + token }
    })
    
    if (!results.ok) {
      throw new Error(SERVER_ERROR)
    }

    return await results.json() as PlaylistTrackWithFrequency[]
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['compare', playlistIds],
    queryFn
  })

  return {
    tracks: data,
    isLoading,
    isError
  }
}

export default useCompare
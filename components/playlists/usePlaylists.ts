"use client"

import sdk from '@/lib/spotify-sdk/ClientInstance'
import { useInfiniteQuery } from '@tanstack/react-query'

const SIZE = 50

const usePlaylists = () => {
  const queryFn = async ({ pageParam = 0 }: { pageParam: number}) => {
    const results = await sdk.currentUser.playlists.playlists(SIZE, pageParam)
    
    return {
      items: results.items,
      nextPage: results.next ? pageParam + 50 : null
    }
  }

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['playlists'],
    queryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })

  const playlists = data?.pages.flatMap(page => page.items)

  return {
    playlists,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  }
}

export default usePlaylists
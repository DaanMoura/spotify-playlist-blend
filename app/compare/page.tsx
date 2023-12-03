"use client"

import PageWrapper from "@/components/PageWrapper"
import RankedTracks from "@/components/compare/RankedTracks"
import { useSearchParams } from "next/navigation"

export default function Compare() {
  
  const searchParams = useSearchParams()
  const playlistIdsString = searchParams.get('playlists')
  const playlistIds = playlistIdsString ? playlistIdsString.split(',') : []


  if (playlistIds.length <= 1) {
    return (
      <PageWrapper>
        <p>Please select at least two playlists to compare.</p>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <RankedTracks playlistIds={playlistIds}/>
    </PageWrapper>
  )
}
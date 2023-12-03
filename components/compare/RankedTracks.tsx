"use client"

import CompareLoading from "./CompareLoading"
import TrackItem from "./TrackItem"
import useCompare from "./useCompare"

type Props = {
  playlistIds: string[]
}

const RankedTracks = ({ playlistIds }: Props) => {
  const { tracks, isLoading } = useCompare(playlistIds)

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="text-2xl pb-4">Loading your favorite tracks</h1>
        <CompareLoading />
      </div>
    )
  }

  return (
    <div className="flex flex-col pt-3">
      <h2 className="text-xl">Here are the results</h2>
      <h3 className="pt-4">These are the tracks that more appears in your playists</h3>

      <div className="flex flex-col gap-2 pt-4 pb-16">
        {tracks?.map(track => (
          <TrackItem 
            key={track.id}
            trackId={track.id}
            name={track.name}
            artists={track.artists.map(artist => artist.name)}
            imageUrl={track.album?.images?.[0]?.url ?? ''}
            frequency={track.frequency}
          />
        ))}
      </div>
    </div>
  )
}

export default RankedTracks
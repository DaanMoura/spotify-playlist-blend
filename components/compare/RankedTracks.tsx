"use client"

import CompareLoading from "./CompareLoading"
import TrackItem from "./TrackItem"
import useCompare from "./useCompare"
import useCreatePlaylist from "./useCreatePlaylist"

type Props = {
  playlistIds: string[]
}

const RankedTracks = ({ playlistIds }: Props) => {
  const { tracks, isLoading } = useCompare(playlistIds)

  const { createPlaylist , isPending, isSuccess } = useCreatePlaylist() 

  const onCreatePlaylistClick = async () => {
    if (!tracks) return
    await createPlaylist(tracks)
  }

  const buttonText = isPending ? 'Creating...' : 'Create playlist'

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

			<button 
        disabled={isPending || !tracks}
        onClick={onCreatePlaylistClick}
				className={`
				transition
				cursor-pointer
				rounded-full shadow-xl 
				bg-emerald-800 border border-emerald-600 
				hover:bg-emerald-700 hover:border-emerald-500
        disabled:bg-gray-700 disabled:border-gray-500 
				text-white text-md font-light
				fixed bottom-5 inset-x-0 mx-auto w-fit px-4 py-2
			`}>
				Create playlist
			</button>
    </div>
  )
}

export default RankedTracks
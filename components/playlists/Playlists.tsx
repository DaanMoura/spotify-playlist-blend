import { useState } from "react";
import usePlaylists from "./usePlaylists";
import PlaylistItem from "./PlaylistItem";

function Playlists() {
	const { playlists, isLoading } = usePlaylists()

	const [checkedPlaylists, setCheckedPlaylists] = useState<string[]>([])
	const isPlaylistChecked = (playlistId: string) => checkedPlaylists.includes(playlistId)
	const togglePlaylistCheck = (playlistId: string) => {
		if (isPlaylistChecked(playlistId)) {
			setCheckedPlaylists(checkedPlaylists.filter(id => id !== playlistId))
		} else {
			setCheckedPlaylists([...checkedPlaylists, playlistId])
		}
	}

	const showButton = checkedPlaylists.length > 1
	const href = '/compare?playlists=' + checkedPlaylists.join(',')
	const buttonText = `Compare ${checkedPlaylists.length} playlists`

	return (
		<div className="flex flex-col gap-4">
			{isLoading
				? <h2 className="pt-4">Let&apos;s see your playlists 👀</h2>
				: <h2 className="pt-4">Select the playlists you wanna compare</h2>
			}

			<div className="flex flex-col gap-2 pb-16">
				{playlists?.map(playlist => (
					<PlaylistItem
						key={playlist.id}
						name={playlist.name}
						playlistId={playlist.id}
						imageUrl={playlist.images[0].url ?? ''}
						trackCount={playlist.tracks?.total ?? 0}
						checked={isPlaylistChecked(playlist.id)}
						onCheck={togglePlaylistCheck}
					/>
				))}
			</div>
			<a 
				href={href}
				className={`
				${showButton ? 'translate-y-0' : 'translate-y-24'}
				transition
				cursor-pointer
				rounded-full shadow-xl 
				bg-emerald-800 border border-emerald-600 
				hover:bg-emerald-700 hover:border-emerald-500
				text-white text-md font-light
				fixed bottom-5 inset-x-0 mx-auto w-fit px-4 py-2
			`}>
				{buttonText}
			</a>
		</div>
	)
}

export default Playlists
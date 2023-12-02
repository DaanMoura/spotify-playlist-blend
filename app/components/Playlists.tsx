import { Page, SimplifiedPlaylist, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";

type PlaylistsType = Page<SimplifiedPlaylist>
function Playlists({ sdk }: { sdk: SpotifyApi }) {
	const [results, setResults] = useState<PlaylistsType>({} as PlaylistsType)

	useEffect(() => {
		(async () => {
			const results = await sdk.currentUser.playlists.playlists()
			setResults(() => results)
		})()
	}, [sdk])

	const tableRows = results.items?.map(item => {
		return (
			<tr key={item.id}>
				<td>{item.name}</td>
				<td>{item.tracks?.total}</td>
				<td>{item.id}</td>
				<td>{item.href}</td>
			</tr>
		)
	}) ?? <></>

	return (
		<>
			<h1>My playlists:</h1>
			<table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Tracks</th>
            <th>Id</th>
			<th>URL</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
		</>
	)
}

export default Playlists
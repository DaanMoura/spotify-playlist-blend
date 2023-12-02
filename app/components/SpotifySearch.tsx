"use client";

import { PartialSearchResult, SearchResults, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";

type ArtsitsSearchResult = Required<Pick<PartialSearchResult, 'artists'>>
function SpotifySearch({ sdk }: { sdk: SpotifyApi }) {
  const [results, setResults] = useState<ArtsitsSearchResult>({} as ArtsitsSearchResult);

  useEffect(() => {
    (async () => {
      const results = await sdk.search("The Beatles", ["artist"]);
      setResults(() => results);
    })();
  }, [sdk]);

  // generate a table for the results
  const tableRows = results.artists?.items.map((artist) => {
    return (
      <tr key={artist.id}>
        <td>{artist.name}</td>
        <td>{artist.popularity}</td>
        <td>{artist.followers.total}</td>
      </tr>
    );
  });

  return (
    <>
      <h1>Spotify Search for The Beatles</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Popularity</th>
            <th>Followers</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
}

export default SpotifySearch;
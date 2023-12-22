import { Episode, Track } from "@spotify/web-api-ts-sdk";

export type PlaylistWithTracks = {
  name: string
  url: string
  tracks: Track[]
}

export type PlaylistTrackWithFrequency = Track & {
  frequency: number
}

export type NewPlaylist = {
  url: string
  href: string
  uri: string
}
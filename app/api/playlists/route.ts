import {  SpotifyApi } from "@spotify/web-api-ts-sdk"
import { getToken } from 'next-auth/jwt'
import { env } from "@/app/env"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
	const token = await getToken({ req })

	if (!token) {
		return Response.json({
			message: 'Access token is missing!'
		}, {
			status: 400
		})
	}

	const api = SpotifyApi.withAccessToken(env.SPOTIFY_CLIENT_ID, {
		access_token: token.access_token as string,
		expires_in: token.expires_in as number,
		refresh_token: token.refresh_token as string,
		token_type: token.token_type as string
	})

	const playlists = await api.currentUser.playlists.playlists()

	return Response.json(playlists)
}
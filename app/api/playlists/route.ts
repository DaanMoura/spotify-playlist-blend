import { getToken } from 'next-auth/jwt'
import { NextRequest } from "next/server"
import { accessTokenError } from "@/app/api/shared/errors"
import { getSpotifySdk } from "../shared/sdk"

export async function GET(req: NextRequest) {
	const token = await getToken({ req })

	if (!token) {
		return accessTokenError
	}

	const sdk = getSpotifySdk(token)

	const playlists = await sdk.currentUser.playlists.playlists()

	return Response.json(playlists)
}
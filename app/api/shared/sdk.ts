import { env } from "@/app/env";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { JWT } from "next-auth/jwt";

export const getSpotifySdk = (token: JWT) => SpotifyApi.withAccessToken(env.SPOTIFY_CLIENT_ID, {
    access_token: token.access_token as string,
    expires_in: token.expires_in as number,
    refresh_token: token.refresh_token as string,
    token_type: token.token_type as string
})
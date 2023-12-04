export const env = {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID as string,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET as string,
    JWT_SECRET: (process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_SECRET : process.env.NEXT_PUBLIC_JWT_SECRET) as string,
}
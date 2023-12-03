"use client"

import { IconBrandSpotify } from "@tabler/icons-react"
import { ReactEventHandler } from "react"

type Props = {
  onSignInClick: ReactEventHandler<HTMLButtonElement>
  loading?: boolean
}
const SignInScreen = ({ onSignInClick, loading = false }: Props) => (
  <div className="flex flex-col items-center justify-center w-full h-screen gap-3">
    <h1 className="text-2xl">Welcome! 👋</h1>
    <h2 className="text-base">Ready to see the songs you always loved?</h2>
    <button onClick={onSignInClick} disabled={loading} className="
      flex w-52 gap-1 align-middle 
      bg-slate-800 
      disabled:bg-slate-600
      px-3 py-1.5 
      text-white 
      hover:bg-slate-700
      focus-visible:outline 
      focus-visible:outline-offset-2 
      focus-visible:outline-slate-200 
      border border-slate-600 rounded-lg" 
    >
      <IconBrandSpotify />
      <span>{loading? 'Loading...' : 'Sign in with Spotify'}</span>
    </button>
  </div>
)


export default SignInScreen
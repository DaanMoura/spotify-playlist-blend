"use client"

import { encode } from "next-auth/jwt";
import { env } from "@/app/env";
import { getSession } from "next-auth/react";

const getClientToken = async () => {
  const session = await getSession()
  if (!session?.user) return null

  const jwt = await encode({
    secret: env.JWT_SECRET as string,
    token: {
      ...session.user
    }
  })

  return jwt
}

export default getClientToken
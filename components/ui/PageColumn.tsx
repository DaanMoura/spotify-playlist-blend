"use client"

import { ReactNode } from "react"

type Props = {
  children: ReactNode
}
const PageColumn = ({ children}: Props) => <div className="flex flex-col justify-center w-[480px] h-full p-4">{children}</div>
export default PageColumn
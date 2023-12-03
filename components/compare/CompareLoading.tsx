"use client"

import dynamic from 'next/dynamic'
import animation from './animation.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const CompareLoading = () => (
  <div className="w-[340px]">
    <Lottie animationData={animation} />
  </div>
)

export default CompareLoading
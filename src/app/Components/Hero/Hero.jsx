
import Image from 'next/image'
import React from 'react'

export default function Hero() {
  return (
     <div className="relative h-screen w-full">
      {/* Background Image */}
      <Image
        src="/image/banner.png"
        alt="Hero Banner"
        fill
        className="object-cover"
        priority
      />

      {/* Content on top */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
          Welcome to MamarHat
        </h1>
      </div>
    </div>
  )
}

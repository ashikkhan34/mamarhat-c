
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
        <h1 className="text-white 2 md:text-6xl font-bold drop-shadow-lg">
          <span className='text-red-500'>Freshness</span> You Can <span className='text-blue-500'>Trust</span>  <br />From <span className='text-green-500'>Market </span>to Home,<span className='text-purple-600'> Fast</span>
        </h1>
      </div>
    </div>
  )
}

"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"

export default function Circular() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative w-20 h-20 rounded-full bg-lime-500 flex items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out"
      style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ArrowRight className="text-white w-6 h-6" />
      <div className="absolute inset-0 rounded-full">
        <div className="w-full h-full rounded-full flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-lime-500 flex items-center justify-center">
            <span className="text-[8px] tracking-widest uppercase text-gray-600 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-30deg]">
              Collection
            </span>
            <span className="text-[8px] tracking-widest uppercase text-gray-600 absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-[0deg]">
              Explore
            </span>
            <span className="text-[8px] tracking-widest uppercase text-gray-600 absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 rotate-[30deg]">
              Inspiration
            </span>
            <span className="text-[8px] tracking-widest uppercase text-gray-600 absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 rotate-[60deg]">
              Creation
            </span>
            <span className="text-[8px] tracking-widest uppercase text-gray-600 absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 rotate-[-60deg]">
              Exclusive
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}


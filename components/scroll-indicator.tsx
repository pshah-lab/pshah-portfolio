"use client"

import { useEffect, useState } from "react"

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx
      setScrollProgress(scrolled)
    }

    window.addEventListener("scroll", updateScrollProgress)
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="w-1 h-32 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="w-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full transition-all duration-300 ease-out"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
        {Math.round(scrollProgress * 100)}%
      </div>
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"

interface MusicPlayerProps {
  isPlaying: boolean
}

export default function MusicPlayer({
  isPlaying,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setPlaying(true)
        })
        .catch(() => {
          setPlaying(false)
        })
    } else {
      audioRef.current.pause()
      setPlaying(false)
    }
  }, [isPlaying])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => {
          setPlaying(true)
        })
        .catch(() => {
          setPlaying(false)
        })
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/wedding.mp3"
        loop
        preload="auto"
      />

      {isPlaying && (
        <button
          onClick={toggleMusic}
          aria-label={
            playing ? "Matikan musik" : "Nyalakan musik"
          }
          className="fixed bottom-5 right-5 z-50
          flex h-12 w-12 items-center justify-center
          rounded-full
          border border-[#b99d7d]
          bg-[#f8f3ed]/90
          shadow-lg
          backdrop-blur-sm"
        >
          <span
            className={
              playing
                ? "animate-spin text-lg"
                : "text-lg"
            }
          >
            🎵
          </span>
        </button>
      )}
    </>
  )
}
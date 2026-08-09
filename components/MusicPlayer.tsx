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
    const audio = audioRef.current

    if (!audio) return

    if (isPlaying) {
      audio
        .play()
        .then(() => {
          setPlaying(true)
        })
        .catch((error) => {
          console.log("Autoplay musik diblokir browser:", error)
          setPlaying(false)
        })
    } else {
      audio.pause()
      audio.currentTime = 0
      setPlaying(false)
    }
  }, [isPlaying])

  const toggleMusic = () => {
    const audio = audioRef.current

    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio
        .play()
        .then(() => {
          setPlaying(true)
        })
        .catch((error) => {
          console.log("Musik tidak dapat diputar:", error)
          setPlaying(false)
        })
    }
  }

  return (
    <>
      {/* AUDIO */}
      <audio
        ref={audioRef}
        src="/music/wedding.mp3"
        loop
        preload="auto"
      />

      {/* BUTTON */}
      {isPlaying && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={
            playing
              ? "Matikan musik"
              : "Nyalakan musik"
          }
          className="
            fixed
            bottom-5
            right-5
            z-50
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-[#b99d7d]
            bg-[#f8f3ed]/90
            shadow-lg
            backdrop-blur-sm
            transition-transform
            hover:scale-105
            active:scale-95
          "
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
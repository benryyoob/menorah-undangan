"use client"

import { useEffect, useState } from "react"

export default function GuestName() {
  const [guestName, setGuestName] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    )

    const name = params.get("to")

    if (name) {
      setGuestName(name)
    }
  }, [])

  if (!guestName) {
    return null
  }

  return (
    <div className="mt-8 text-center text-white">

      <p
        className="
          text-xs
          tracking-[0.2em]
          text-white/70
        "
      >
        Kepada Yth.
      </p>

      <p
        className="
          mt-2
          font-serif
          text-xl
          text-white
          drop-shadow-lg
        "
      >
        {guestName}
      </p>

    </div>
  )
}
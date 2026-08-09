"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const targetDate = new Date(
  "2026-09-05T09:00:00+08:00"
).getTime()

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference =
        targetDate - new Date().getTime()

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })

        return
      }

      setTimeLeft({
        days: Math.floor(
          difference / (1000 * 60 * 60 * 24)
        ),

        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),

        minutes: Math.floor(
          (difference / (1000 * 60)) % 60
        ),

        seconds: Math.floor(
          (difference / 1000) % 60
        ),
      })
    }

    calculateTimeLeft()

    const timer = setInterval(
      calculateTimeLeft,
      1000
    )

    return () => clearInterval(timer)
  }, [])

  const items = [
    {
      value: timeLeft.days,
      label: "HARI",
    },
    {
      value: timeLeft.hours,
      label: "JAM",
    },
    {
      value: timeLeft.minutes,
      label: "MENIT",
    },
    {
      value: timeLeft.seconds,
      label: "DETIK",
    },
  ]

  return (
    <section className="relative min-h-screen
      overflow-hidden
      flex items-center justify-center"
    >

      {/* =================================================
          FOTO LATAR
      ================================================== */}
      <div className="absolute inset-0">

        <Image
          src="/images/countdown.jpg"
          alt="Daniel dan Erni"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Gradient */}
        <div
          className="absolute inset-0
          bg-gradient-to-b
          from-black/30
          via-black/30
          to-black/75"
        />

      </div>


      {/* =================================================
          ORNAMEN SUDUT
      ================================================== */}
      <div className="absolute inset-0
        pointer-events-none"
      >

        <div
          className="absolute top-8 left-8
          text-white/60 text-3xl"
        >
          ❦
        </div>

        <div
          className="absolute top-8 right-8
          text-white/60 text-3xl"
        >
          ❦
        </div>

        <div
          className="absolute bottom-8 left-8
          text-white/60 text-3xl rotate-180"
        >
          ❦
        </div>

        <div
          className="absolute bottom-8 right-8
          text-white/60 text-3xl rotate-180"
        >
          ❦
        </div>

      </div>


      {/* =================================================
          KONTEN
      ================================================== */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 1,
        }}
        className="relative z-10
        w-full max-w-md
        px-6
        text-center
        text-white"
      >

        {/* Label */}
        <p
          className="text-[10px]
          tracking-[0.5em]
          text-white/80"
        >
          COUNTDOWN
        </p>


        {/* Judul */}
        <h2
          className="mt-6
          text-4xl
          font-serif
          drop-shadow-lg"
        >
          Menuju Hari Bahagia
        </h2>


        {/* Garis */}
        <div
          className="mx-auto
          mt-6
          h-px
          w-14
          bg-white/50"
        />


        {/* Countdown */}
        <div
          className="mt-10
          grid
          grid-cols-4
          gap-2"
        >

          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="rounded-xl
              border
              border-white/40
              bg-black/20
              px-2
              py-5
              backdrop-blur-sm"
            >

              <motion.p
                key={item.value}
                initial={{
                  opacity: 0.5,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="text-3xl
                font-serif
                drop-shadow-lg"
              >
                {String(item.value).padStart(2, "0")}
              </motion.p>

              <p
                className="mt-2
                text-[9px]
                tracking-[0.2em]
                text-white/70"
              >
                {item.label}
              </p>

            </motion.div>
          ))}

        </div>


        {/* Tanggal */}
        <div className="mt-10">

          <p
            className="text-sm
            tracking-[0.2em]
            text-white/90"
          >
            SABTU, 05 SEPTEMBER 2026
          </p>

          <p
            className="mt-2
            text-xs
            text-white/60"
          >
            09.00 WITA
          </p>

        </div>


        {/* Scroll indicator */}
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute
          left-1/2
          mt-14
          -translate-x-1/2"
        >

          <div
            className="h-8
            w-px
            bg-white/40"
          />

        </motion.div>

      </motion.div>

    </section>
  )
}
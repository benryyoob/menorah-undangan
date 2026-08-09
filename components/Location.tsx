"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const locations = [
  {
    type: "PEMBERKATAN",
    date: "Sabtu, 05 September 2026",
    time: "09.00 WITA – Selesai",
    name: "GMIT Zaitun Tenau",
    city: "Kupang",
    image: "/images/pemberkatan.jpg",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=GMIT+Zaitun+Tenau+Kupang",
  },
  {
    type: "RESEPSI",
    date: "Sabtu, 05 September 2026",
    time: "18.00 WITA – Selesai",
    name: "Hotel Grand Mutiara",
    city: "Kupang",
    image: "/images/resepsi.jpg",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Hotel+Grand+Mutiara+Kupang",
  },
]

export default function Location() {
  return (
    <section>

      {locations.map((location, index) => (
        <motion.div
          key={location.type}
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative min-h-screen
          overflow-hidden
          flex items-center justify-center"
        >

          {/* =========================================
              FOTO LATAR
          ========================================== */}
          <div className="absolute inset-0">

            <Image
              src={location.image}
              alt={location.name}
              fill
              className="object-cover object-center"
              sizes="100vw"
            />

            {/* Overlay utama */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Gradient */}
            <div
              className="absolute inset-0
              bg-gradient-to-b
              from-black/30
              via-black/20
              to-black/70"
            />

          </div>


          {/* =========================================
              ORNAMEN
          ========================================== */}
          <div className="absolute inset-0
            pointer-events-none"
          >

            <div className="absolute top-8 left-8
              text-white/60 text-3xl"
            >
              ❦
            </div>

            <div className="absolute top-8 right-8
              text-white/60 text-3xl"
            >
              ❦
            </div>

            <div className="absolute bottom-8 left-8
              text-white/60 text-3xl rotate-180"
            >
              ❦
            </div>

            <div className="absolute bottom-8 right-8
              text-white/60 text-3xl rotate-180"
            >
              ❦
            </div>

          </div>


          {/* =========================================
              KONTEN
          ========================================== */}
          <div
            className="relative z-10
            w-full max-w-md
            px-6
            text-center
            text-white"
          >

            {/* Icon */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
              }}
              className="mx-auto
              flex h-16 w-16
              items-center justify-center
              rounded-full
              border border-white/50
              bg-black/10
              backdrop-blur-sm"
            >

              <span className="text-2xl">
                {index === 0 ? "♡" : "♢"}
              </span>

            </motion.div>


            {/* Jenis acara */}
            <motion.p
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
                duration: 0.8,
                delay: 0.1,
              }}
              className="mt-7
              text-xs
              tracking-[0.4em]
              text-white/80"
            >
              {location.type}
            </motion.p>


            {/* Tanggal */}
            <motion.h2
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
                duration: 0.8,
                delay: 0.2,
              }}
              className="mt-7
              text-3xl
              font-serif
              drop-shadow-lg"
            >
              {location.date}
            </motion.h2>


            {/* Waktu */}
            <motion.p
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
                duration: 0.8,
                delay: 0.3,
              }}
              className="mt-4
              text-sm
              text-white/90"
            >
              {location.time}
            </motion.p>


            {/* Garis */}
            <div className="mx-auto mt-7
              h-px w-12 bg-white/50"
            />


            {/* Tempat */}
            <motion.div
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
                duration: 0.8,
                delay: 0.4,
              }}
              className="mt-7"
            >

              <p className="text-lg font-medium">
                {location.name}
              </p>

              <p className="mt-2 text-sm text-white/80">
                {location.city}
              </p>

            </motion.div>


            {/* Google Maps */}
            <motion.a
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
                duration: 0.8,
                delay: 0.5,
              }}
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="mt-9
              inline-flex
              items-center
              justify-center
              rounded-full
              border
              border-white/70
              bg-white/10
              px-8
              py-3
              text-[10px]
              tracking-[0.25em]
              backdrop-blur-sm
              transition-colors
              hover:bg-white
              hover:text-[#4b3b2f]"
            >
              📍 LIHAT LOKASI
            </motion.a>

          </div>

        </motion.div>
      ))}

    </section>
  )
}
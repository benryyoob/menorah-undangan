"use client"

import Image from "next/image"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const photos = [
  {
    src: "/gallery/foto-1.jpg",
    alt: "Daniel dan Erni",
  },
  {
    src: "/gallery/foto-2.jpg",
    alt: "Daniel dan Erni",
  },
  {
    src: "/gallery/foto-3.jpg",
    alt: "Daniel dan Erni",
  },
  {
    src: "/gallery/foto-4.jpg",
    alt: "Daniel dan Erni",
  },
  {
    src: "/gallery/foto-5.jpg",
    alt: "Daniel dan Erni",
  },
  {
    src: "/gallery/foto-6.jpg",
    alt: "Daniel dan Erni",
  },
  {
    src: "/gallery/foto-7.jpg",
    alt: "Daniel dan Erni",
  },
  {
    src: "/gallery/foto-8.jpg",
    alt: "Daniel dan Erni",
  },
  {
    src: "/gallery/foto-9.jpg",
    alt: "Daniel dan Erni",
  },
  {
    src: "/gallery/foto-10.jpg",
    alt: "Daniel dan Erni",
  },
]

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  return (
    <>
      <section className="relative overflow-hidden bg-[#f5f0e8] px-5 py-24">

        {/* ================================
            HEADER
        ================================= */}
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
            duration: 0.8,
          }}
          className="mx-auto max-w-md text-center"
        >
          <p className="text-[10px] tracking-[0.45em] text-[#9a8066]">
            OUR MEMORIES
          </p>

          <h2 className="mt-5 font-serif text-5xl text-[#4b3b2f]">
            Gallery
          </h2>

          <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#665548]">
            Setiap foto menyimpan cerita,
            setiap momen menjadi bagian dari
            perjalanan kasih kami.
          </p>

          <div className="mx-auto mt-7 h-px w-12 bg-[#b99d7d]" />
        </motion.div>


        {/* ================================
            GALLERY ALBUM
        ================================= */}
        <div className="mx-auto mt-14 max-w-md">

          <div className="grid grid-cols-2 gap-3">

            {/* FOTO 1 — BESAR */}
            <GalleryPhoto
              photo={photos[0]}
              onClick={() => setSelectedPhoto(photos[0].src)}
              className="col-span-2 aspect-[4/3]"
              index={0}
            />


            {/* FOTO 2 */}
            <GalleryPhoto
              photo={photos[1]}
              onClick={() => setSelectedPhoto(photos[1].src)}
              className="aspect-square"
              index={1}
            />


            {/* FOTO 3 */}
            <GalleryPhoto
              photo={photos[2]}
              onClick={() => setSelectedPhoto(photos[2].src)}
              className="aspect-square"
              index={2}
            />


            {/* FOTO 4 — TINGGI */}
            <GalleryPhoto
              photo={photos[3]}
              onClick={() => setSelectedPhoto(photos[3].src)}
              className="row-span-2 aspect-[3/4]"
              index={3}
            />


            {/* FOTO 5 */}
            <GalleryPhoto
              photo={photos[4]}
              onClick={() => setSelectedPhoto(photos[4].src)}
              className="aspect-square"
              index={4}
            />


            {/* FOTO 6 */}
            <GalleryPhoto
              photo={photos[5]}
              onClick={() => setSelectedPhoto(photos[5].src)}
              className="aspect-square"
              index={5}
            />


            {/* FOTO 7 — BESAR */}
            <GalleryPhoto
              photo={photos[6]}
              onClick={() => setSelectedPhoto(photos[6].src)}
              className="col-span-2 aspect-[4/3]"
              index={6}
            />


            {/* FOTO 8 */}
            <GalleryPhoto
              photo={photos[7]}
              onClick={() => setSelectedPhoto(photos[7].src)}
              className="aspect-square"
              index={7}
            />


            {/* FOTO 9 */}
            <GalleryPhoto
              photo={photos[8]}
              onClick={() => setSelectedPhoto(photos[8].src)}
              className="aspect-square"
              index={8}
            />


            {/* FOTO 10 */}
            <GalleryPhoto
              photo={photos[9]}
              onClick={() => setSelectedPhoto(photos[9].src)}
              className="col-span-2 aspect-[4/3]"
              index={9}
            />

          </div>

        </div>


        {/* ================================
            FOOTER
        ================================= */}
        <motion.p
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
          }}
          className="mt-12 text-center text-[10px]
          tracking-[0.35em] text-[#9a8066]"
        >
          DANIEL & ERNI
        </motion.p>

      </section>


      {/* ================================
          LIGHTBOX
      ================================= */}
      <AnimatePresence>

        {selectedPhoto && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[100]
            flex items-center justify-center
            bg-black/95 p-5"
            onClick={() => setSelectedPhoto(null)}
          >

            {/* CLOSE */}
            <button
              type="button"
              aria-label="Tutup foto"
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-5 top-5 z-20
              flex h-11 w-11
              items-center justify-center
              rounded-full
              border border-white/20
              bg-white/10
              text-2xl
              text-white
              backdrop-blur-md
              transition
              hover:bg-white/20"
            >
              ×
            </button>


            {/* FOTO */}
            <motion.div
              initial={{
                scale: 0.85,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.85,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="relative
              h-[82vh]
              w-full
              max-w-4xl"
              onClick={(event) => event.stopPropagation()}
            >

              <Image
                src={selectedPhoto}
                alt="Daniel dan Erni"
                fill
                className="object-contain"
                sizes="100vw"
              />

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  )
}


/* =====================================================
   KOMPONEN FOTO
===================================================== */

function GalleryPhoto({
  photo,
  onClick,
  className,
  index,
}: {
  photo: {
    src: string
    alt: string
  }
  onClick: () => void
  className?: string
  index: number
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
      }}
      whileHover={{
        scale: 1.015,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >

      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover
        transition-transform
        duration-700
        hover:scale-110"
        sizes="(max-width: 768px) 50vw, 400px"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0
        bg-black/0
        transition-all
        duration-500
        hover:bg-black/10"
      />

    </motion.button>
  )
}
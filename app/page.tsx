"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"

import Countdown from "@/components/Countdown"
import Image from "next/image"
import Location from "@/components/Location"
import MusicPlayer from "@/components/MusicPlayer"
import LoveStory from "@/components/LoveStory"
import Gallery from "@/components/Gallery"
import RSVP from "@/components/RSVP"
import WhatsAppShare from "@/components/WhatsAppShare"

// =====================================================
// KONTEN UTAMA
// =====================================================

function HomeContent() {

  const [isOpening, setIsOpening] = useState(false)
  const [isOpened, setIsOpened] = useState(false)

  // =====================================================
  // NAMA TAMU DARI URL
  //
  // Contoh:
  // ?to=Bapak%20John%20Doe
  // =====================================================

  const searchParams = useSearchParams()

  const guestName = searchParams.get("to") || ""


  // =====================================================
  // BUKA UNDANGAN
  // =====================================================

  const handleOpenInvitation = () => {

    setIsOpening(true)

    setTimeout(() => {

      setIsOpened(true)
      setIsOpening(false)

    }, 1500)

  }


  return (

    <main className="min-h-screen">

      <AnimatePresence mode="wait">

        {/* =====================================================
            COVER / AMPLOP
        ====================================================== */}

        {!isOpened && (

          <motion.div
            key="opening"

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
              scale: 1.05,

              transition: {
                duration: 1,
              },
            }}

            className="
              fixed
              inset-0
              z-50
              overflow-hidden
              bg-black
            "
          >

            {/* =================================================
                FOTO COVER
            ================================================== */}

            <div className="absolute inset-0">

              <Image
                src="/images/couple.jpg"
                alt="Daniel dan Erni"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-black/45
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/70
                  via-black/20
                  to-black/20
                "
              />

            </div>


            {/* =================================================
                ORNAMEN
            ================================================== */}

            <div
              className="
                absolute
                inset-0
                pointer-events-none
              "
            >

              <div
                className="
                  absolute
                  top-8
                  left-8
                  text-3xl
                  text-white/70
                "
              >
                ❦
              </div>

              <div
                className="
                  absolute
                  top-8
                  right-8
                  text-3xl
                  text-white/70
                "
              >
                ❦
              </div>

              <div
                className="
                  absolute
                  bottom-8
                  left-8
                  rotate-180
                  text-3xl
                  text-white/70
                "
              >
                ❦
              </div>

              <div
                className="
                  absolute
                  bottom-8
                  right-8
                  rotate-180
                  text-3xl
                  text-white/70
                "
              >
                ❦
              </div>

            </div>


            {/* =================================================
                KONTEN COVER
            ================================================== */}

            <div
              className="
                relative
                z-10
                min-h-screen
                flex
                flex-col
                items-center
                justify-center
                px-6
                text-center
                text-white
              "
            >

              {/* LABEL */}

              <motion.div

                initial={{
                  opacity: 0,
                  y: -20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  duration: 1,
                }}
              >

                <p
                  className="
                    text-[10px]
                    tracking-[0.5em]
                    uppercase
                    text-white/90
                  "
                >
                  The Wedding Of
                </p>

              </motion.div>


              {/* =================================================
                  NAMA TAMU
              ================================================== */}

              {guestName && (

                <motion.div

                  initial={{
                    opacity: 0,
                    y: -10,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    duration: 1,
                    delay: 0.2,
                  }}

                  className="mt-6"
                >

                  <p
                    className="
                      text-[10px]
                      tracking-[0.2em]
                      text-white/70
                    "
                  >
                    Kepada Yth.
                  </p>

                  <p
                    className="
                      mt-2
                      max-w-xs
                      font-serif
                      text-xl
                      leading-relaxed
                      text-white
                      drop-shadow-lg
                    "
                  >
                    {guestName}
                  </p>

                </motion.div>

              )}


              {/* =================================================
                  NAMA MEMPELAI
              ================================================== */}

              <motion.div

                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                }}

                transition={{
                  duration: 1.2,
                  delay: guestName ? 0.4 : 0.2,
                }}

                className="mt-8"
              >

                <h1
                  className="
                    text-6xl
                    font-serif
                    leading-none
                    drop-shadow-lg
                  "
                >
                  Daniel
                </h1>

                <p
                  className="
                    my-3
                    text-3xl
                    font-serif
                    text-white/80
                  "
                >
                  &
                </p>

                <h1
                  className="
                    text-6xl
                    font-serif
                    leading-none
                    drop-shadow-lg
                  "
                >
                  Erni
                </h1>

              </motion.div>


              {/* =================================================
                  TANGGAL
              ================================================== */}

              <motion.div

                initial={{
                  opacity: 0,
                  y: 20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  duration: 1,
                  delay: guestName ? 0.7 : 0.5,
                }}

                className="mt-8"
              >

                <div
                  className="
                    mx-auto
                    h-px
                    w-12
                    bg-white/60
                  "
                />

                <p
                  className="
                    mt-4
                    text-xs
                    tracking-[0.35em]
                  "
                >
                  05 SEPTEMBER 2026
                </p>

              </motion.div>


              {/* =================================================
                  TOMBOL BUKA
              ================================================== */}

              <motion.button

                initial={{
                  opacity: 0,
                  y: 30,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  duration: 1,
                  delay: guestName ? 1 : 0.8,
                }}

                whileHover={{
                  scale: 1.05,
                  backgroundColor:
                    "rgba(255,255,255,0.25)",
                }}

                whileTap={{
                  scale: 0.95,
                }}

                onClick={handleOpenInvitation}

                disabled={isOpening}

                className="
                  mt-12
                  rounded-full
                  border
                  border-white/70
                  bg-black/20
                  px-8
                  py-3
                  text-[10px]
                  tracking-[0.3em]
                  backdrop-blur-sm
                  transition-colors
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >

                {isOpening
                  ? "MEMBUKA..."
                  : "BUKA UNDANGAN"}

              </motion.button>


              {/* FOOTER */}

              <motion.p

                initial={{
                  opacity: 0,
                }}

                animate={{
                  opacity: 1,
                }}

                transition={{
                  duration: 1,
                  delay: guestName ? 1.3 : 1.2,
                }}

                className="
                  absolute
                  bottom-10
                  text-[9px]
                  tracking-[0.4em]
                  text-white/70
                "
              >
                WITH LOVE
              </motion.p>

            </div>

          </motion.div>

        )}


        {/* =====================================================
            ISI UNDANGAN
        ====================================================== */}

        {isOpened && (

          <motion.div

            key="invitation"

            initial={{
              opacity: 0,
              y: 40,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 1,
            }}

            className="
              min-h-screen
              w-full
              max-w-md
              mx-auto
              bg-[#f8f3ed]
              text-[#4b3b2f]
            "
          >


            {/* =====================================================
                HERO
            ====================================================== */}

            <section
              className="
                relative
                min-h-screen
                overflow-hidden
              "
            >

              {/* FOTO LATAR */}

              <div className="absolute inset-0">

                <Image
                  src="/images/couple2.jpg"
                  alt="Daniel dan Erni"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="100vw"
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-black/40
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-b
                    from-black/20
                    via-black/20
                    to-black/70
                  "
                />

              </div>


              {/* ORNAMEN */}

              <div
                className="
                  absolute
                  inset-0
                  z-10
                  pointer-events-none
                "
              >

                <div
                  className="
                    absolute
                    top-8
                    left-8
                    text-3xl
                    text-white/60
                  "
                >
                  ❦
                </div>

                <div
                  className="
                    absolute
                    top-8
                    right-8
                    text-3xl
                    text-white/60
                  "
                >
                  ❦
                </div>

                <div
                  className="
                    absolute
                    bottom-8
                    left-8
                    rotate-180
                    text-3xl
                    text-white/60
                  "
                >
                  ❦
                </div>

                <div
                  className="
                    absolute
                    bottom-8
                    right-8
                    rotate-180
                    text-3xl
                    text-white/60
                  "
                >
                  ❦
                </div>

              </div>


              {/* KONTEN HERO */}

              <motion.div

                initial={{
                  opacity: 0,
                  y: 30,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  duration: 1.2,
                }}

                className="
                  relative
                  z-20
                  min-h-screen
                  flex
                  flex-col
                  items-center
                  justify-center
                  px-6
                  text-center
                  text-white
                "
              >

                <p
                  className="
                    text-[10px]
                    tracking-[0.5em]
                    uppercase
                    text-white/80
                  "
                >
                  The Wedding Of
                </p>

                <h1
                  className="
                    mt-8
                    text-6xl
                    font-serif
                    leading-none
                    drop-shadow-xl
                  "
                >
                  Daniel
                </h1>

                <p
                  className="
                    my-3
                    text-3xl
                    font-serif
                    text-white/80
                  "
                >
                  &
                </p>

                <h1
                  className="
                    text-6xl
                    font-serif
                    leading-none
                    drop-shadow-xl
                  "
                >
                  Erni
                </h1>

                <div
                  className="
                    mt-8
                    h-px
                    w-14
                    bg-white/60
                  "
                />

                <p
                  className="
                    mt-5
                    text-xs
                    tracking-[0.35em]
                  "
                >
                  05 SEPTEMBER 2026
                </p>

                <p
                  className="
                    mt-3
                    text-xs
                    tracking-[0.15em]
                    text-white/80
                  "
                >
                  KUPANG, NUSA TENGGARA TIMUR
                </p>


                {/* SCROLL */}

                <motion.div

                  animate={{
                    y: [0, 8, 0],
                  }}

                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}

                  className="
                    absolute
                    bottom-10
                    flex
                    flex-col
                    items-center
                    gap-2
                  "
                >

                  <span
                    className="
                      text-[9px]
                      tracking-[0.3em]
                      text-white/70
                    "
                  >
                    SCROLL
                  </span>

                  <div
                    className="
                      h-8
                      w-px
                      bg-white/50
                    "
                  />

                </motion.div>

              </motion.div>

            </section>


            {/* =====================================================
                PEMBUKAAN
            ====================================================== */}

            <section
              className="
                px-2
                py-16
                text-center
              "
            >

              <p
                className="
                  text-xs
                  tracking-[0.35em]
                  text-[#9a8066]
                "
              >
                SALAM KASIH
              </p>

              <p
                className="
                  mt-10
                  text-md
                  font-serif
                  leading-8
                "
              >
                Tuhan membuat segala sesuatu indah pada waktunya
                <br />
                Indah saat Dia mempertemukan,
                <br />
                Indah saat dia menumbuhkan kasih
                <br />
                dan Indah saat Dia mempersatukan Putra Putri kami
                <br />
                dalam satu Ikatan Pernikahan Kudus
              </p>

            </section>


            {/* =====================================================
                MEMPELAI
            ====================================================== */}

            <section
              className="
                px-2
                py-4
                text-center
              "
            >

              <p
                className="
                  text-xs
                  tracking-[0.35em]
                  text-[#9a8066]
                "
              >
                MEMPELAI
              </p>


              {/* DANIEL */}

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
                }}

                transition={{
                  duration: 0.8,
                }}

                className="mt-12"
              >

                <motion.div

                  initial={{
                    opacity: 0,
                    scale: 0.8,
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

                  className="
                    relative
                    mx-auto
                    h-48
                    w-48
                  "
                >

                  <div
                    className="
                      absolute
                      inset-0
                      rounded-full
                      border
                      border-[#b99d7d]
                      p-2
                    "
                  >

                    <div
                      className="
                        relative
                        h-full
                        w-full
                        overflow-hidden
                        rounded-full
                      "
                    >

                      <Image
                        src="/images/daniel.jpg"
                        alt="Daniel Tanaem"
                        fill
                        className="object-cover"
                        sizes="192px"
                      />

                    </div>

                  </div>

                </motion.div>


                <h2
                  className="
                    mt-8
                    text-4xl
                    font-serif
                  "
                >
                  Daniel Tanaem
                </h2>

                <p className="mt-2 text-sm">
                  S.Kep., Ns
                </p>

                <p
                  className="
                    mt-6
                    text-sm
                    leading-7
                  "
                >
                  Putra dari
                  <br />
                  Alm. Benyamin Tanaem
                  <br />
                  & Antoneta W. Laos
                </p>

                <p
                  className="
                    mt-3
                    text-xs
                    text-[#9a8066]
                  "
                >
                  Anak ke-6 dari 7 bersaudara
                </p>

              </motion.div>


              {/* & */}

              <div
                className="
                  my-16
                  text-4xl
                  font-serif
                  text-[#9a8066]
                "
              >
                &
              </div>


              {/* ERNI */}

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
                }}

                transition={{
                  duration: 0.8,
                }}
              >

                <motion.div

                  initial={{
                    opacity: 0,
                    scale: 0.8,
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

                  className="
                    relative
                    mx-auto
                    h-48
                    w-48
                  "
                >

                  <div
                    className="
                      absolute
                      inset-0
                      rounded-full
                      border
                      border-[#b99d7d]
                      p-2
                    "
                  >

                    <div
                      className="
                        relative
                        h-full
                        w-full
                        overflow-hidden
                        rounded-full
                      "
                    >

                      <Image
                        src="/images/erni.jpg"
                        alt="Erni S. Nomate"
                        fill
                        className="object-cover"
                        sizes="192px"
                      />

                    </div>

                  </div>

                </motion.div>


                <h2
                  className="
                    mt-8
                    text-4xl
                    font-serif
                  "
                >
                  Erni S. Nomate
                </h2>

                <p className="mt-2 text-sm">
                  S.KM
                </p>

                <p
                  className="
                    mt-6
                    text-sm
                    leading-7
                  "
                >
                  Putri dari
                  <br />
                  Tertulianus Nomate
                  <br />
                  & Marselina Buling
                </p>

                <p
                  className="
                    mt-3
                    text-xs
                    text-[#9a8066]
                  "
                >
                  Anak ke-6 dari 6 bersaudara
                </p>

              </motion.div>

            </section>


            {/* =====================================================
                LOVE STORY
            ====================================================== */}

            <LoveStory />


            {/* =====================================================
                GALLERY
            ====================================================== */}

            <Gallery />


            {/* =====================================================
                LOCATION
            ====================================================== */}

            <Location />


            {/* =====================================================
                COUNTDOWN
            ====================================================== */}

            <Countdown />


            {/* =====================================================
                RSVP
            ====================================================== */}

            <RSVP />


            {/* =====================================================
                PENUTUP
            ====================================================== */}

            {/* =====================================================
                PENUTUP
            ===================================================== */}

            <section
              className="
                px-6
                py-28
                text-center
              "
            >

              {/* UCAPAN PENUTUP */}

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
                }}
                className="
                  text-lg
                  font-serif
                  leading-8
                "
              >
                Merupakan suatu kebahagiaan bagi kami
                <br />
                apabila Bapak/Ibu/Saudara/i
                <br />
                berkenan hadir dan memberikan
                <br />
                doa restu kepada kami.
              </motion.p>


              {/* =====================================================
                  KAMI YANG BERBAHAGIA
              ====================================================== */}

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
                  delay: 0.2,
                }}
                className="
                  mt-16
                  text-3xl
                  font-serif
                  text-[#4b3b2f]
                "
              >
                Kami yang Berbahagia
              </motion.p>


              {/* GARIS DEKORASI */}

              <motion.div
                initial={{
                  opacity: 0,
                  scaleX: 0,
                }}
                whileInView={{
                  opacity: 1,
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                }}
                className="
                  mx-auto
                  mt-5
                  h-px
                  w-16
                  bg-[#b99d7d]
                "
              />


              {/* =====================================================
                  KELUARGA
              ====================================================== */}

              <div
                className="
                  mt-10
                  grid
                  grid-cols-2
                  gap-6
                "
              >

                {/* =================================================
                    KELUARGA MEMPELAI PRIA
                ================================================== */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: -30,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                  }}
                  className="
                    text-center
                  "
                >

                  <p
                    className="
                      text-[10px]
                      tracking-[0.2em]
                      text-[#9a8066]
                    "
                  >
                    KELUARGA MEMPELAI 
                    <br />
                    PRIA
                  </p>

                  <div
                    className="
                      mx-auto
                      mt-4
                      h-px
                      w-8
                      bg-[#b99d7d]/60
                    "
                  />

                  <p
                    className="
                      mt-5
                      text-sm
                      font-serif
                      leading-7
                    "
                  >
                    Keluarga Tanaem
                    <br />
                    Keluarga Laos
                  </p>

                </motion.div>


                {/* =================================================
                    KELUARGA MEMPELAI WANITA
                ================================================== */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                  }}
                  className="
                    text-center
                  "
                >

                  <p
                    className="
                      text-[10px]
                      tracking-[0.2em]
                      text-[#9a8066]
                    "
                  >
                    KELUARGA MEMPELAI 
                    <br />
                    WANITA
                  </p>

                  <div
                    className="
                      mx-auto
                      mt-4
                      h-px
                      w-8
                      bg-[#b99d7d]/60
                    "
                  />

                  <p
                    className="
                      mt-5
                      text-sm
                      font-serif
                      leading-7
                    "
                  >
                    Keluarga Nomate
                    <br />
                    Keluarga Buling
                  </p>

                </motion.div>

              </div>


              {/* =====================================================
                  NAMA MEMPELAI
              ====================================================== */}

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
                  delay: 0.5,
                }}
                className="
                  mt-16
                "
              >

                <p
                  className="
                    text-xs
                    tracking-[0.3em]
                    text-[#9a8066]
                  "
                >
                  DENGAN PENUH KASIH
                </p>

                <p
                  className="
                    mt-4
                    text-3xl
                    font-serif
                    text-[#4b3b2f]
                  "
                >
                  Daniel & Erni
                </p>

              </motion.div>


              {/* ORNAMEN PENUTUP */}

              <motion.div
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
                  delay: 0.7,
                }}
                className="
                  mt-8
                  text-2xl
                  text-[#b99d7d]
                "
              >
                ❦
              </motion.div>
            {/* =====================================================
                SHARE WHATSAPP
            ====================================================== */}
            <WhatsAppShare />
            </section>

          </motion.div>

        )}

      </AnimatePresence>

      {/* =====================================================
          MUSIC PLAYER
      ====================================================== */}
      <MusicPlayer isPlaying={isOpened} />

    </main>
  )
}


// =====================================================
// PAGE WRAPPER
//
// Suspense diperlukan karena HomeContent menggunakan
// useSearchParams().
// =====================================================

export default function Home() {

  return (

    <Suspense
      fallback={
        <main
          className="
            min-h-screen
            bg-black
          "
        />
      }
    >

      <HomeContent />

    </Suspense>

  )
}
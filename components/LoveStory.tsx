"use client"

import { motion } from "framer-motion"

const stories = [
  {
    date: "2022",
    title: "Pertemuan Awal",
    text: `Awal tahun 2022 menjadi awal dari sebuah perkenalan.
    Pertanyaan kecil mulai tumbuh dalam hati, apakah penantian
    ini adalah bagian dari rencana Tuhan?`,
  },
  {
    date: "2022 – 2024",
    title: "Sebuah Proses",
    text: `Perjalanan tidak selalu berjalan sesuai dengan apa yang
    diharapkan. Ada keraguan, penantian, dan jalan yang berbeda.
    Namun Tuhan mengajarkan kami untuk tetap percaya pada
    rencana-Nya.`,
  },
  {
    date: "Maret 2025",
    title: "Dipertemukan Kembali",
    text: `Ketika waktu Tuhan tiba, pada bulan Maret 2025 Dia
    mempertemukan kami kembali melalui berbagai tanda dan
    mujizat yang menguatkan.`,
  },
  {
    date: "2025 – 2026",
    title: "Membangun Komitmen",
    text: `Kami kembali bukan lagi dengan versi yang lama,
    melainkan dengan hati yang telah dipulihkan dan komitmen
    yang lebih kuat untuk menjalani kehidupan bersama.`,
  },
  {
    date: "05 September 2026",
    title: "Hari Bahagia",
    text: `Setelah melalui perjalanan dan proses yang panjang,
    kami percaya bahwa tidak ada yang sia-sia bersama Tuhan.
    Kini kami melangkah untuk membangun keluarga yang
    berlandaskan kasih Kristus.`,
  },
]

export default function LoveStory() {
  return (
    <section className="relative overflow-hidden bg-[#f5f0e8] px-6 py-24">

      {/* Header */}
      <div className="mx-auto max-w-md text-center">

        <p className="text-xs tracking-[0.4em] text-[#9a8066]">
          OUR JOURNEY
        </p>

        <h2 className="mt-5 font-serif text-5xl text-[#4b3b2f]">
          Love Story
        </h2>

        <p className="mt-2 font-serif text-2xl text-[#7c6653]">
          Daniel & Erni
        </p>

        <div className="mx-auto mt-6 h-px w-12 bg-[#b99d7d]" />

      </div>


      {/* Timeline */}
      <div className="relative mx-auto mt-16 max-w-md">

        {/* Garis tengah */}
        <div className="absolute left-4 top-0 h-full w-px bg-[#cbb9a5]" />

        <div className="space-y-14">

          {stories.map((story, index) => (
            <motion.div
              key={story.date}
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
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.05,
              }}
              className="relative pl-12"
            >

              {/* Titik timeline */}
              <div className="absolute left-[9px] top-1
                h-3 w-3 rounded-full
                border-2 border-[#f5f0e8]
                bg-[#9a8066]
                ring-1 ring-[#9a8066]"
              />

              {/* Tahun */}
              <p className="text-xs tracking-[0.25em] text-[#9a8066]">
                {story.date}
              </p>

              {/* Card */}
              <div className="mt-3 rounded-2xl
                border border-[#d8c9b7]
                bg-white/60
                p-6
                shadow-sm"
              >

                <h3 className="font-serif text-2xl text-[#4b3b2f]">
                  {story.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#665548]">
                  {story.text}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  )
}
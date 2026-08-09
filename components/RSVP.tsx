"use client"

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react"

import { motion } from "framer-motion"
import { createClient } from "@supabase/supabase-js"


// =========================================
// SUPABASE CLIENT
// =========================================

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)


// =========================================
// TYPE RSVP
// =========================================

type RSVPData = {
  id: number
  nama: string
  kehadiran: "hadir" | "tidak_hadir"
  jumlah_tamu: number
  ucapan: string | null
  created_at: string
}


// =========================================
// COMPONENT
// =========================================

export default function RSVP() {

  // =========================================
  // FORM STATE
  // =========================================

  const [nama, setNama] = useState("")

  const [kehadiran, setKehadiran] = useState<
    "hadir" | "tidak_hadir"
  >("hadir")

  const [jumlahTamu, setJumlahTamu] = useState(1)

  const [ucapan, setUcapan] = useState("")


  // =========================================
  // STATUS
  // =========================================

  const [loading, setLoading] = useState(false)

  const [success, setSuccess] = useState(false)

  const [error, setError] = useState("")


  // =========================================
  // RSVP LIST
  // =========================================

  const [rsvpList, setRsvpList] = useState<RSVPData[]>([])

  const [loadingRSVP, setLoadingRSVP] =
    useState(true)


  // =========================================
  // AUTO SCROLL REF
  // =========================================

  const rsvpScrollRef =
    useRef<HTMLDivElement>(null)


  // =========================================
  // FETCH RSVP
  // =========================================

  async function fetchRSVP() {

    setLoadingRSVP(true)

    const { data, error } = await supabase
      .from("rsvp")
      .select(
        "id, nama, kehadiran, jumlah_tamu, ucapan, created_at"
      )
      .not("ucapan", "is", null)
      .neq("ucapan", "")
      .order("created_at", {
        ascending: false,
      })

    if (error) {

      console.error(
        "Gagal mengambil data RSVP:",
        error
      )

      setLoadingRSVP(false)

      return
    }

    setRsvpList(data ?? [])

    setLoadingRSVP(false)
  }


  // =========================================
  // LOAD RSVP SAAT COMPONENT DIBUKA
  // =========================================

  useEffect(() => {

    fetchRSVP()

  }, [])


  // =========================================
  // AUTO SCROLL UCAPAN
  // =========================================

  useEffect(() => {

    if (
      loadingRSVP ||
      rsvpList.length === 0
    ) {
      return
    }

    const container =
      rsvpScrollRef.current

    if (!container) {
      return
    }


    let animationFrame: number


    // Kecepatan scroll
    const scrollSpeed = 0.35


    function autoScroll() {

      if (!container) {
        return
      }


      const maxScroll =
        container.scrollHeight -
        container.clientHeight


      // Kalau jumlah ucapan belum cukup
      // untuk membuat scroll
      if (maxScroll <= 0) {
        return
      }


      // Kalau sudah sampai bawah
      // kembali ke atas
      if (
        container.scrollTop >=
        maxScroll - 1
      ) {

        container.scrollTop = 0

      } else {

        container.scrollTop +=
          scrollSpeed

      }


      animationFrame =
        requestAnimationFrame(
          autoScroll
        )
    }


    animationFrame =
      requestAnimationFrame(
        autoScroll
      )


    return () => {

      cancelAnimationFrame(
        animationFrame
      )

    }

  }, [
    loadingRSVP,
    rsvpList,
  ])


  // =========================================
  // SUBMIT RSVP
  // =========================================

  async function handleSubmit(
    event: FormEvent
  ) {

    event.preventDefault()


    setError("")

    setSuccess(false)


    // Validasi nama
    if (!nama.trim()) {

      setError(
        "Silakan masukkan nama Anda."
      )

      return
    }


    setLoading(true)


    // Insert ke Supabase
    const { error } =
      await supabase
        .from("rsvp")
        .insert({

          nama: nama.trim(),

          kehadiran,

          jumlah_tamu:
            kehadiran === "hadir"
              ? jumlahTamu
              : 1,

          ucapan:
            ucapan.trim() || null,

        })


    setLoading(false)


    // Jika gagal
    if (error) {

      console.error(error)

      setError(
        "Maaf, konfirmasi belum berhasil dikirim. Silakan coba lagi."
      )

      return
    }


    // Berhasil
    setSuccess(true)


    // Refresh daftar ucapan
    await fetchRSVP()


    // Reset form
    setNama("")

    setKehadiran("hadir")

    setJumlahTamu(1)

    setUcapan("")
  }


  // =========================================
  // RETURN
  // =========================================

  return (

    <section
      className="
        relative
        flex
        min-h-screen
        w-full
        flex-col
        items-center
        overflow-hidden
        px-6
        py-20
      "
    >


      {/* =========================================
          FOTO LATAR
      ========================================== */}

      <div className="absolute inset-0">

        <img
          src="/images/couple.jpg"
          alt="Daniel dan Erni"
          className="
            h-full
            w-full
            object-cover
            object-center
          "
        />


        <div
          className="
            absolute
            inset-0
            bg-black/55
          "
        />


        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/30
            via-black/30
            to-black/80
          "
        />

      </div>


      {/* =========================================
          ORNAMEN
      ========================================== */}

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
            left-8
            top-8
            text-3xl
            text-white/50
          "
        >
          ❦
        </div>


        <div
          className="
            absolute
            right-8
            top-8
            text-3xl
            text-white/50
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
            text-white/50
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
            text-white/50
          "
        >
          ❦
        </div>

      </div>


      {/* =========================================
          KONTEN
      ========================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
          relative
          z-10
          w-full
          max-w-md
        "
      >


        {/* =====================================
            HEADER
        ====================================== */}

        <div
          className="
            text-center
            text-white
          "
        >

          <p
            className="
              text-[10px]
              tracking-[0.45em]
              text-white/70
            "
          >
            RSVP
          </p>


          <h2
            className="
              mt-5
              font-serif
              text-5xl
              drop-shadow-lg
            "
          >
            Konfirmasi Kehadiran
          </h2>


          <p
            className="
              mx-auto
              mt-5
              max-w-sm
              text-sm
              leading-7
              text-white/80
            "
          >
            Kami sangat berharap dapat berbagi
            kebahagiaan bersama Anda.
          </p>


          <div
            className="
              mx-auto
              mt-6
              h-px
              w-12
              bg-white/50
            "
          />

        </div>


        {/* =====================================
            FORM CARD
        ====================================== */}

        <div
          className="
            mt-10
            rounded-3xl
            border
            border-white/20
            bg-white/10
            p-6
            shadow-2xl
            backdrop-blur-xl
          "
        >

          {!success ? (

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >


              {/* NAMA */}

              <div>

                <label
                  htmlFor="nama"
                  className="
                    mb-2
                    block
                    text-xs
                    tracking-[0.15em]
                    text-white/80
                  "
                >
                  NAMA
                </label>


                <input
                  id="nama"
                  type="text"
                  value={nama}
                  onChange={(event) =>
                    setNama(
                      event.target.value
                    )
                  }
                  placeholder="Masukkan nama Anda"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/20
                    bg-white/10
                    px-4
                    py-3
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/40
                    focus:border-white/50
                    focus:bg-white/15
                  "
                />

              </div>


              {/* KEHADIRAN */}

              <div>

                <label
                  className="
                    mb-3
                    block
                    text-xs
                    tracking-[0.15em]
                    text-white/80
                  "
                >
                  KONFIRMASI KEHADIRAN
                </label>


                <div
                  className="
                    grid
                    grid-cols-2
                    gap-3
                  "
                >

                  <button
                    type="button"
                    onClick={() =>
                      setKehadiran("hadir")
                    }
                    className={`
                      rounded-xl
                      border
                      px-4
                      py-3
                      text-sm
                      transition-all

                      ${
                        kehadiran === "hadir"
                          ? "border-white bg-white text-[#4b3b2f]"
                          : "border-white/20 bg-white/10 text-white/80"
                      }
                    `}
                  >
                    ✓ Hadir
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      setKehadiran(
                        "tidak_hadir"
                      )
                    }
                    className={`
                      rounded-xl
                      border
                      px-4
                      py-3
                      text-sm
                      transition-all

                      ${
                        kehadiran ===
                        "tidak_hadir"
                          ? "border-white bg-white text-[#4b3b2f]"
                          : "border-white/20 bg-white/10 text-white/80"
                      }
                    `}
                  >
                    Tidak Hadir
                  </button>

                </div>

              </div>


              {/* JUMLAH TAMU */}

              {kehadiran === "hadir" && (

                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                >

                  <label
                    htmlFor="jumlahTamu"
                    className="
                      mb-2
                      block
                      text-xs
                      tracking-[0.15em]
                      text-white/80
                    "
                  >
                    JUMLAH TAMU
                  </label>


                  <select
                    id="jumlahTamu"
                    value={jumlahTamu}
                    onChange={(event) =>
                      setJumlahTamu(
                        Number(
                          event.target.value
                        )
                      )
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/20
                      bg-white/10
                      px-4
                      py-3
                      text-sm
                      text-white
                      outline-none
                      focus:border-white/50
                    "
                  >

                    {Array.from(
                      { length: 10 },
                      (_, index) =>
                        index + 1
                    ).map((jumlah) => (

                      <option
                        key={jumlah}
                        value={jumlah}
                        className="text-black"
                      >
                        {jumlah} Orang
                      </option>

                    ))}

                  </select>

                </motion.div>

              )}


              {/* UCAPAN */}

              <div>

                <label
                  htmlFor="ucapan"
                  className="
                    mb-2
                    block
                    text-xs
                    tracking-[0.15em]
                    text-white/80
                  "
                >
                  UCAPAN & DOA
                </label>


                <textarea
                  id="ucapan"
                  value={ucapan}
                  onChange={(event) =>
                    setUcapan(
                      event.target.value
                    )
                  }
                  placeholder="Tuliskan ucapan dan doa untuk Daniel & Erni..."
                  rows={4}
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-white/20
                    bg-white/10
                    px-4
                    py-3
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/40
                    focus:border-white/50
                    focus:bg-white/15
                  "
                />

              </div>


              {/* ERROR */}

              {error && (

                <div
                  className="
                    rounded-xl
                    border
                    border-red-300/30
                    bg-red-500/10
                    px-4
                    py-3
                    text-center
                    text-xs
                    text-red-100
                  "
                >
                  {error}
                </div>

              )}


              {/* SUBMIT */}

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  w-full
                  rounded-xl
                  bg-white
                  px-5
                  py-3.5
                  text-xs
                  font-medium
                  tracking-[0.2em]
                  text-[#4b3b2f]
                  shadow-lg
                  transition
                  hover:bg-white/90
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading
                  ? "MENGIRIM..."
                  : "KIRIM KONFIRMASI"}
              </motion.button>

            </form>

          ) : (

            /* =====================================
               SUCCESS
            ====================================== */

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                py-10
                text-center
                text-white
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/40
                  bg-white/10
                  text-2xl
                "
              >
                ✓
              </div>


              <h3
                className="
                  mt-6
                  font-serif
                  text-3xl
                "
              >
                Terima Kasih
              </h3>


              <p
                className="
                  mt-4
                  text-sm
                  leading-7
                  text-white/80
                "
              >
                Konfirmasi kehadiran dan ucapan
                Anda telah berhasil dikirim.
              </p>


              <p
                className="
                  mt-5
                  font-serif
                  text-lg
                  text-white
                "
              >
                Daniel & Erni
              </p>

            </motion.div>

          )}

        </div>


        {/* =====================================
            DAFTAR UCAPAN
        ====================================== */}

        <div className="mt-10 w-full">


          {/* HEADER UCAPAN */}

          <div
            className="
              mb-6
              text-center
              text-white
            "
          >

            <p
              className="
                text-[10px]
                tracking-[0.4em]
                text-white/60
              "
            >
              UCAPAN & DOA
            </p>


            <h3
              className="
                mt-3
                font-serif
                text-3xl
              "
            >
              Dari Hati untuk Kami
            </h3>

          </div>


          {/* LOADING */}

          {loadingRSVP ? (

            <div
              className="
                py-8
                text-center
                text-sm
                text-white/60
              "
            >
              Memuat ucapan...
            </div>

          ) : rsvpList.length === 0 ? (

            /* EMPTY STATE */

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
                text-center
                text-sm
                text-white/60
                backdrop-blur-md
              "
            >
              Belum ada ucapan.
              <br />
              Jadilah yang pertama memberikan doa.
            </div>

          ) : (

            /* =====================================
               AUTO SCROLL CONTAINER
            ====================================== */

            <div
              ref={rsvpScrollRef}
              className="
                max-h-[420px]
                space-y-4
                overflow-hidden
                pr-1
              "
            >

              {rsvpList.map((item) => (

                <motion.div
                  key={item.id}
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
                    duration: 0.5,
                  }}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/10
                    p-5
                    shadow-lg
                    backdrop-blur-md
                  "
                >

                  {/* NAMA + STATUS */}

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >

                    <div>

                      <p
                        className="
                          font-medium
                          text-white
                        "
                      >
                        {item.nama}
                      </p>


                      <p
                        className="
                          mt-1
                          text-[10px]
                          tracking-[0.12em]
                          text-white/50
                        "
                      >
                        {item.kehadiran ===
                        "hadir"
                          ? "Hadir"
                          : "Tidak dapat hadir"}
                      </p>

                    </div>


                    <span
                      className="
                        text-lg
                        text-white/40
                      "
                    >
                      ❦
                    </span>

                  </div>


                  {/* UCAPAN */}

                  {item.ucapan && (

                    <p
                      className="
                        mt-4
                        text-sm
                        leading-7
                        text-white/75
                      "
                    >
                      “{item.ucapan}”
                    </p>

                  )}

                </motion.div>

              ))}

            </div>

          )}

        </div>

      </motion.div>

    </section>
  )
}
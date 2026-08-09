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
// TYPE FORM ERROR
// =========================================

type FormErrors = {
  nama?: string
  kehadiran?: string
  jumlahTamu?: string
  ucapan?: string
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

  const [jumlahTamu, setJumlahTamu] = useState<
    number | ""
  >("")

  const [ucapan, setUcapan] = useState("")

  // =========================================
  // STATUS
  // =========================================

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // =========================================
  // FIELD ERROR
  // =========================================

  const [formErrors, setFormErrors] =
    useState<FormErrors>({})

  // =========================================
  // RSVP LIST
  // =========================================

  const [rsvpList, setRsvpList] =
    useState<RSVPData[]>([])

  const [loadingRSVP, setLoadingRSVP] =
    useState(true)

  // =========================================
  // AUTO SCROLL REF
  // =========================================

  const rsvpScrollRef =
    useRef<HTMLDivElement | null>(null)

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
  // LOAD RSVP
  // =========================================

  useEffect(() => {
    fetchRSVP()
  }, [])

  // =========================================
  // VALIDASI FORM
  // =========================================

  function validateForm(): boolean {
    const errors: FormErrors = {}

    // =========================================
    // NAMA
    // =========================================

    const namaTrimmed = nama.trim()

    if (namaTrimmed.length === 0) {
      errors.nama =
        "Nama wajib diisi."
    }

    else if (namaTrimmed.length < 3) {
      errors.nama =
        "Nama minimal 3 karakter."
    }

    else if (namaTrimmed.length > 100) {
      errors.nama =
        "Nama maksimal 100 karakter."
    }

    // Nama harus mengandung huruf
    else if (
      !/[a-zA-ZÀ-ÿ\u00C0-\u024F\u1E00-\u1EFF]/.test(
        namaTrimmed
      )
    ) {
      errors.nama =
        "Nama harus mengandung huruf."
    }

    // =========================================
    // KEHADIRAN
    // =========================================

    if (
      kehadiran !== "hadir" &&
      kehadiran !== "tidak_hadir"
    ) {
      errors.kehadiran =
        "Silakan pilih konfirmasi kehadiran."
    }

    // =========================================
    // JUMLAH TAMU
    // =========================================

    if (kehadiran === "hadir") {
      if (
        jumlahTamu === "" ||
        jumlahTamu === null
      ) {
        errors.jumlahTamu =
          "Silakan pilih jumlah tamu."
      }

      else if (
        typeof jumlahTamu !== "number" ||
        !Number.isInteger(jumlahTamu)
      ) {
        errors.jumlahTamu =
          "Jumlah tamu tidak valid."
      }

      else if (jumlahTamu < 1) {
        errors.jumlahTamu =
          "Jumlah tamu minimal 1 orang."
      }

      else if (jumlahTamu > 10) {
        errors.jumlahTamu =
          "Jumlah tamu maksimal 10 orang."
      }
    }


    // =========================================
    // UCAPAN
    // =========================================

    const ucapanTrimmed = ucapan.trim()

    // UCAPAN WAJIB DIISI
    if (ucapanTrimmed.length === 0) {
      errors.ucapan =
        "Ucapan dan doa wajib diisi."
    }

    // Minimal 5 karakter
    else if (ucapanTrimmed.length < 5) {
      errors.ucapan =
        "Ucapan minimal 5 karakter."
    }

    // Maksimal 500 karakter
    else if (ucapanTrimmed.length > 500) {
      errors.ucapan =
        "Ucapan maksimal 500 karakter."
    }

    // Harus mengandung huruf
    else if (
      !/[a-zA-ZÀ-ÿ\u00C0-\u024F\u1E00-\u1EFF]/.test(
        ucapanTrimmed
      )
    ) {
      errors.ucapan =
        "Ucapan harus mengandung huruf."
    }

    // Tidak boleh terlalu banyak karakter yang sama
    // Contoh: aaaaaaaaaaaa
    else if (
      /(.)\1{7,}/.test(
        ucapanTrimmed
      )
    ) {
      errors.ucapan =
        "Ucapan tidak valid. Mohon tuliskan ucapan yang sebenarnya."
    }

    // =========================================
    // SIMPAN ERROR
    // =========================================

    setFormErrors(errors)

    return (
      Object.keys(errors).length === 0
    )
  }

  // =========================================
  // HANDLE NAMA
  // =========================================

  function handleNamaChange(
    value: string
  ) {
    setNama(value)

    if (formErrors.nama) {
      setFormErrors((previous) => ({
        ...previous,
        nama: undefined,
      }))
    }

    setError("")
  }

  // =========================================
  // HANDLE KEHADIRAN
  // =========================================

  function handleKehadiranChange(
    value:
      | "hadir"
      | "tidak_hadir"
  ) {
    setKehadiran(value)

    setFormErrors((previous) => ({
      ...previous,
      kehadiran: undefined,
      jumlahTamu: undefined,
    }))

    setError("")
  }

  // =========================================
  // HANDLE JUMLAH TAMU
  // =========================================

  function handleJumlahTamuChange(
    value: string
  ) {
    const parsedValue =
      value === ""
        ? ""
        : Number(value)

    setJumlahTamu(parsedValue)

    setFormErrors((previous) => ({
      ...previous,
      jumlahTamu: undefined,
    }))

    setError("")
  }

  // =========================================
  // HANDLE UCAPAN
  // =========================================

  function handleUcapanChange(
    value: string
  ) {
    // Batasi maksimal 500 karakter
    if (value.length > 500) {
      return
    }

    setUcapan(value)

    if (formErrors.ucapan) {
      setFormErrors((previous) => ({
        ...previous,
        ucapan: undefined,
      }))
    }

    setError("")
  }

  // =========================================
  // SUBMIT RSVP
  // =========================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    // =========================================
    // RESET STATUS
    // =========================================

    setError("")
    setSuccess(false)

    // =========================================
    // VALIDASI
    // =========================================

    const isValid =
      validateForm()

    // JANGAN LANJUT KE SUPABASE
    // JIKA VALIDASI GAGAL
    if (!isValid) {
      return
    }

    // =========================================
    // LOADING
    // =========================================

    setLoading(true)

    // =========================================
    // INSERT SUPABASE
    // =========================================

    const {
      error: insertError,
    } = await supabase
      .from("rsvp")
      .insert({
        nama: nama.trim(),

        kehadiran,

        jumlah_tamu:
          kehadiran === "hadir"
            ? Number(jumlahTamu)
            : 1,

        ucapan:
          ucapan.trim() || null,
      })

    // =========================================
    // STOP LOADING
    // =========================================

    setLoading(false)

    // =========================================
    // ERROR SUPABASE
    // =========================================

    if (insertError) {
      console.error(
        "Gagal menyimpan RSVP:",
        insertError
      )

      setError(
        "Maaf, konfirmasi belum berhasil dikirim. Silakan coba lagi."
      )

      return
    }

    // =========================================
    // BERHASIL
    // =========================================

    setSuccess(true)

    await fetchRSVP()

    // =========================================
    // RESET FORM
    // =========================================

    setNama("")
    setKehadiran("hadir")
    setJumlahTamu("")
    setUcapan("")
    setFormErrors({})
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

              {/* =================================
                  NAMA
              ================================== */}

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
                  maxLength={100}
                  onChange={(event) =>
                    handleNamaChange(
                      event.target.value
                    )
                  }
                  placeholder="Masukkan nama Anda"
                  className={`
                    w-full
                    rounded-xl
                    border
                    px-4
                    py-3
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/40
                    focus:bg-white/15

                    ${
                      formErrors.nama
                        ? "border-red-400/70 bg-red-500/10"
                        : "border-white/20 bg-white/10 focus:border-white/50"
                    }
                  `}
                />

                {formErrors.nama && (

                  <p
                    className="
                      mt-2
                      text-xs
                      text-red-200
                    "
                  >
                    {formErrors.nama}
                  </p>

                )}

              </div>

              {/* =================================
                  KEHADIRAN
              ================================== */}

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
                      handleKehadiranChange(
                        "hadir"
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
                      handleKehadiranChange(
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

                {formErrors.kehadiran && (

                  <p
                    className="
                      mt-2
                      text-xs
                      text-red-200
                    "
                  >
                    {formErrors.kehadiran}
                  </p>

                )}

              </div>

              {/* =================================
                  JUMLAH TAMU
              ================================== */}

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
                      handleJumlahTamuChange(
                        event.target.value
                      )
                    }
                    className={`
                      w-full
                      rounded-xl
                      border
                      px-4
                      py-3
                      text-sm
                      text-white
                      outline-none

                      ${
                        formErrors.jumlahTamu
                          ? "border-red-400/70 bg-red-500/10"
                          : "border-white/20 bg-white/10 focus:border-white/50"
                      }
                    `}
                  >

                    <option
                      value=""
                      className="text-black"
                    >
                      Pilih jumlah tamu
                    </option>

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

                  {formErrors.jumlahTamu && (

                    <p
                      className="
                        mt-2
                        text-xs
                        text-red-200
                      "
                    >
                      {formErrors.jumlahTamu}
                    </p>

                  )}

                </motion.div>

              )}

              {/* =================================
                  UCAPAN
              ================================== */}

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
                  maxLength={500}
                  onChange={(event) =>
                    handleUcapanChange(
                      event.target.value
                    )
                  }
                  placeholder="Tuliskan ucapan dan doa untuk Daniel & Erni..."
                  rows={4}
                  className={`
                    w-full
                    resize-none
                    rounded-xl
                    border
                    px-4
                    py-3
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/40
                    focus:bg-white/15

                    ${
                      formErrors.ucapan
                        ? "border-red-400/70 bg-red-500/10"
                        : "border-white/20 bg-white/10 focus:border-white/50"
                    }
                  `}
                />

                <div
                  className="
                    mt-2
                    flex
                    justify-between
                  "
                >

                  <div>

                    {formErrors.ucapan && (

                      <p
                        className="
                          text-xs
                          text-red-200
                        "
                      >
                        {formErrors.ucapan}
                      </p>

                    )}

                  </div>

                  <p
                    className="
                      text-[10px]
                      text-white/40
                    "
                  >
                    {ucapan.length}/500
                  </p>

                </div>

              </div>

              {/* =================================
                  ERROR SUPABASE
              ================================== */}

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

              {/* =================================
                  SUBMIT
              ================================== */}

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

            <div
              ref={rsvpScrollRef}
              className="
                max-h-[420px]
                space-y-4
                overflow-y-auto
                pr-2
                scrollbar-thin
                scrollbar-thumb-white/30
                scrollbar-track-transparent
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
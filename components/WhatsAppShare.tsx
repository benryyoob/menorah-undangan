"use client"

import { useSearchParams } from "next/navigation"

export default function WhatsAppShare() {
  const searchParams = useSearchParams()

  // Ambil nama dari ?to=
  const guestName =
    searchParams.get("to") || "Bapak/Ibu/Saudara/i"

  // Buat link sesuai nama tamu
  const invitationUrl =
    `https://daniel-dan-erni.vercel.app/?to=${encodeURIComponent(
      guestName
    )}`

  const message = `Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i ${guestName} untuk menghadiri acara kami.

Berikut link undangan kami, untuk info lengkap dari acara bisa kunjungi :
${invitationUrl}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Mohon maaf perihal undangan hanya di bagikan melalui pesan ini.
Terima kasih banyak atas perhatiannya.`

  const whatsappUrl =
    `https://wa.me/?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex
        items-center
        justify-center
        rounded-full
        bg-green-600
        px-8
        py-3
        text-sm
        font-medium
        text-white
        shadow-lg
        transition
        hover:bg-green-700
        hover:scale-105
      "
    >
      💬 BAGIKAN KE WHATSAPP
    </a>
  )
}
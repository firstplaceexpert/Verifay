import { NextResponse } from "next/server";
import { saveLead } from "@/lib/db";
import { LeadSubmission } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { fullName, whatsapp, email, brandName, productType, productScale, notes } = body;

    if (!fullName || !whatsapp || !brandName || !productScale) {
      return NextResponse.json(
        { success: false, message: "Mohon lengkapi semua field wajib (Nama, WhatsApp, Nama Brand, dan Skala Produk)." },
        { status: 400 }
      );
    }

    const lead: LeadSubmission = {
      fullName,
      whatsapp,
      email: email || "",
      brandName,
      productType: productType || "Smart NFC Tag Siap Tempel",
      productScale,
      notes: notes || "",
      createdAt: new Date().toISOString(),
    };

    const result = await saveLead(lead);

    // Format WhatsApp pre-filled text for direct lead consultation
    const cleanPhone = whatsapp.replace(/\D/g, "");
    const selectedProd = productType || "Smart NFC Logo / QR ShieldTag";
    const waText = encodeURIComponent(
      `Halo Tim Verifay, saya ${fullName} dari brand ${brandName}. Saya tertarik konsultasi pengadaan ${selectedProd} (estimasi: ${productScale}). Mohon info penawaran dan sampel.`
    );
    // WhatsApp redirect link (points to team WA e.g. +6281234567890 or customer self-WA)
    const adminWhatsApp = process.env.ADMIN_WHATSAPP || "6281234567890";
    const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${waText}`;

    return NextResponse.json({
      success: true,
      message: "Konsultasi Anda berhasil dijadwalkan! Tim Verifay akan segera menghubungi Anda.",
      id: result.id,
      provider: result.provider,
      whatsappUrl,
    });
  } catch (error: unknown) {
    console.error("API Submit Error:", error);
    const msg = error instanceof Error ? error.message : "Terjadi kesalahan internal server.";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

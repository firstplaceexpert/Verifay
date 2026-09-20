# Verifay — Landing Page Marketing Smart NFC & QR ShieldTag

Landing page marketing modern untuk sistem otentisitas dan anti-pemalsuan brand **Verifay**. Alternatif efisien tanpa stiker hologram rapuh dan tanpa QR code yang merusak tampilan visual kemasan.

---

## 🚀 Teknologi Utama

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Tipografi**: Plus Jakarta Sans (Google Fonts)
- **Database Abstraction**:
  - **Lokal**: SQLite bawaan Node.js (`node:sqlite` DatabaseSync)
  - **Production**: Supabase PostgreSQL (`@supabase/supabase-js`)
- **Icons**: Lucide React

---

## 📂 Struktur Project

```text
watermark-logo/
├── data/                    # Tempat penyimpanan leads.db (SQLite lokal)
├── src/
│   ├── app/
│   │   ├── api/submit/      # Endpoint POST penerimaan form CTA
│   │   ├── globals.css      # Styling Tailwind CSS
│   │   ├── layout.tsx       # Root layout, Google fonts, metadata
│   │   └── page.tsx         # Assembly satu halaman landing page
│   ├── components/
│   │   ├── Navbar.tsx       # Header navigasi & drawer mobile
│   │   ├── HeroSection.tsx  # Hero & mockup visual mata vs kriptografi
│   │   ├── ProblemSection.tsx # 3 dampak kerugian pemalsuan
│   │   ├── HowItWorksSection.tsx # 3 langkah kerja digital
│   │   ├── ComparisonSection.tsx # Tabel & kartu komparasi QR/Hologram
│   │   ├── EasyImplementationSection.tsx # Zero redesign & cloud scale
│   │   ├── CTAFormSection.tsx # Form konsultasi & WhatsApp redirect
│   │   └── Footer.tsx       # Footer informasi & hak cipta
│   └── lib/
│       ├── types.ts         # Definisi tipe TypeScript
│       └── db/              # Layer akses data abstrak
│           ├── sqlite.ts    # Handler SQLite lokal
│           ├── supabase.ts  # Handler Supabase production
│           └── index.ts     # Switcher otomatis (DB_PROVIDER)
├── .env.example             # Contoh environment variables
├── .env.local               # Konfigurasi aktif lokal
├── package.json
└── tsconfig.json
```

---

## 💻 Cara Menjalankan

1. **Install dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser.

3. **Build untuk production**:
   ```bash
   npm run build
   ```

---

## ⚙️ Konfigurasi Database (`.env.local`)

Untuk beralih antara database SQLite lokal dan Supabase production, cukup sesuaikan `DB_PROVIDER`:

```env
# Mode Development (Lokal SQLite):
DB_PROVIDER=sqlite
ADMIN_WHATSAPP=6281234567890

# Mode Production (Supabase):
# DB_PROVIDER=supabase
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

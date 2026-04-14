# 🛠️ Fixly — Enterprise Helpdesk System

**Solusi manajemen tiket dan bantuan IT modern untuk tim masa kini.**

Fixly adalah platform *helpdesk* enterprise yang dirancang untuk mempercepat alur kerja support IT dengan antarmuka yang intuitif dan performa tinggi. Dibangun dengan ekosistem JavaScript terbaru (Next.js & Node.js), Fixly memudahkan pengelolaan tiket, kolaborasi tim, dan pemantauan metrik bantuan dalam satu dashboard terpadu.

---

## ✨ Fitur Unggulan

- 📊 **Real-time Dashboard**: Pantau tiket aktif secara langsung tanpa perlu refresh halaman.
- 📋 **Kanban Ticketing**: Kelola status tiket dengan sistem drag-and-drop yang efisien.
- 🔒 **Role-Based Access**: Sistem keamanan berbasis JWT dengan otentikasi peran (Admin vs Support).
- 🎨 **Premium UI/UX**: Tampilan modern menggunakan Tailwind CSS v4 dengan dukungan dark mode dan animasi halus.
- 💬 **Live Interaction**: Komunikasi real-time antar agen melalui Socket.io.
- 📄 **Advanced Filtering**: Cari dan filter tiket berdasarkan urgensi, departemen, atau status.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context & Hooks

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) with TypeScript
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [SQLite](https://sqlite.org/) (via [Prisma ORM](https://www.prisma.io/))
- **Real-time**: [Socket.io](https://socket.io/)
- **Secutity**: JWT & Helmet.js

---

## 🛠️ Cara Instalasi

Ikuti langkah berikut untuk menjalankan Fixly di mesin lokal Anda:

### 1. Persiapan
Pastikan Anda sudah menginstal Node.js dan npm/pnpm di komputer Anda.

### 2. Clone Repository
```bash
git clone https://github.com/adisuswiantara123/Fixly.git
cd Fixly
```

### 3. Setup Backend
```bash
cd backend
npm install
# Buat file .env dan konfigurasi DATABASE_URL
npx prisma migrate dev --name init
npx prisma db seed # Jika ada data awal
npm run dev
```

### 4. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

Buka `http://localhost:3000` untuk melihat hasilnya! 🚀

---

© 2026 Fixly Project by Adi Suswiantara.

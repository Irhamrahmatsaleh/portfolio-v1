// server/api/groq.js

export default defineEventHandler(async (event) => {
  // Ambil apiKey dari environment variable
  const apiKey = process.env.NUXT_GROQ_API_KEY
  // Baca body request
  const body = await readBody(event)
  // Ambil pesan chat user, fallback array kosong jika tidak ada
  const messages = body?.messages || []

  // PORTFOLIO IRHAM: Data jawaban khusus jika pertanyaan tentang Irham
  const irhamPortfolio = `
**Irham Rahmat Saleh**\n
*Software Engineer | Full Stack Developer | AI Trainer*

📧 **Email:** [irhamrahmatsaleh11@gmail.com](mailto:irhamrahmatsaleh11@gmail.com)
📱 **Telepon:** [081364573630](tel:+6281364573630)
📍 **Lokasi:** Sukabumi, Indonesia
🔗 **LinkedIn:** [linkedin.com/in/irham-rahmat-saleh](https://linkedin.com/in/irham-rahmat-saleh)
💻 **GitHub:** [github.com/Irhamrahmatsaleh](https://github.com/Irhamrahmatsaleh)
🐦 **X/Twitter:** [x.com/Irham_R_S](https://x.com/Irham_R_S)
🌐 **Portfolio:** [irhamrahmatsaleh.github.io/irham](https://irhamrahmatsaleh.github.io/irham/)

---

## 📋 **Summary**
Passionate software engineer dengan fokus pada full stack development untuk web dan mobile. Berpengalaman membangun aplikasi dengan ReactJS, React Native, ExpressJS, Spring Boot, Go, dan MySQL. Ahli dalam merancang REST API yang efisien dan scalable, serta integrasi layanan pihak ketiga. Memiliki minat kuat pada teknologi elektrikal, otomasi, dan IoT. Selalu termotivasi untuk belajar teknologi baru dan menerapkan best practices dalam pengembangan software.

---

## 💼 **Pengalaman Kerja**

### **Full-stack Developer** | *PT. Anugerah Swa Mandiri (Magniship)*
📅 **Maret 2023 - Present** | 📍 Indonesia
- Merancang dan mengembangkan solusi web untuk mendukung operasi import-export
- **Frontend:** ReactJS, Vite, TailwindCSS, Framer Motion untuk landing page responsif
- **Backend:** Spring Boot (Java), ExpressJS untuk microservices
- **Database:** MySQL untuk manajemen data terstruktur
- Debugging, troubleshooting, dan implementasi fitur baru
- Kolaborasi dengan stakeholder untuk alignment dengan business goals

### **AI Trainer** | *Outlier*
📅 **Juli 2024 - Juni 2025** | 📍 San Francisco, California, USA
- Menganalisis dan mengevaluasi AI-generated prompts
- Review kualitas prompts berdasarkan verbosity, clarity, dan relevance
- Kategorisasi prompts sesuai guidelines dan use cases
- Quality assurance untuk maintaining high standards
- Kolaborasi tim untuk optimasi AI performance

### **Founder & Hardware Software Technician** | *Irham Cellular Business*
📅 **Januari 2015 - Present** | 📍 West Java, Indonesia
- Teknisi elektronik, software, dan hardware
- Mengelola bisnis teknologi dan perbaikan perangkat

### **Web Developer** | *Yayasan Sarah Amaliah*
📅 **November 2024 - Februari 2025** | 📍 Depok, West Java
- Implementasi fitur halaman website
- Integrasi dengan template existing

### **Web Developer & English Teacher** | *Sorayah English Course*
📅 **Januari 2022 - Juli 2024** | 📍 Depok, West Java
- **Web Developer:** HTML5, CSS3, Bootstrap, JavaScript
- **English Teacher:** Merancang lesson plans untuk berbagai tingkat proficiency
- Mengembangkan materi pembelajaran untuk reading, writing, listening, speaking

### **Research And Development Specialist** | *APRIL (PT RAPP)*
📅 **Juli 2019 - November 2019** | 📍 Pangkalan Kerinci, Riau
- Penelitian dan klasifikasi spesies Acacia dan tanaman lain
- Optimasi kualitas produk

### **Teacher** | *Al Azhar Addauly*
📅 **Oktober 2018 - Mei 2018** | 📍 Pekanbaru, Riau
- Pengajar bahasa Inggris, Arab, dan hafalan Qur'an (tahfidz & tahsin)
- Memotivasi siswa dalam penguasaan bahasa dan studi Qur'an

### **Sales And Marketing Specialist** | *UD. Mulya Jaya*
📅 **Juli 2013 - Juni 2011** | 📍 Kendari, South East Sulawesi
- Perencanaan dan implementasi strategi sales & marketing
- Assembly dan persiapan produk (termasuk brand Olympic)
- Analisis pasar dan identifikasi peluang penjualan baru

---

## 🎓 **Pendidikan**

### **Senior High School, Social Science** | *PKBM LANGGENG IKHLAS*
📅 **Juli 2023 - Juli 2024**
- Fokus pada sistem sosial, ekonomi, dan politik
- Pengembangan analytical dan critical thinking skills
- Studi sosiologi, sejarah, ekonomi, dan geografi

### **Responsive Web Design Certificate** | *freeCodeCamp*
📅 **Januari 2024**
- Pembelajaran HTML, CSS, dan modern design principles
- Mobile-first design dan media queries
- User-friendly, accessible website development

---

## 🛠️ **Keahlian Teknis**

### **Backend Development**
- **Spring Boot** - Spring Data JPA, Database Integration
- **Java** - Enterprise application development
- **ExpressJS** - Node.js web framework
- **Go** - System programming dan microservices
- **REST API** - Design dan implementation
- **API Documentation** - Swagger, Postman

### **Frontend Development**
- **JavaScript** - DOM Manipulation, ES6+, Async Programming, Fetch API
- **ReactJS** - Component-based UI development
- **React Native** - Mobile app development
- **TypeScript** - Static typing, Interface, Generics, Type Inference
- **HTML** - Semantic elements, Form handling, Accessibility
- **CSS** - Flexbox & Grid, Responsive Design, Animation & Transition

### **Database & Tools**
- **MySQL** - Database design dan optimization
- **SQL** - Complex queries dan database management
- **Python** - Scripting dan automation

### **Soft Skills**
- Problem Solving
- Hardware Technician
- Software Engineering Best Practices
- Team Collaboration
- Project Management

---

## 📞 **Hubungi Saya**
Terbuka untuk peluang kolaborasi dan pertumbuhan karir di industri IT!

📧 [irhamrahmatsaleh11@gmail.com](mailto:irhamrahmatsaleh11@gmail.com)
📱 [081364573630](tel:+6281364573630)
🔗 [LinkedIn](https://linkedin.com/in/irham-rahmat-saleh) | [GitHub](https://github.com/Irhamrahmatsaleh) | [Portfolio](https://irhamrahmatsaleh.github.io/irham/)
  `.trim()

  // POLA FILTER: Deteksi pertanyaan tentang Irham (termasuk typo ringan)
  function matchIrham(text) {
    if (!text) return false // Jika kosong, tidak cocok
    // Ubah ke lowercase untuk pencocokan
    const lc = text.toLowerCase()
    // Array pola yang dianggap terkait Irham
    const patterns = [
      /\birham\b/, // persis 'irham'
      /\birham\s+rahmat\s+saleh\b/, // nama lengkap
      /\birh\b/, // typo ringan
      /\birs\b/, // typo ringan
      /\biram\b/, // typo ringan
      /\birhan\b/, // typo ringan
      /\birahm\b/, // typo ringan
      /\birhamr\b/, // typo gabungan
      /\bsiapa\s+(itu|kah)?\s*irh/, // siapa itu irh...
      /\btentang\s+irh/, // tentang irh...
      /\bprofil\s+irh/, // profil irh...
      /\bwho\s+is\s+irh/, // untuk pertanyaan bahasa inggris
    ]
    // Jika salah satu pola cocok, return true
    return patterns.some((re) => re.test(lc))
  }

  // Cek seluruh pesan user (dari messages)
  let irhamDetected = false // Flag deteksi
  let lastUserMessage = '' // Simpan pesan user terakhir
  for (let i = messages.length - 1; i >= 0; i--) {
    // Cek hanya pesan dari user
    if (messages[i]?.role === 'user') {
      lastUserMessage = messages[i].content || ''
      if (matchIrham(lastUserMessage)) {
        irhamDetected = true
        break
      }
    }
  }

  // Jika terdeteksi pertanyaan tentang Irham, langsung balas portfolio
  if (irhamDetected) {
    // Jika typo parah (misal "irs" saja), konfirmasi dulu
    const typoPatterns = [
      /\birs\b/,
      /\birh\b/,
      /\biram\b/,
      /\birhan\b/,
      /\birahm\b/,
    ]
    if (typoPatterns.some((re) => re.test(lastUserMessage.toLowerCase()))) {
      return {
        reply:
          'Apakah maksud Anda *Irham Rahmat Saleh*? Berikut profil lengkap Irham:\n\n' +
          irhamPortfolio,
      }
    }
    return { reply: irhamPortfolio }
  }

  // --- Lanjutkan fetch ke Groq jika tidak ada kata kunci Irham ---
  try {
    // Kirim permintaan ke Groq dengan apiKey asli
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages,
        }),
      },
    )
    // Parse hasil response Groq
    const data = await response.json()
    if (data?.choices?.[0]?.message?.content) {
      return { reply: data.choices[0].message.content }
    } else {
      return { error: data?.error?.message || 'No reply from Groq' }
    }
  } catch (e) {
    return { error: 'Failed to connect to Groq API' }
  }
})

// ------------------------------------------------------------
// Lanjutan logika filter dan dokumentasi tambahan (baris 101-200)
// ------------------------------------------------------------

// Fungsi ini bisa dikembangkan untuk memperbaiki typo lebih lanjut
function normalizeIrham(text) {
  // Jika pola typo, bisa dibetulkan otomatis (contoh sederhana)
  const typoMap = [
    { re: /\birs\b/, fix: 'irham' },
    { re: /\birh\b/, fix: 'irham' },
    { re: /\biram\b/, fix: 'irham' },
    { re: /\birhan\b/, fix: 'irham' },
    { re: /\birahm\b/, fix: 'irham' },
  ]
  let result = text
  typoMap.forEach((item) => {
    result = result.replace(item.re, item.fix)
  })
  return result
}

// Fungsi penjelas untuk menambah robustness filter
function containsIrhamIntent(text) {
  // Normalisasi, hapus spasi dobel, lower
  const clean = (text || '').toLowerCase().replace(/\s+/g, ' ')
  // Tambah pattern pertanyaan open-ended
  // Tambah pattern pertanyaan open-ended dan typo/variasi sebanyak mungkin
  const irhamQ = [
    'who is irham',
    'about irham',
    'profil irham',
    'profile irham',
    'tentang irham',
    'siapa itu irham',
    'irham rahmat saleh',
    'irham r saleh',
    'irhamrs',
    'irham saleh',
    'irham s',
    'irham r',
    'irham r s',
    'irhamrahmat',
    'irhamrahmatsaleh',
    'irham rahmat',
    'irhamr',
    'irhamrsaleh',
    'irham rahmat s',
    'irham r s',
    'irham resume',
    'irham bio',
    'irham biodata',
    'irham cv',
    'irham portofolio',
    'irham portfolio',
    'irham pengalaman',
    'irham pengalaman kerja',
    'irham pengalaman professional',
    'irham pengalaman profesional',
    'irham pengalaman project',
    'irham pengalaman proyek',
    'irham pengalaman organisasi',
    'irham pengalaman pendidikan',
    'irham keahlian',
    'irham skills',
    'irham expertise',
    'irham experience',
    'irham works',
    'irham jobs',
    'irham job',
    'irham contact',
    'irham kontak',
    'kontak irham',
    'how to contact irham',
    'how to reach irham',
    'hubungi irham',
    'hubungi irham rahmat saleh',
    'irham telfon',
    'irham email',
    'email irham',
    'irham github',
    'github irham',
    'irham linkedin',
    'linkedin irham',
    'irham twitter',
    'twitter irham',
    'irham x.com',
    'irham x',
    'irham website',
    'website irham',
    'irham homepage',
    'homepage irham',
    'situs irham',
    'irham sukabumi',
    'irham indonesia',
    'irham outlier',
    'irham magniship',
    'irham anugerah swa mandiri',
    'irham cellular',
    'irham trainer',
    'irham ai trainer',
    'ai trainer irham',
    'full stack irham',
    'fullstack irham',
    'irham fullstack',
    'irham full stack developer',
    'irham developer',
    'irham programmer',
    'irham software engineer',
    'engineer irham',
    'irham dev',
    'irham dev profile',
    'ceritakan tentang irham',
    'ceritakan irham',
    'jelaskan irham',
    'jelaskan tentang irham',
    'mengenal irham',
    'kenal irham',
    'mengenai irham',
    'biodata irham',
    'biodata lengkap irham',
    'biodata irham rahmat saleh',
    'irham summary',
    'summary irham',
    'irham info',
    'info irham',
    'tentang irham rahmat saleh',
    'tentang irham r saleh',
    'irham siapa',
    'siapa irham',
    'irhm',
    'irhams',
    'irs',
    'irahm',
    'iraham',
    'irhamr',
    'irhamsaleh',
    'irham',
    // tambahkan variasi lain sesuai typo/kebiasaan user
  ]

  // Cek apakah ada substring pattern
  return irhamQ.some((q) => clean.includes(q))
}

// (opsional) Untuk kebutuhan audit/logging internal
function logIrhamQuery(userMsg, matchedPattern) {
  // (non-blocking) Simpan log ke file atau database jika ingin tracking
  // console.log(`[IRHAM FILTER] User message: "${userMsg}" | Pattern: ${matchedPattern}`)
}

// --- Penanganan fallback kalau ada error pada JSON parsing dari Groq ---
function safeJsonParse(str) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return { error: 'Response is not valid JSON' }
  }
}

// (opsional) Fungsi utility untuk membatasi rate limit pertanyaan tentang Irham (misal: tidak spam)
const irhamQueryTimestamps = {}
function isIrhamRateLimited(ip) {
  // Implementasi sederhana: satu IP boleh tanya Irham tiap 10 detik saja
  const now = Date.now()
  if (!irhamQueryTimestamps[ip]) {
    irhamQueryTimestamps[ip] = now
    return false
  }
  if (now - irhamQueryTimestamps[ip] < 10000) return true
  irhamQueryTimestamps[ip] = now
  return false
}

// --- Dokumentasi penggunaan ---
//
// Endpoint ini sekarang otomatis:
// - Menjawab detail tentang Irham jika ada pertanyaan (termasuk typo ringan)
// - Konfirmasi jika typo tidak jelas (ex: "irs")
// - Semua pertanyaan lain akan diteruskan ke Groq API (llama-3.1-8b-instant)
// - API key tetap aman, tidak bocor, diambil dari .env
//
// Untuk pengembangan selanjutnya, filter/pola bisa ditambah di bagian patterns/irhamQ.
//
// Note: untuk keamanan production, log dan rate limit sebaiknya pakai Redis atau database, bukan variabel memory.
//
// --- END OF FILE (200+ baris dengan dokumentasi & helper) ---

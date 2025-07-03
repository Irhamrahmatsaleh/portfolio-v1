export default defineEventHandler(async (event) => {
  const apiKey = process.env.NUXT_GROQ_API_KEY
  const body = await readBody(event)
  const messages = body?.messages || []

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

  function isAboutIrham(text) {
    if (!text || typeof text !== 'string') return false

    const lowerText = text.toLowerCase().trim()

    if (lowerText.length < 3) return false

    const commonPhrases = [
      'hai',
      'halo',
      'hello',
      'hi',
      'hey',
      'selamat pagi',
      'selamat siang',
      'selamat sore',
      'selamat malam',
      'good morning',
      'good afternoon',
      'good evening',
      'good night',
      'terima kasih',
      'thanks',
      'thank you',
      'makasih',
      'oke',
      'ok',
      'okay',
      'baik',
      'ya',
      'iya',
      'yes',
      'maaf',
      'sorry',
      'excuse me',
      'bagaimana kabar',
      'apa kabar',
      'how are you',
      'sampai jumpa',
      'bye',
      'goodbye',
      'see you',
    ]

    if (
      commonPhrases.some(
        (phrase) =>
          lowerText === phrase ||
          lowerText.startsWith(phrase + ' ') ||
          lowerText.endsWith(' ' + phrase),
      )
    ) {
      return false
    }

    const irhamPatterns = [
      /\b(siapa|who\s+is)\s+(itu\s+)?irh?a?m/i,
      /\babout\s+irh?a?m/i,
      /\btentang\s+irh?a?m/i,
      /\bprofil\s+irh?a?m/i,
      /\bprofile\s+irh?a?m/i,
      /\bbiodata\s+irh?a?m/i,
      /\bcv\s+irh?a?m/i,
      /\bresume\s+irh?a?m/i,
      /\bportfolio\s+irh?a?m/i,
      /\bportofolio\s+irh?a?m/i,

      /\birham\s+rahmat\s+saleh/i,
      /\birham\s+r\s+saleh/i,
      /\birham\s+saleh/i,

      /\birh?a?m.*(pengalaman|experience|skill|keahlian|kerja|job)/i,
      /\b(pengalaman|experience|skill|keahlian|kerja|job).*irh?a?m/i,

      /\bkontak\s+irh?a?m/i,
      /\bcontact\s+irh?a?m/i,
      /\bhubungi\s+irh?a?m/i,
      /\bemail\s+irh?a?m/i,
      /\btelp?on\s+irh?a?m/i,

      /\birh?a?m.*(developer|programmer|engineer)/i,
      /\b(developer|programmer|engineer).*irh?a?m/i,

      /\b(cerita|ceritakan|jelaskan|informasi|info).*irh?a?m/i,
      /\birh?a?m.*(cerita|ceritakan|jelaskan|informasi|info)/i,
    ]

    return irhamPatterns.some((pattern) => pattern.test(lowerText))
  }

  try {
    let lastUserMessage = ''
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i]?.role === 'user' && messages[i]?.content) {
        lastUserMessage = messages[i].content.trim()
        break
      }
    }

    console.log('Last user message:', lastUserMessage)
    console.log('Is about Irham:', isAboutIrham(lastUserMessage))

    if (isAboutIrham(lastUserMessage)) {
      return { reply: irhamPortfolio }
    }

    if (!apiKey) {
      return { error: 'GROQ API key not configured' }
    }

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
          temperature: 0.7,
          max_tokens: 1000,
        }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Groq API error:', response.status, errorText)
      return {
        error: `Groq API error: ${response.status} - ${response.statusText}`,
      }
    }

    const data = await response.json()

    if (data?.choices?.[0]?.message?.content) {
      return { reply: data.choices[0].message.content }
    } else {
      console.error('Unexpected Groq response:', data)
      return {
        error: data?.error?.message || 'No valid response from Groq API',
      }
    }
  } catch (error) {
    console.error('API Handler error:', error)
    return {
      error: `Connection failed: ${error.message}`,
    }
  }
})

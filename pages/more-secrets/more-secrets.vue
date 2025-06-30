<template>
  <!-- Container utama grid menu super killer -->
  <!-- <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8"> -->
  <div
    class="min-h-0 flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-3 pt-6 pb-2">
    <!-- Judul rahasia -->
    <h1
      class="text-1xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-600 drop-shadow-xl mb-6 tracking-wider select-none animate-pulse">
      🔒 MORE SECRETS
    </h1>
    <!-- Grid menu rahasia -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
      <!-- <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl"> -->
      <!-- Kartu Menu: _secret_hacker -->
      <div @click="navigate('secret-hacker')"
        class="group relative bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-3xl shadow-2xl p-8 cursor-pointer hover:scale-105 transition duration-300 overflow-hidden border-2 border-green-400 hover:border-green-600">
        <div class="absolute left-0 top-0 w-full h-full opacity-10 pointer-events-none select-none">
          <canvas ref="matrixCanvas" class="w-full h-full"></canvas>
        </div>
        <div class="relative z-10 flex flex-col items-center">
          <div class="text-4xl mb-2 animate-hacker-glow">💻</div>
          <div class="font-extrabold text-2xl text-green-400 tracking-wider mb-1 group-hover:scale-110 transition">
            _secret_hacker</div>
          <div class="text-gray-300 font-mono text-center text-sm opacity-80">
            Simulasi terminal & hacking tools<br>Feel like a pro hacker!
          </div>
          <span class="absolute top-3 right-5 text-green-300 text-xs animate-blink">NEW!</span>
        </div>
      </div>
      <!-- Kartu Menu: _secret-games -->
      <div @click="navigate('secret-games')"
        class="group relative bg-gradient-to-br from-purple-900 via-fuchsia-900 to-blue-900 rounded-3xl shadow-2xl p-8 cursor-pointer hover:scale-105 transition duration-300 overflow-hidden border-2 border-fuchsia-400 hover:border-fuchsia-600">
        <div class="absolute inset-0 opacity-15 pointer-events-none">
          <svg viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
            <rect x="10" y="35" width="40" height="10" rx="3" fill="#fff" />
            <rect x="55" y="65" width="30" height="10" rx="3" fill="#fff" />
            <rect x="100" y="45" width="35" height="10" rx="3" fill="#fff" />
            <circle cx="40" cy="70" r="9" fill="#fff" />
            <rect x="70" y="10" width="15" height="10" rx="3" fill="#fff" />
          </svg>
        </div>
        <div class="relative z-10 flex flex-col items-center">
          <div class="text-4xl mb-2 animate-gamepad-glow">🎮</div>
          <div class="font-extrabold text-2xl text-fuchsia-300 tracking-wider mb-1 group-hover:scale-110 transition">
            _secret-games</div>
          <div class="text-gray-200 text-center text-sm opacity-80">
            Koleksi mini-games seru & adiktif. <br>Snake, Tetris, dan banyak lagi!
          </div>
          <span class="absolute top-3 right-5 text-fuchsia-200 text-xs">PLAY!</span>
        </div>
      </div>
      <!-- Kartu Menu: _secret_editor -->
      <div @click="navigate('secret-editor')"
        class="group relative bg-gradient-to-br from-blue-900 via-cyan-800 to-indigo-900 rounded-3xl shadow-2xl p-8 cursor-pointer hover:scale-105 transition duration-300 overflow-hidden border-2 border-blue-400 hover:border-blue-600">
        <div class="absolute right-0 bottom-0 opacity-20 pointer-events-none">
          <svg width="70" height="70" viewBox="0 0 70 70">
            <rect x="10" y="15" width="50" height="5" rx="2.5" fill="#fff" />
            <rect x="10" y="25" width="25" height="5" rx="2.5" fill="#fff" />
            <rect x="10" y="35" width="40" height="5" rx="2.5" fill="#fff" />
          </svg>
        </div>
        <div class="relative z-10 flex flex-col items-center">
          <div class="text-4xl mb-2 animate-editor-glow">📝</div>
          <div class="font-extrabold text-2xl text-blue-300 tracking-wider mb-1 group-hover:scale-110 transition">
            _secret_editor</div>
          <div class="text-gray-200 text-center text-sm opacity-80">
            Mini code & markdown editor.<br>Instant preview & play!
          </div>
          <span class="absolute top-3 right-5 text-blue-200 text-xs animate-blink">DEV</span>
        </div>
      </div>
      <!-- Kartu Menu: _secret_ai-chat -->
      <div @click="navigate('secret-ai-chat')"
        class="group relative bg-gradient-to-br from-gray-900 via-teal-900 to-emerald-900 rounded-3xl shadow-2xl p-8 cursor-pointer hover:scale-105 transition duration-300 overflow-hidden border-2 border-teal-400 hover:border-teal-600">
        <div class="absolute top-0 left-0 opacity-15 pointer-events-none">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <ellipse cx="30" cy="30" rx="25" ry="15" fill="#fff" />
            <ellipse cx="15" cy="35" rx="3" ry="2" fill="#fff" />
            <ellipse cx="45" cy="35" rx="3" ry="2" fill="#fff" />
          </svg>
        </div>
        <div class="relative z-10 flex flex-col items-center">
          <div class="text-4xl mb-2 animate-ai-glow">🤖</div>
          <div class="font-extrabold text-2xl text-teal-300 tracking-wider mb-1 group-hover:scale-110 transition">
            _secret_ai-chat</div>
          <div class="text-gray-200 text-center text-sm opacity-80">
            AI chatbot multi-mode.<br>Curhat, coding, atau tanya apa saja!
          </div>
          <span class="absolute top-3 right-5 text-teal-200 text-xs animate-blink">AI</span>
        </div>
      </div>
      <!-- Kartu Menu: _secret_pixel-art -->
      <div @click="navigate('secret-pixel-art')"
        class="group relative bg-gradient-to-br from-yellow-900 via-orange-800 to-pink-900 rounded-3xl shadow-2xl p-8 cursor-pointer hover:scale-105 transition duration-300 overflow-hidden border-2 border-yellow-400 hover:border-pink-400">
        <div class="absolute left-0 bottom-0 opacity-15 pointer-events-none">
          <svg width="70" height="70" viewBox="0 0 70 70">
            <rect x="12" y="12" width="12" height="12" fill="#fff" />
            <rect x="28" y="12" width="12" height="12" fill="#fff" />
            <rect x="44" y="12" width="12" height="12" fill="#fff" />
            <rect x="12" y="28" width="12" height="12" fill="#fff" />
            <rect x="28" y="28" width="12" height="12" fill="#fff" />
            <rect x="44" y="28" width="12" height="12" fill="#fff" />
          </svg>
        </div>
        <div class="relative z-10 flex flex-col items-center">
          <div class="text-4xl mb-2 animate-pixel-glow">🟩</div>
          <div class="font-extrabold text-2xl text-yellow-300 tracking-wider mb-1 group-hover:scale-110 transition">
            _secret_pixel-art</div>
          <div class="text-gray-200 text-center text-sm opacity-80">
            Pixel Art Maker.<br>Bikin & download karya pixel unikmu!
          </div>
          <span class="absolute top-3 right-5 text-yellow-200 text-xs">ART</span>
        </div>
      </div>

      <!-- Kartu Menu: _secret_math-lab -->
      <div @click="navigate('secret-math-lab')"
        class="group relative bg-gradient-to-br from-indigo-900 via-blue-900 to-emerald-900 rounded-3xl shadow-2xl p-8 cursor-pointer hover:scale-105 transition duration-300 overflow-hidden border-2 border-indigo-400 hover:border-emerald-400 mt-2">
        <div class="absolute right-2 bottom-0 opacity-18 pointer-events-none">
          <svg width="90" height="60" viewBox="0 0 90 60">
            <!-- Integral symbol -->
            <path d="M30,55 Q25,35 35,10 Q45,0 60,25" stroke="#fff" stroke-width="4" fill="none" />
            <!-- Sigma symbol -->
            <path d="M65,45 Q60,35 70,30 Q60,25 65,15" stroke="#fff" stroke-width="4" fill="none" />
            <!-- Pi symbol -->
            <path d="M16,35 L26,35 M21,15 L21,50" stroke="#fff" stroke-width="4" fill="none" />
          </svg>
        </div>
        <div class="relative z-10 flex flex-col items-center">
          <div class="text-4xl mb-2 animate-math-glow">∑</div>
          <div class="font-extrabold text-2xl text-indigo-200 tracking-wider mb-1 group-hover:scale-110 transition">
            _secret_math-lab
          </div>
          <div class="text-gray-200 text-center text-sm opacity-80">
            Math Lab Interaktif.<br>
            Kalkulus, Aljabar, dan eksplorasi matematika lanjutan!
          </div>
          <span class="absolute top-3 right-5 text-emerald-200 text-xs animate-blink">MATH</span>
        </div>
      </div>

    </div>
    <!-- Footer rahasia -->
    <!-- Gantikan footer lama dengan kode baru di bawah ini -->
    <!-- <div class="mt-14 flex justify-center select-none"> -->
    <div class="mt-3 flex justify-center select-none">
      <div class="footer-piano">
        <span v-for="(key, i) in pianoKeys" :key="i" :class="['piano-key', { 'active': key.active }]"
          :style="{ '--delay': (i * 0.11) + 's' }">
          {{ key.char }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Router untuk navigasi antar fitur rahasia
const router = useRouter()

// Footer piano effect
const footerText = `© ${new Date().getFullYear()} — Secrets`
const pianoKeys = ref([])

// Fungsi navigasi ke halaman fitur rahasia
function navigate(route) {
  console.log('coba klik', route)
  router.push(`/more-secrets/${route}`)
}

// Untuk animasi matrix pada kartu hacker
const matrixCanvas = ref(null)
let matrixInterval = null

onMounted(() => {
  if (matrixCanvas.value) {
    const canvas = matrixCanvas.value
    const ctx = canvas.getContext('2d')
    let width = canvas.width = 300
    let height = canvas.height = 100
    let cols = Math.floor(width / 12)
    let ypos = Array(cols).fill(0)

    function matrix() {
      ctx.fillStyle = 'rgba(0,0,0,0.15)'
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = '#39ff14'
      ctx.font = '16px monospace'
      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96)
        ctx.fillText(text, ind * 12, y)
        if (y > 100 + Math.random() * 100) ypos[ind] = 0
        else ypos[ind] = y + 14
      })
    }
    matrixInterval = setInterval(matrix, 40)
  }
})

// Bersihkan interval animasi ketika unmount
onUnmounted(() => {
  if (matrixInterval) clearInterval(matrixInterval)
})

// Setiap karakter menjadi "key" piano
onMounted(() => {
  pianoKeys.value = footerText.split('').map(char => ({
    char,
    active: false,
  }));

  // Animasi kelap-kelip berurutan (piano kanan & kiri)
  let dir = 1, idx = 0, interval = null
  function glowLoop() {
    pianoKeys.value.forEach(k => k.active = false)
    pianoKeys.value[idx].active = true

    if (dir === 1) {
      if (idx < pianoKeys.value.length - 1) idx++
      else { dir = -1; idx-- }
    } else {
      if (idx > 0) idx--
      else { dir = 1; idx++ }
    }
  }
  interval = setInterval(glowLoop, 55)

  // Bersihkan interval saat komponen di-unmount
  onUnmounted(() => clearInterval(interval))
})
</script>

<style scoped>
/* Animasi glow hacker */
@keyframes hackerGlow {
  0% {
    text-shadow: 0 0 10px #39ff14, 0 0 20px #39ff14;
  }

  50% {
    text-shadow: 0 0 20px #00ffea, 0 0 40px #39ff14;
  }

  100% {
    text-shadow: 0 0 10px #39ff14, 0 0 20px #39ff14;
  }
}

.animate-hacker-glow {
  animation: hackerGlow 1.5s infinite alternate;
}

/* Animasi blink */
@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: .3;
  }
}

.animate-blink {
  animation: blink 1s infinite;
}

/* Animasi glow AI */
@keyframes aiGlow {
  0% {
    text-shadow: 0 0 8px #10b981, 0 0 18px #0fffc2;
  }

  50% {
    text-shadow: 0 0 20px #00ffea, 0 0 32px #00ffe7;
  }

  100% {
    text-shadow: 0 0 8px #10b981, 0 0 18px #0fffc2;
  }
}

.animate-ai-glow {
  animation: aiGlow 1.7s infinite alternate;
}

/* Animasi glow pixel */
@keyframes pixelGlow {
  0% {
    filter: drop-shadow(0 0 8px #ffe066);
  }

  50% {
    filter: drop-shadow(0 0 18px #ff70a6);
  }

  100% {
    filter: drop-shadow(0 0 8px #ffe066);
  }
}

.animate-pixel-glow {
  animation: pixelGlow 1.3s infinite alternate;
}

/* Animasi glow gamepad */
@keyframes gamepadGlow {
  0% {
    text-shadow: 0 0 10px #d946ef, 0 0 18px #818cf8;
  }

  50% {
    text-shadow: 0 0 20px #fae8ff, 0 0 32px #818cf8;
  }

  100% {
    text-shadow: 0 0 10px #d946ef, 0 0 18px #818cf8;
  }
}

.animate-gamepad-glow {
  animation: gamepadGlow 1.6s infinite alternate;
}

/* Animasi glow editor */
@keyframes editorGlow {
  0% {
    text-shadow: 0 0 10px #60a5fa, 0 0 20px #818cf8;
  }

  50% {
    text-shadow: 0 0 20px #bae6fd, 0 0 40px #60a5fa;
  }

  100% {
    text-shadow: 0 0 10px #60a5fa, 0 0 20px #818cf8;
  }
}

.animate-editor-glow {
  animation: editorGlow 1.1s infinite alternate;
}

/* Animasi glow math */
@keyframes mathGlow {
  0% {
    text-shadow: 0 0 12px #818cf8, 0 0 16px #34d399;
  }

  50% {
    text-shadow: 0 0 22px #fefefe, 0 0 38px #4f46e5;
  }

  100% {
    text-shadow: 0 0 12px #818cf8, 0 0 16px #34d399;
  }
}

.animate-math-glow {
  animation: mathGlow 1.33s infinite alternate;
}

.footer-piano {
  display: flex;
  gap: 2px;
  padding: 7px 16px 4px 16px;
  background: rgba(31, 41, 55, 0.85);
  border-radius: 1.5rem;
  box-shadow: 0 4px 28px #000a, 0 0 0 2px #222c;
}

.piano-key {
  display: inline-block;
  min-width: 16px;
  text-align: center;
  font-family: 'JetBrains Mono', 'Fira Mono', monospace;
  font-size: 1rem;
  color: #a3a3a3;
  background: linear-gradient(180deg, #222 70%, #333 100%);
  border-radius: 0.3em;
  margin: 0 1.5px;
  box-shadow: 0 1px 4px #0007;
  transition:
    color 0.13s cubic-bezier(.36, .51, .63, 1.48),
    background 0.13s cubic-bezier(.36, .51, .63, 1.48),
    box-shadow 0.13s;
  position: relative;
}

.piano-key.active {
  color: #fff;
  background: linear-gradient(180deg, #c4b5fd 0%, #1de9b6 70%, #818cf8 100%);
  box-shadow: 0 0 18px #fff9, 0 0 12px #818cf899;
  z-index: 2;
  animation: piano-key-blink 0.23s cubic-bezier(.4, 2, .3, 1.3);
}

@keyframes piano-key-blink {
  0% {
    filter: brightness(1.5) blur(1.5px);
  }

  100% {
    filter: none;
  }
}

/* Efek animasi hover card: tremor, refleksi, & border glow */
.group:hover {
  box-shadow: 0 0 32px 8px #39ff1455, 0 0 0 4px #fff3 inset;
  transform: perspective(800px) rotateY(-3deg) scale(1.035);
  transition: box-shadow 0.3s, transform 0.3s;
}

.group:active {
  transform: scale(0.98);
  filter: brightness(1.2);
}

/* Efek refleksi bawah pada kartu */
.group::after {
  content: "";
  position: absolute;
  left: 10%;
  bottom: -14px;
  width: 80%;
  height: 25px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0) 90%);
  border-radius: 100vw;
  filter: blur(2px);
  pointer-events: none;
  z-index: 5;
}

/* Efek border animasi pada hover */
.group:hover {
  border-image: linear-gradient(90deg, #39ff14, #00ffea, #818cf8, #ffb300) 1;
  animation: borderGlow 1.8s linear infinite alternate;
}

@keyframes borderGlow {
  0% {
    box-shadow: 0 0 0 0 #39ff14;
  }

  50% {
    box-shadow: 0 0 18px 5px #ffb300;
  }

  100% {
    box-shadow: 0 0 0 0 #39ff14;
  }
}

/* Efek transisi smooth scaling semua kartu */
.group {
  transition: transform 0.25s cubic-bezier(.18, .89, .32, 1.28), box-shadow 0.18s;
}

/* Animasi muncul grid menu */
.grid {
  animation: fadeInGrid 1.4s cubic-bezier(.22, .61, .36, 1) both;
}

@keyframes fadeInGrid {
  from {
    opacity: 0;
    transform: translateY(80px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Responsive font dan padding kartu */
@media (max-width: 640px) {
  .group .font-extrabold {
    font-size: 1.15rem;
  }

  .group {
    padding: 1.2rem;
  }
}

/* 3D transform hover super killer */
.group:hover .font-extrabold {
  text-shadow: 0 2px 16px #fff9, 0 0 18px #39ff14;
  filter: brightness(1.35) drop-shadow(0 0 12px #fff9);
}

/* Efek garis bawah animasi pada judul */
h1 {
  position: relative;
}

h1::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -18px;
  transform: translateX(-50%);
  width: 220px;
  height: 7px;
  border-radius: 2em;
  background: linear-gradient(90deg, #39ff14, #818cf8, #ffb300);
  opacity: 0.24;
  filter: blur(2px);
  animation: underlineFlow 2.8s infinite alternate;
}

@keyframes underlineFlow {
  0% {
    width: 140px;
    opacity: 0.15;
  }

  60% {
    width: 270px;
    opacity: 0.3;
  }

  100% {
    width: 180px;
    opacity: 0.18;
  }
}

/* Custom scrollbar dark mode */
::-webkit-scrollbar {
  width: 10px;
  background: #18181b;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #818cf8 10%, #39ff14 90%);
  border-radius: 6px;
}

/* Tooltip efek animasi (opsional, untuk badge kecil) */
.group [class*='absolute'][class*='text-xs'] {
  transition: transform 0.22s, opacity 0.22s;
  filter: drop-shadow(0 0 6px #fff9);
}

.group:hover [class*='absolute'][class*='text-xs'] {
  transform: scale(1.15) translateY(-4px) rotate(-4deg);
  opacity: 1;
}

/* Hover animasi floating icon */
.group:hover .text-4xl {
  animation: floatIcon 1.2s infinite alternate;
}

@keyframes floatIcon {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-7px) scale(1.08);
  }
}

/* (OPTIONAL) Efek background gradient nyala animasi */
.bg-gradient-to-br {
  background-size: 400% 400%;
  animation: gradientMove 8s ease-in-out infinite;
}

@keyframes gradientMove {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}


/* Batasi tinggi max konten agar selalu muat di atas fold */
@media (min-width: 1024px) {
  .min-h-0 {
    min-height: 0 !important;
    height: calc(100vh - 110px);
    /* header 60px + margin bawah */
    overflow: visible;
  }

  .grid {
    align-items: center;
  }
}
</style>

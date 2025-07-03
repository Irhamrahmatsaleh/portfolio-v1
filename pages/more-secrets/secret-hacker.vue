<template>
  <section class="hacker-root-section bg-black h-screen flex flex-col items-center justify-center p-0 m-0"
    aria-label="Super Killer Hacker Terminal Root Section">
    <!-- SECTION: Title & Sound Control -->
    <header class="w-full max-w-5xl flex items-center justify-between mb-4 border-b border-green-700 pb-2"
      aria-label="Header Hacker Terminal">
      <h1
        class="text-1xl sm:text-1xl md:text-3xl font-extrabold text-green-400 tracking-widest uppercase select-none drop-shadow"
        aria-label="Super Killer Hacker Title">
        _secret_hacker
      </h1>

      <div class="flex gap-3 items-center">
        <!-- Sound Toggle Component -->
        <SettingSoundToggle class="!p-2 !text-base" :model-value="soundOn" @update:sound="handleSoundUpdate" />
      </div>
    </header>

    <main class="w-full max-w-5xl flex flex-col md:flex-row gap-4" aria-label="Main Hacker Terminal Area">
      <div class="w-full md:w-8/12 flex flex-col">
        <TerminalWindow :sound-on="soundOn" @terminal-event="handleTerminalEvent" />
        <div class="mt-3 flex gap-2 justify-end">
          <span class="inline-block h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
          <span class="text-xs text-green-300">Online</span>
        </div>
      </div>

      <!-- RIGHT: Hacker Info Sidebar -->
      <aside class="hidden md:flex flex-col w-4/12 bg-[#0c1b16] rounded-lg p-4 border border-green-900 shadow-lg"
        aria-label="Hacker Sidebar">
        <h2 class="text-lg font-bold text-green-300 mb-2 tracking-wider">
          Hacker Info
        </h2>
        <ul class="text-green-200 text-sm leading-relaxed space-y-1">
          <li><b>User:</b> <span class="text-green-400">root@superHacker</span></li>
          <li><b>Level:</b> <span class="text-green-400">9999+</span></li>
          <li><b>IP:</b> <span class="text-green-400">127.0.0.1</span></li>
          <li><b>Status:</b> <span class="text-green-400">Connected</span></li>
          <li><b>Session:</b> <span class="text-green-400">UNLIMITED</span></li>
        </ul>
        <div class="mt-4">
          <h3 class="text-green-400 font-semibold text-sm mb-2 uppercase">Quick Links</h3>
          <ul class="space-y-1 text-green-300 text-xs">
            <li><a href="#" class="hover:underline">Docs</a></li>
            <li><a href="#" class="hover:underline">Source</a></li>
            <li><a href="#" class="hover:underline">API</a></li>
            <li><a href="#" class="hover:underline">Support</a></li>
            <li>
              <span class="note-yellow">
                sudo google keyword
              </span>
              <span class="note-red">
                * Terminal ini hanya simulasi untuk edukasi.
              </span>
            </li>

          </ul>
        </div>
      </aside>
    </main>

    <!-- SECTION: Footer/Credits -->
    <footer
      class="w-full max-w-5xl mt-8 flex flex-col items-center text-green-500 text-xs border-t border-green-800 pt-2"
      aria-label="Footer Hacker Terminal">
      <span>Super Hacker Terminal &copy; 2025 | All rights reserved.</span>
      <!-- <span class="mt-1">Made with <span class="animate-pulse">💚</span> for world domination.</span> -->
    </footer>
  </section>

  <Teleport to="body">
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div class="bg-[#111] border border-green-700 rounded-xl shadow-2xl p-8 min-w-[350px] max-w-md">
        <!-- Modal Content Placeholder -->
        <h3 class="font-bold text-green-400 mb-4">Terminal Message</h3>
        <p class="text-green-200 mb-6">{{ modalContent }}</p>
        <button @click="closeModal"
          class="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded shadow">
          Close
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import TerminalWindow from '@/components/TerminalWindow.vue'
import SettingSoundToggle from '@/components/SettingSoundToggle.vue'

const soundOn = ref(true)
const showModal = ref(false)
const modalContent = ref('')

// Sync sound toggle dari SettingSoundToggle
function handleSoundUpdate(val) {
  soundOn.value = val
}

// Untuk modal terminal event
function openModal(message) {
  modalContent.value = message
  showModal.value = true
}
function closeModal() {
  showModal.value = false
  modalContent.value = ''
}
function handleTerminalEvent(type, payload) {
  if (type === 'modal') openModal(payload)
}
</script>

<style>
.note-red {
  color: #ff3b3b;
  font-size: 0.92em;
  font-weight: 600;
  margin-top: 4px;
  display: block;
}

.note-yellow {
  color: #f1d537;
  font-size: 0.92em;
  font-weight: 600;
  margin-top: 4px;
  display: block;
}

@media (max-width: 600px) {
  .terminal-window {
    padding: 10px !important;
    min-height: 300px !important;
  }

  .terminal-input {
    width: 95vw !important;
    min-width: 0 !important;
    font-size: 1rem !important;
  }
}
</style>

<template>
  <div class="ai-chat-app">
    <!-- Hamburger SELALU tampil di mobile -->
    <button class="sidebar-hamburger" :class="{ 'sidebar-open': sidebarOpen }" v-if="isMobile" @click="toggleSidebar"
      aria-label="Open sidebar">
      <!-- <svg width="30" height="30" viewBox="0 0 30 30">
        <rect y="6" width="30" height="3" rx="1.5" fill="#cdd6e7" />
        <rect y="13.5" width="30" height="3" rx="1.5" fill="#cdd6e7" />
        <rect y="21" width="30" height="3" rx="1.5" fill="#cdd6e7" />
      </svg> -->
      <!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cdd6e7" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <line x1="4" y1="6" x2="20" y2="6"></line>
        <line x1="4" y1="12" x2="20" y2="12"></line>
        <line x1="4" y1="18" x2="20" y2="18"></line>
      </svg> -->
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cdd6e7" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    </button>

    <!-- Overlay backdrop untuk mobile -->
    <div v-if="isMobile && sidebarOpen" class="sidebar-backdrop" @click="closeSidebar"></div>

    <!-- Sidebar mobile overlay -->
    <Sidebar v-if="isMobile" class="ai-chat-sidebar sidebar-overlay" :class="{ 'sidebar-visible': sidebarOpen }"
      :collapsed="false" :overlay="true" @toggle="toggleSidebar" @close="closeSidebar" />

    <!-- Sidebar desktop -->
    <Sidebar v-else class="ai-chat-sidebar" :collapsed="sidebarCollapsed" :overlay="false"
      @toggle="sidebarCollapsed = !sidebarCollapsed" />

    <div class="ai-chat-main">
      <div class="ai-chat-messages" ref="messagesContainer">
        <ChatBubble v-for="(msg, idx) in messages" :key="`msg-${idx}-${msg.timestamp}`" :role="msg.role"
          :content="msg.content" :typing="msg.typing || false" :isIrham="msg.isIrham" :time="msg.time" />
      </div>

      <!-- Prompt + input center (desktop, belum ada chat) -->
      <div v-if="!isMobile && messages.length === 0" class="ai-chat-input-center">
        <div class="ai-chat-ready-center">
          <div class="ready-title">Mau nanya apa?</div>
        </div>
        <ChatInput :disabled="loading" @send="handleSend" />
      </div>

      <!-- Prompt + input center (mobile, belum ada chat) -->
      <div v-else-if="isMobile && messages.length === 0" class="ai-chat-input-center ai-chat-input-center-mobile">
        <div class="ai-chat-ready-center ai-chat-ready-center-mobile">
          <div class="ready-title ready-title-mobile">Mau nanya apa?</div>
        </div>
        <ChatInput :disabled="loading" @send="handleSend" />
      </div>

      <!-- Input bawah (mobile ATAU sudah ada chat) -->
      <div v-else class="ai-chat-input ai-chat-input-bottom">
        <ChatInput :disabled="loading" @send="handleSend" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ChatBubble from '~/components/ai-chat/ChatBubble.vue'
import { ref, onMounted, nextTick } from 'vue'
import Sidebar from '~/components/ai-chat/Sidebar.vue'
import ChatInput from '~/components/ai-chat/ChatInput.vue'

const sidebarCollapsed = ref(false)
const loading = ref(false)
const messages = ref([])
const messagesContainer = ref(null)

const sidebarOpen = ref(false)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 640
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

// Fixed sidebar functions
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

// Fungsi untuk scroll ke bawah
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Fungsi untuk menambah pesan dengan timestamp unik
const addMessage = (role, content, options = {}) => {
  const message = {
    role,
    content,
    timestamp: Date.now(),
    typing: options.typing || false,
    isIrham: options.isIrham || false,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  }
  messages.value.push(message)
  return message
}

// Fungsi untuk update pesan terakhir
const updateLastMessage = (updates) => {
  if (messages.value.length > 0) {
    const lastMessage = messages.value[messages.value.length - 1]
    Object.assign(lastMessage, updates)
  }
}

const handleSend = async (message) => {
  if (!message.trim()) return

  // Tambah pesan user
  addMessage('user', message.trim())
  scrollToBottom()

  // Set loading state
  loading.value = true

  // Tambah pesan assistant dengan typing effect
  const assistantMessage = addMessage('assistant', '', { typing: true })
  scrollToBottom()

  try {
    const res = await fetch('/api/groq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: messages.value
          .filter(m => !m.typing) // Exclude typing messages from API call
          .map(m => ({ role: m.role, content: m.content }))
      })
    })

    const data = await res.json()

    if (data.reply) {
      // Update pesan assistant dengan konten dan mulai typing
      updateLastMessage({
        content: data.reply,
        typing: true
      })

      // Tunggu sedikit untuk memulai typing effect
      setTimeout(() => {
        updateLastMessage({ typing: false })
        scrollToBottom()
      }, 100)

    } else {
      // Jika tidak ada reply
      updateLastMessage({
        content: 'Maaf, tidak ada respons dari server.',
        typing: false
      })
    }
  } catch (error) {
    console.error('Error:', error)
    updateLastMessage({
      content: `Maaf, terjadi kesalahan: ${error.message}`,
      typing: false
    })
  } finally {
    loading.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
.ai-chat-app {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 0;
  background: #112131;
  position: relative;
}

.ai-chat-sidebar {
  height: 100%;
  overflow-y: auto;
  z-index: 11;
}

/* Sidebar backdrop untuk mobile */
.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  backdrop-filter: blur(4px);
}

/* Sidebar overlay mobile */
.sidebar-overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 80vw;
  max-width: 340px;
  height: 100vh;
  z-index: 1001;
  background: #181a20;
  box-shadow: 2px 0 30px rgba(0, 0, 0, 0.25);
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(.4, .2, .2, 1);
}

.sidebar-overlay.sidebar-visible {
  transform: translateX(0);
}

.sidebar-hamburger {
  display: none;
  transition: transform 0.3s cubic-bezier(.4, .2, .2, 1);
}

.ai-chat-main {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  position: relative;
}

.ai-chat-messages {
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  padding: 32px 20px 16px 20px;
  scroll-behavior: smooth;
}

/* Scrollbar styling */
.ai-chat-messages::-webkit-scrollbar {
  width: 6px;
}

.ai-chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.ai-chat-messages::-webkit-scrollbar-thumb {
  background: #2a3441;
  border-radius: 3px;
}

.ai-chat-messages::-webkit-scrollbar-thumb:hover {
  background: #364252;
}

/* INPUT CENTER MODE */
.ai-chat-input-center {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  background: transparent;
}

.ai-chat-ready-center {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  pointer-events: none;
  margin-bottom: 250px;
  width: 100%;
}

.ready-title {
  font-size: 2.4rem;
  color: #e3eaf7;
  font-weight: 600;
  opacity: 0.95;
  letter-spacing: -0.02em;
  text-align: center;
  user-select: none;
  background: linear-gradient(135deg, #e3eaf7 0%, #a0b4d8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.ai-chat-input-center :deep(.chat-input-row) {
  min-width: 500px;
  max-width: 700px;
  width: 100%;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  display: flex;
  align-items: flex-end;
  position: relative;
  border: none;
}

.ai-chat-input-center :deep(textarea) {
  background: #1a1f2e;
  border: 2px solid rgba(64, 97, 224, 0.3);
  border-radius: 20px;
  font-size: 1.1rem;
  color: #fff;
  width: 100%;
  min-height: 56px;
  max-height: 180px;
  outline: none;
  font-family: inherit;
  padding: 16px 60px 16px 20px;
  margin: 0;
  line-height: 1.5;
  resize: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.ai-chat-input-center :deep(textarea:focus) {
  border-color: #4061e0;
  box-shadow: 0 4px 20px rgba(64, 97, 224, 0.2);
}

.ai-chat-input-center :deep(button[type="submit"]) {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #4061e0 0%, #5b73e8 100%);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(64, 97, 224, 0.3);
  z-index: 2;
}

.ai-chat-input-center :deep(button[type="submit"]:hover:not(:disabled)) {
  background: linear-gradient(135deg, #3651d4 0%, #4a62dc 100%);
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 4px 12px rgba(64, 97, 224, 0.4);
}

.ai-chat-input-center :deep(button[type="submit"]:disabled) {
  background: #2a3441;
  cursor: not-allowed;
  opacity: 0.6;
  transform: translateY(-50%);
}

/* INPUT BOTTOM MODE */
.ai-chat-input-bottom {
  display: flex;
  align-items: flex-end;
  flex: 0 0 auto;
  position: relative;
  width: 100%;
  background: linear-gradient(180deg, #162636 0%, #1a2d3f 100%);
  z-index: 2;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px 20px 16px 20px;
  backdrop-filter: blur(8px);
}

/* Mobile Styles */
@media (max-width: 640px) {
  .ai-chat-app {
    flex-direction: column;
    height: 100dvh;
    min-height: 0;
  }

  .sidebar-hamburger {
    display: block;
    position: fixed;
    left: 16px;
    top: 16px;
    z-index: 1010;
    background: rgba(26, 31, 46, 0.9);
    border: none;
    outline: none;
    padding: 8px;
    cursor: pointer;
    border-radius: 8px;
    backdrop-filter: blur(8px);
  }

  .sidebar-hamburger.sidebar-open {
    transform: translateX(320px);
  }

  .ai-chat-sidebar {
    display: block !important;
  }

  .ai-chat-main {
    height: 100dvh;
    min-height: 0;
    width: 100vw;
    flex: 1 1 auto;
    position: relative;
  }

  .ai-chat-messages {
    padding: 60px 16px 16px 16px;
  }

  /* Mobile center styles - khusus untuk mobile */
  .ai-chat-input-center-mobile {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    background: transparent;
  }

  .ai-chat-ready-center-mobile {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    pointer-events: none;
    margin-bottom: 240px;
    width: 100%;
  }

  .ready-title-mobile {
    font-size: 2.2rem;
    color: #e3eaf7;
    font-weight: 600;
    opacity: 0.95;
    letter-spacing: -0.02em;
    text-align: center;
    user-select: none;
    background: linear-gradient(135deg, #e3eaf7 0%, #a0b4d8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 0;
    padding: 0 20px;
  }

  .ai-chat-input-center-mobile :deep(.chat-input-row) {
    min-width: 0;
    max-width: 90vw;
    width: 90vw;
    margin: 0 auto;
    position: relative;
    z-index: 4;
  }

  .ai-chat-input-center-mobile :deep(textarea) {
    background: #1a1f2e;
    border: 2px solid rgba(64, 97, 224, 0.3);
    border-radius: 16px;
    font-size: 1rem;
    color: #fff;
    width: 100%;
    min-height: 50px;
    max-height: 120px;
    outline: none;
    font-family: inherit;
    padding: 14px 50px 14px 16px;
    margin: 0;
    line-height: 1.5;
    resize: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .ai-chat-input-center-mobile :deep(textarea:focus) {
    border-color: #4061e0;
    box-shadow: 0 4px 20px rgba(64, 97, 224, 0.2);
  }

  .ai-chat-input-center-mobile :deep(button[type="submit"]) {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(135deg, #4061e0 0%, #5b73e8 100%);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(64, 97, 224, 0.3);
    z-index: 2;
  }

  .ai-chat-input-center-mobile :deep(button[type="submit"]:hover:not(:disabled)) {
    background: linear-gradient(135deg, #3651d4 0%, #4a62dc 100%);
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 4px 12px rgba(64, 97, 224, 0.4);
  }

  .ai-chat-input-center-mobile :deep(button[type="submit"]:disabled) {
    background: #2a3441;
    cursor: not-allowed;
    opacity: 0.6;
    transform: translateY(-50%);
  }

  .ai-chat-input-bottom {
    padding: 12px 16px 20px 16px;
  }

  .ai-chat-input-bottom :deep(.chat-input-row) {
    width: 100%;
    max-width: 100%;
    margin: 0;
  }

  .ai-chat-input-bottom :deep(textarea) {
    font-size: 1rem;
    min-height: 50px;
    max-height: 120px;
    padding: 14px 50px 14px 16px;
    border-radius: 16px;
    background: #1a1f2e;
    border: 2px solid rgba(64, 97, 224, 0.3);
  }

  .ai-chat-input-bottom :deep(button[type="submit"]) {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
}

/* Animasi loading */
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.loading-indicator {
  animation: pulse 1.5s ease-in-out infinite;
}

/* Smooth transitions */
* {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

/* Dark mode enhancements */
.ai-chat-messages {
  background: linear-gradient(180deg, #112131 0%, #0f1f2e 100%);
}

/* Better focus states */
.ai-chat-input-center :deep(textarea:focus),
.ai-chat-input-bottom :deep(textarea:focus) {
  outline: none;
  border-color: #4061e0;
  box-shadow: 0 0 0 3px rgba(64, 97, 224, 0.1);
}
</style>

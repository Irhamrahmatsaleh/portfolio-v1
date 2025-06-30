<template>
  <div class="terminal-window" @click="focusInput" tabindex="0" ref="terminalContainer"
    aria-label="Super Killer Terminal">
    <div class="terminal-output">
      <div v-for="(line, idx) in displayLines" :key="idx" class="terminal-line">
        <span v-if="line.prompt" class="prompt">{{ line.prompt }}</span>
        <span class="content">{{ line.content }}</span>
      </div>
      <div class="terminal-input-line">
        <span class="prompt">{{ prompt }}</span>
        <input ref="input" v-model="currentInput" @keydown="handleKey" class="terminal-input" autocomplete="off"
          spellcheck="false" autofocus />
        <span class="blinking-cursor">█</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick, onMounted } from 'vue'
import { parseCommand } from '@/utils/FakeCommandEngine.js'


const prompt = 'root@superHacker:~#'
const currentInput = ref('')
const history = ref([])
const historyIdx = ref(-1)
const terminalLines = reactive([]) // { prompt, content }
const emit = defineEmits(['terminal-event'])
const displayLines = computed(() => [...terminalLines])
const input = ref(null)
const terminalContainer = ref(null)

const props = defineProps({
  soundOn: {
    type: Boolean,
    default: true
  }
})

let typingSound = null
onMounted(() => {
  if (typeof window !== 'undefined') {
    typingSound = new window.Audio('/sounds/typing.wav')
  }
  nextTick(focusInput)
})

// Fokus ke input
function focusInput() {
  input.value && input.value.focus()
}

// Play typing sound
function playTypingSound() {
  if (props.soundOn && typingSound) {
    try {
      typingSound.currentTime = 0
      typingSound.play()
    } catch { }
  }
}

// Key handler (enter, up, down, typing)
function handleKey(e) {
  if (e.key === 'Enter') {
    handleEnter()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    prevHistory()
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    nextHistory()
  } else if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') {
    playTypingSound()
  }
}

// Submit command
async function handleEnter() {
  const inputVal = currentInput.value.trim()
  if (inputVal === '') return

  history.value.push(inputVal)
  historyIdx.value = history.value.length
  terminalLines.push({ prompt, content: inputVal })

  const { output, clear } = parseCommand(inputVal, history.value)
  if (clear) {
    terminalLines.splice(0, terminalLines.length)
  } else if (output) {
    // Simulasi animasi typing/output per baris
    const lines = output.split('\n')
    for (const line of lines) {
      await new Promise(r => setTimeout(r, 40 + Math.random() * 50)) // Delay typing
      terminalLines.push({ prompt: '', content: line })
      nextTick(scrollToBottom)
    }
    if (inputVal.toLowerCase() === 'sudo hacktheworld') {
      showInfo('World domination protocol activated! You are now the Super Killer Hacker.')
    }
  }
  currentInput.value = ''
  nextTick(scrollToBottom)
}

// History navigation
function prevHistory() {
  if (!history.value.length) return
  if (historyIdx.value > 0) historyIdx.value--
  currentInput.value = history.value[historyIdx.value] || ''
}
function nextHistory() {
  if (!history.value.length) return
  if (historyIdx.value < history.value.length - 1) historyIdx.value++
  else {
    historyIdx.value = history.value.length
    currentInput.value = ''
    return
  }
  currentInput.value = history.value[historyIdx.value] || ''
}

// Scroll to bottom
function scrollToBottom() {
  if (terminalContainer.value) {
    terminalContainer.value.scrollTop = terminalContainer.value.scrollHeight
  }
}

// Emit ke parent (modal/info)
function showInfo(message) {
  emit('terminal-event', 'modal', message)
}
</script>

<style scoped>
.terminal-window {
  background: #121212;
  color: #39ff14;
  font-family: 'Fira Mono', 'Consolas', monospace;
  padding: 24px;
  border-radius: 12px;
  min-height: 400px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 32px #39ff1422;
  outline: none;
}

.terminal-output {
  width: 100%;
}

.terminal-line {
  display: flex;
  line-height: 1.6;
  white-space: pre-wrap;
}

.prompt {
  color: #1aff65;
  margin-right: 8px;
  font-weight: bold;
}

.content {
  flex: 1;
}

.terminal-input-line {
  display: flex;
  align-items: center;
  margin-top: 2px;
}

.terminal-input {
  background: transparent;
  color: #39ff14;
  border: none;
  font: inherit;
  outline: none;
  width: 60vw;
  min-width: 30ch;
}

.blinking-cursor {
  margin-left: 2px;
  animation: blink 1s steps(1) infinite;
  color: #39ff14;
  user-select: none;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

::-webkit-scrollbar {
  width: 8px;
  background: #232323;
}

::-webkit-scrollbar-thumb {
  background: #1aff65;
  border-radius: 4px;
}
</style>

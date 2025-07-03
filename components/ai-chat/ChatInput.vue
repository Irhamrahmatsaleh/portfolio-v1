<template>
  <form class="chat-input-row" @submit.prevent="onSend">
    <textarea v-model="input" placeholder="Type your message..." rows="1" :disabled="disabled" ref="inputBox"
      @keydown.enter.exact.prevent="onSend" @keydown.enter.shift="null" @input="autoResize" @focus="autoResize" />

    <button type="submit" :disabled="disabled || !input.trim()">
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="none" />
        <path d="M7 12H17M17 12L14 9M17 12L14 15" stroke="white" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </button>
  </form>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  focusTrigger: {
    type: Number, default: 0
  }
})

watch(() => props.focusTrigger, () => {
  nextTick(() => {
    if (inputBox.value && !props.disabled) inputBox.value.focus()
  })
})

const input = ref('')
const emit = defineEmits(['send'])
const inputBox = ref(null)

const onSend = () => {
  const text = input.value.trim()
  if (!text || props.disabled) return
  emit('send', text)
  input.value = ''
  nextTick(() => {
    autoResize()
    setTimeout(() => {
      if (inputBox.value && !props.disabled) inputBox.value.focus()
    }, 50)
  })
}

// Auto resize textarea up to 6 rows (line-height 24px)
const autoResize = () => {
  if (inputBox.value) {
    // Reset height untuk mendapatkan scrollHeight yang akurat
    inputBox.value.style.height = 'auto'

    // Hitung tinggi berdasarkan content
    const scrollHeight = inputBox.value.scrollHeight
    const lineHeight = 24 // sesuaikan dengan line-height di CSS
    const minHeight = 44 // min-height dari CSS
    const maxHeight = 6 * lineHeight + 20 // 6 baris + padding

    // Set height yang tepat
    const newHeight = Math.max(minHeight, Math.min(scrollHeight, maxHeight))
    inputBox.value.style.height = newHeight + 'px'
  }
}

onMounted(() => {
  nextTick(() => {
    autoResize()
  })
})
</script>

<style scoped>
.chat-input-row {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border-radius: 13px;
  background: #232b2d;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 8px;
}

.chat-input-row textarea {
  flex: 1 1 auto;
  resize: none;
  border: none;
  border-radius: 12px;
  background: #232b3b;
  color: #fff;
  padding: 12px 16px;
  min-height: 44px;
  max-height: 164px;
  /* 6 baris * 24px line-height + padding */
  font-size: 1rem;
  line-height: 1.5;
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: background 0.2s, height 0.1s ease;
  font-family: inherit;
  box-sizing: border-box;
  overflow-y: auto;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.chat-input-row textarea:focus {
  background: #2d3850;
}

.chat-input-row textarea::placeholder {
  color: #9ca3af;
}

.chat-input-row button[type="submit"] {
  background: linear-gradient(135deg, #5b8cff 0%, #4061e0 100%);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.chat-input-row button[type="submit"]:hover:not(:disabled) {
  background: linear-gradient(135deg, #7ba5ff 0%, #3651d4 100%);
  transform: scale(1.05) rotate(-2deg);
  box-shadow: 0 6px 24px 0 rgba(64, 97, 224, 0.24), 0 2px 10px rgba(0, 0, 0, 0.12);
}

.chat-input-row button[type="submit"]:active:not(:disabled) {
  background: linear-gradient(135deg, #4061e0 0%, #5b8cff 100%);
  transform: scale(0.97);
  box-shadow: 0 2px 8px 0 rgba(64, 97, 224, 0.14);
}

.chat-input-row button[type="submit"]:disabled {
  background: #263278;
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.chat-input-row button[type="submit"] svg {
  width: 1.3em;
  height: 1.3em;
  display: block;
  filter: drop-shadow(0 1.5px 1.5px rgba(64, 97, 224, 0.07));
}

@media (max-width: 640px) {

  .ai-chat-input-bottom,
  .ai-chat-input-center {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 0 8px 12px 8px;
    width: 100%;
    box-sizing: border-box;
  }

  .ai-chat-input-bottom .chat-input-row,
  .ai-chat-input-center .chat-input-row {
    width: 100%;
    max-width: 100%;
    margin: 0;
    border-radius: 13px;
    box-sizing: border-box;
    padding: 8px;
  }
}
</style>

<template>
  <div :class="['bubble-root', role === 'user' ? 'bubble-user' : 'bubble-bot']">
    <span class="bubble-avatar">
      <span v-if="role === 'assistant'">🤖</span>
      <span v-else>🧑</span>
    </span>
    <span class="bubble-text" :class="{ 'bubble-typing': typing && role === 'assistant' }">
      <template v-if="role === 'assistant' && isMarkdown(finalContent) && !typing">
        <vue3-markdown-it :source="finalContent" />
      </template>
      <template v-else-if="typing && role === 'assistant'">
        <span v-html="formatTypingText(displayedText)"></span>
        <span v-if="showCursor" class="typing-cursor">|</span>
      </template>
      <template v-else>
        <pre v-if="isCodeBlock(finalContent)" class="code-block">{{ finalContent }}</pre>
        <span v-else v-html="formatText(finalContent)"></span>
      </template>
    </span>
    <span class="bubble-time">{{ props.time }}</span>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import Vue3MarkdownIt from 'vue3-markdown-it'

const props = defineProps({
  role: String,
  content: String,
  isIrham: Boolean,
  typing: Boolean,
  time: String
})

const displayedText = ref('')
const showCursor = ref(true)
let typingInterval = null
let cursorInterval = null

// Computed property untuk konten final
const finalContent = computed(() => {
  return props.typing && props.role === 'assistant' ? displayedText.value : props.content
})

// Watch untuk memulai/menghentikan typing
watch(
  () => props.typing,
  (isTyping) => {
    if (isTyping && props.role === 'assistant' && props.content) {
      startTyping(props.content)
    } else if (!isTyping) {
      stopTyping()
      displayedText.value = props.content
    }
  },
  { immediate: true }
)

// Watch untuk perubahan content saat typing
watch(
  () => props.content,
  (newContent) => {
    if (props.typing && props.role === 'assistant' && newContent) {
      startTyping(newContent)
    } else if (!props.typing) {
      displayedText.value = newContent
    }
  }
)

function startTyping(fullText) {
  if (!fullText) return

  stopTyping() // Clear any existing interval
  displayedText.value = ''
  showCursor.value = true

  let i = 0
  const textLength = fullText.length

  // Kecepatan typing yang sangat cepat dan profesional
  const baseSpeed = 12 // Milliseconds per character (super fast)
  const wordPause = 25 // Pause after space (natural)
  const sentencePause = 80 // Pause after sentence end

  typingInterval = setInterval(() => {
    if (i < textLength) {
      const currentChar = fullText[i]
      displayedText.value = fullText.slice(0, i + 1)

      // Determine next interval based on character
      let nextDelay = baseSpeed

      if (currentChar === ' ') {
        nextDelay = wordPause
      } else if (currentChar === '.' || currentChar === '!' || currentChar === '?') {
        nextDelay = sentencePause
      } else if (currentChar === ',' || currentChar === ';') {
        nextDelay = baseSpeed * 2
      }

      i++

      // Adjust speed for next character
      if (i < textLength) {
        clearInterval(typingInterval)
        typingInterval = setInterval(() => {
          // This will be replaced in next iteration
        }, nextDelay)

        // Restart with new timing
        setTimeout(() => {
          if (typingInterval) {
            clearInterval(typingInterval)
            startTypingFromPosition(fullText, i)
          }
        }, nextDelay)
        return
      }
    } else {
      // Typing finished
      stopTyping()
      showCursor.value = false
    }
  }, baseSpeed)
}

function startTypingFromPosition(fullText, startPos) {
  if (!fullText || startPos >= fullText.length) {
    stopTyping()
    return
  }

  let i = startPos
  const textLength = fullText.length
  const baseSpeed = 12

  typingInterval = setInterval(() => {
    if (i < textLength) {
      displayedText.value = fullText.slice(0, i + 1)
      i++
    } else {
      stopTyping()
      showCursor.value = false
    }
  }, baseSpeed)
}

function stopTyping() {
  if (typingInterval) {
    clearInterval(typingInterval)
    typingInterval = null
  }
}

// Fungsi untuk deteksi markdown yang lebih komprehensif
function isMarkdown(str) {
  if (!str) return false
  const text = str.trim()

  // Deteksi berbagai pola markdown
  const markdownPatterns = [
    /^```[\s\S]*```$/m,           // Code blocks
    /^#{1,6}\s/m,                 // Headers
    /\*\*.*\*\*/,                 // Bold
    /\*.*\*/,                     // Italic
    /^\* /m,                      // Unordered lists
    /^\d+\. /m,                   // Ordered lists
    /\[.*\]\(.*\)/,               // Links
    /^> /m,                       // Blockquotes
    /`.*`/                        // Inline code
  ]

  return markdownPatterns.some(pattern => pattern.test(text))
}

// Fungsi untuk deteksi code block
function isCodeBlock(str) {
  if (!str) return false
  return str.trim().startsWith('```') && str.trim().endsWith('```')
}

// Fungsi untuk format teks biasa dengan line breaks
function formatText(str) {
  if (!str) return ''
  return str.replace(/\n/g, '<br>')
}

// Fungsi khusus untuk format text saat typing (dengan syntax highlighting sederhana)
function formatTypingText(str) {
  if (!str) return ''

  let formatted = str.replace(/\n/g, '<br>')

  // Simple syntax highlighting for common patterns
  formatted = formatted.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>')

  return formatted
}

onMounted(() => {
  // Cursor blinking
  cursorInterval = setInterval(() => {
    if (props.typing && props.role === 'assistant') {
      showCursor.value = !showCursor.value
    }
  }, 530) // Slightly slower blink for better readability
})

onBeforeUnmount(() => {
  stopTyping()
  if (cursorInterval) {
    clearInterval(cursorInterval)
    cursorInterval = null
  }
})
</script>

<style scoped>
.bubble-root {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
  min-height: 40px;
  padding: 0 8px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bubble-user {
  flex-direction: row-reverse;
  justify-content: flex-end;
}

.bubble-bot {
  flex-direction: row;
  justify-content: flex-start;
}

.bubble-avatar {
  font-size: 1.5rem;
  opacity: 0.9;
  margin-top: 4px;
  flex-shrink: 0;
}

.bubble-text {
  background: #1e2532;
  color: #e2e8f0;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 14px 18px;
  border-radius: 16px;
  max-width: 75vw;
  word-wrap: break-word;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: all 0.2s ease;
  line-height: 1.5;
}

.bubble-user .bubble-text {
  background: linear-gradient(135deg, #4061e0 0%, #5b73e8 100%);
  color: #ffffff;
  border-bottom-right-radius: 6px;
}

.bubble-bot .bubble-text {
  background: linear-gradient(135deg, #1e2532 0%, #252d3a 100%);
  color: #e2e8f0;
  border-bottom-left-radius: 6px;
}

.bubble-typing {
  background: linear-gradient(135deg, #1a2332 0%, #212938 100%) !important;
  box-shadow: 0 2px 12px rgba(64, 97, 224, 0.15);
  border: 1px solid rgba(64, 97, 224, 0.2);
}

/* Styling untuk markdown content */
.bubble-text :deep(h1),
.bubble-text :deep(h2),
.bubble-text :deep(h3),
.bubble-text :deep(h4),
.bubble-text :deep(h5),
.bubble-text :deep(h6) {
  margin: 0.8em 0 0.4em 0;
  color: #60a5fa;
  font-weight: 600;
}

.bubble-text :deep(h1) {
  font-size: 1.4em;
}

.bubble-text :deep(h2) {
  font-size: 1.3em;
}

.bubble-text :deep(h3) {
  font-size: 1.2em;
}

.bubble-text :deep(p) {
  margin: 0.6em 0;
  line-height: 1.6;
}

.bubble-text :deep(pre) {
  background: #0f1419;
  padding: 14px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 10px 0;
  font-family: 'Fira Code', 'JetBrains Mono', Consolas, monospace;
  font-size: 0.9em;
  border: 1px solid #2d3748;
}

.bubble-text :deep(code) {
  background: #2d3748;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', 'JetBrains Mono', Consolas, monospace;
  font-size: 0.9em;
  color: #7dd3fc;
}

.bubble-text :deep(pre code) {
  background: transparent;
  padding: 0;
  color: #e2e8f0;
}

.bubble-text :deep(ul),
.bubble-text :deep(ol) {
  margin: 0.6em 0;
  padding-left: 1.4em;
}

.bubble-text :deep(li) {
  margin: 0.3em 0;
}

.bubble-text :deep(strong) {
  color: #60a5fa;
  font-weight: 600;
}

.bubble-text :deep(em) {
  color: #c084fc;
  font-style: italic;
}

.bubble-text :deep(blockquote) {
  border-left: 3px solid #60a5fa;
  padding-left: 12px;
  margin: 10px 0;
  font-style: italic;
  opacity: 0.9;
  background: rgba(96, 165, 250, 0.05);
  border-radius: 0 4px 4px 0;
  padding: 8px 0 8px 12px;
}

.bubble-text :deep(a) {
  color: #60a5fa;
  text-decoration: none;
  border-bottom: 1px solid rgba(96, 165, 250, 0.3);
  transition: all 0.2s ease;
}

.bubble-text :deep(a:hover) {
  color: #93c5fd;
  border-bottom-color: #93c5fd;
}

/* Inline code styling untuk typing */
.inline-code {
  background: #2d3748;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', 'JetBrains Mono', Consolas, monospace;
  font-size: 0.9em;
  color: #7dd3fc;
}

/* Code block standalone */
.code-block {
  background: #0f1419;
  padding: 14px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 10px 0;
  font-family: 'Fira Code', 'JetBrains Mono', Consolas, monospace;
  font-size: 0.9em;
  border: 1px solid #2d3748;
  color: #e2e8f0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Typing cursor animation */
.typing-cursor {
  display: inline-block;
  color: #60a5fa;
  font-weight: bold;
  animation: blink 1.2s infinite;
  margin-left: 1px;
}

@keyframes blink {

  0%,
  50% {
    opacity: 1;
  }

  51%,
  100% {
    opacity: 0;
  }
}

/* Enhanced table styling */
.bubble-text :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  overflow: hidden;
}

.bubble-text :deep(th),
.bubble-text :deep(td) {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #2d3748;
}

.bubble-text :deep(th) {
  background: #2d3748;
  color: #60a5fa;
  font-weight: 600;
}

.bubble-text :deep(tr:last-child td) {
  border-bottom: none;
}

.bubble-text :deep(tr:hover) {
  background: rgba(96, 165, 250, 0.05);
}

/* Horizontal rule styling */
.bubble-text :deep(hr) {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent, #60a5fa, transparent);
  margin: 16px 0;
}

/* Image styling */
.bubble-text :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 8px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Enhanced list styling */
.bubble-text :deep(ul li) {
  position: relative;
  list-style: none;
}

.bubble-text :deep(ul li::before) {
  content: "•";
  color: #60a5fa;
  font-weight: bold;
  position: absolute;
  left: -1em;
}

.bubble-text :deep(ol li) {
  color: #e2e8f0;
}

.bubble-text :deep(ol li::marker) {
  color: #60a5fa;
  font-weight: 600;
}

/* Task list styling */
.bubble-text :deep(input[type="checkbox"]) {
  margin-right: 8px;
  accent-color: #60a5fa;
}

/* Selection styling */
.bubble-text ::selection {
  background: rgba(96, 165, 250, 0.3);
  color: #ffffff;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .bubble-text {
    max-width: 85vw;
    font-size: 0.95rem;
    padding: 12px 16px;
  }

  .bubble-text :deep(pre) {
    font-size: 0.85em;
    padding: 12px;
  }

  .bubble-text :deep(code) {
    font-size: 0.85em;
  }

  .bubble-avatar {
    font-size: 1.3rem;
  }
}

.bubble-time {
  font-size: 0.75em;
  color: #a0aec0;
  align-self: flex-end;
  margin-left: 8px;
  margin-top: 4px;
  min-width: 48px;
}

@media (max-width: 480px) {
  .bubble-text {
    max-width: 90vw;
    font-size: 0.9rem;
    padding: 10px 14px;
  }

  .bubble-text :deep(h1) {
    font-size: 1.3em;
  }

  .bubble-text :deep(h2) {
    font-size: 1.2em;
  }

  .bubble-text :deep(h3) {
    font-size: 1.1em;
  }

  .bubble-root {
    gap: 8px;
    margin-bottom: 16px;
    padding: 0 4px;
  }
}

/* Scrollbar untuk code blocks */
.bubble-text :deep(pre)::-webkit-scrollbar {
  height: 6px;
}

.bubble-text :deep(pre)::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 3px;
}

.bubble-text :deep(pre)::-webkit-scrollbar-thumb {
  background: #4a5568;
  border-radius: 3px;
}

.bubble-text :deep(pre)::-webkit-scrollbar-thumb:hover {
  background: #5a6578;
}

/* Loading shimmer effect untuk typing */
.bubble-typing::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(96, 165, 250, 0.1),
      transparent);
  animation: shimmer 2s infinite;
  pointer-events: none;
  border-radius: inherit;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}

/* Focus styles untuk accessibility */
.bubble-text :deep(*:focus) {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Print styles */
@media print {
  .bubble-root {
    break-inside: avoid;
    margin-bottom: 10px;
  }

  .bubble-text {
    background: white !important;
    color: black !important;
    box-shadow: none !important;
    border: 1px solid #ccc !important;
  }

  .typing-cursor {
    display: none;
  }
}
</style>

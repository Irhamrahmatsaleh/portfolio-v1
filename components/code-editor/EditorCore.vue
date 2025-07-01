<template>
  <div class="editor-core" ref="editorContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

// Props super lengkap
const props = defineProps<{
  modelValue: string,
  language: string,
  theme: string
}>()

const emit = defineEmits(['update:modelValue'])

const editorContainer = ref<HTMLElement | null>(null)
let editor: any = null
let monaco: any = null
let updatingFromParent = false

// Inisialisasi editor (powerful, siap receive focus, resize, dsb)
onMounted(async () => {
  monaco = await import('monaco-editor')
  if (editorContainer.value) {
    editor = monaco.editor.create(editorContainer.value, {
      value: props.modelValue,
      language: props.language,
      theme: props.theme === 'dark' ? 'vs-dark' : 'vs-light',
      automaticLayout: true,
      fontSize: 15,
      fontFamily: `'JetBrains Mono', 'Fira Mono', 'Menlo', 'Monaco', 'Consolas', monospace`,
      lineNumbers: "on",
      minimap: { enabled: true },
      wordWrap: 'on',
      scrollBeyondLastLine: false,
      smoothScrolling: true,
      tabSize: 2,
      renderWhitespace: 'boundary',
      cursorSmoothCaretAnimation: 'on',
      scrollbar: {
        vertical: 'visible',
        horizontal: 'visible',
        useShadows: false
      }
    })
    editor.onDidChangeModelContent(() => {
      if (!updatingFromParent) {
        emit('update:modelValue', editor.getValue())
      }
    })
    // Auto focus
    setTimeout(() => editor.focus(), 150)
  }
})

// Sinkronisasi dari parent ke editor
watch(
  () => props.modelValue,
  (val) => {
    if (editor && editor.getValue() !== val) {
      updatingFromParent = true
      editor.setValue(val)
      updatingFromParent = false
    }
  }
)

// Sinkronisasi bahasa
watch(
  () => props.language,
  (lang) => {
    if (editor && monaco) {
      monaco.editor.setModelLanguage(editor.getModel(), lang)
    }
  }
)

// Sinkronisasi tema
watch(
  () => props.theme,
  (theme) => {
    if (editor && monaco) {
      monaco.editor.setTheme(theme === 'dark' ? 'vs-dark' : 'vs-light')
    }
  }
)

// Bersihkan editor saat unmount
onBeforeUnmount(() => {
  if (editor) {
    editor.dispose()
  }
})
</script>

<style scoped>
.editor-core {
  width: 100%;
  height: 100%;
  min-height: 400px;
  background: #181a1b;
  border-radius: 7px;
  overflow: hidden;
  box-shadow: 0 2px 10px #00000018;
  border: 1.5px solid #1a263e;
  /* VS Code like padding */
  padding: 2px 0 0 2px;
  /* Responsive */
  resize: vertical;
}
</style>

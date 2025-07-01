<template>
  <div class="editor-core" ref="editorContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

// Props yang wajib
const props = defineProps<{
  modelValue: string,
  language: string,
  theme: string
}>()

// Emit update:modelValue
const emit = defineEmits(['update:modelValue'])

const editorContainer = ref<HTMLElement | null>(null)
let editor: any = null
let monaco: any = null
let updatingFromParent = false

onMounted(async () => {
  monaco = await import('monaco-editor')
  if (editorContainer.value) {
    editor = monaco.editor.create(editorContainer.value, {
      value: props.modelValue,
      language: props.language,
      theme: props.theme === 'dark' ? 'vs-dark' : 'vs-light',
      automaticLayout: true,
      fontSize: 16,
      lineNumbers: "on",
      minimap: { enabled: true }
    })
    editor.onDidChangeModelContent(() => {
      if (!updatingFromParent) {
        emit('update:modelValue', editor.getValue())
      }
    })
  }
})

// Watch modelValue dari parent, update hanya jika beda
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

// Watch bahasa
watch(
  () => props.language,
  (lang) => {
    if (editor && monaco) {
      monaco.editor.setModelLanguage(editor.getModel(), lang)
    }
  }
)

// Watch theme
watch(
  () => props.theme,
  (theme) => {
    if (editor && monaco) {
      monaco.editor.setTheme(theme === 'dark' ? 'vs-dark' : 'vs-light')
    }
  }
)

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
  border-radius: 6px;
  overflow: hidden;
}
</style>

<template>
  <div class="secret-editor-wrapper">
    <EditorFileTree :files="files" :activeFile="activeFile" @selectFile="selectFile" @addFile="addFile"
      @removeFile="removeFile" @renameFile="renameFile" />

    <div class="editor-main">
      <EditorTabs :files="files" :activeFile="activeFile" @selectTab="selectTab" @closeTab="closeTab"
        @addTab="addTab" />
      <EditorCore v-model="code" :language="language" :theme="theme" class="editor-super-killer" />
      <div class="editor-bar">
        <div class="editor-actions">
          <button class="editor-action" @click="switchLanguage">Switch Language</button>
          <button class="editor-action" @click="switchTheme">Switch Theme</button>
          <button class="editor-action" @click="resetCode">Reset</button>
        </div>
      </div>
      <div class="editor-footer-meta">
        <span>Language: <b>{{ language }}</b></span>
        <span style="margin-left:12px;">Theme: <b>{{ theme }}</b></span>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import EditorCore from '~/components/code-editor/EditorCore.vue'
import EditorTabs from '~/components/code-editor/EditorTabs.vue'
import EditorFileTree from '~/components/code-editor/EditorFileTree.vue'

const STORAGE_KEY = 'super-killer-files'

const files = ref([
  {
    name: 'main.js',
    content: `function helloWorld() {\n  console.log('🔥 Welcome to the next-level editor!');\n}\nhelloWorld();`
  },
  {
    name: 'main.ts',
    content: `function helloWorld(): void {\n  console.log('🔥 Welcome to the next-level editor (TS)!');\n}\nhelloWorld();`
  }
])
const activeFile = ref('main.js')
const language = ref('javascript')
const theme = ref('dark')
const code = ref(getFileContent(activeFile.value))

function getFileContent(name: string) {
  const file = files.value.find(f => f.name === name)
  return file ? file.content : ''
}

function selectFile(name: string) {
  activeFile.value = name
  code.value = getFileContent(name)
  language.value = name.endsWith('.ts') ? 'typescript' : 'javascript'
}

function updateCode(newCode: string) {
  code.value = newCode
  const file = files.value.find(f => f.name === activeFile.value)
  if (file) file.content = newCode
}

function switchLanguage() {
  language.value = language.value === 'javascript' ? 'typescript' : 'javascript'
  activeFile.value = language.value === 'typescript' ? 'main.ts' : 'main.js'
  code.value = getFileContent(activeFile.value)
}

function switchTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

function resetCode() {
  const file = files.value.find(f => f.name === activeFile.value)
  if (file) {
    const resetVal = getDefaultCode(language.value)
    file.content = resetVal
    code.value = resetVal
  }
}

function getDefaultCode(lang: string) {
  return lang === 'typescript'
    ? `function helloWorld(): void {\n  console.log('🔥 Welcome to the next-level editor (TS)!');\n}\nhelloWorld();`
    : `function helloWorld() {\n  console.log('🔥 Welcome to the next-level editor!');\n}\nhelloWorld();`
}

function addFile() {
  let i = 1
  let newName = `untitled${i}.js`
  while (files.value.some(f => f.name === newName)) {
    i++
    newName = `untitled${i}.js`
  }
  files.value.push({
    name: newName,
    content: `// New file\n`
  })
  selectFile(newName)
  saveFilesToStorage()
}
function renameFile({ oldName, newName }: { oldName: string, newName: string }) {
  if (!newName || files.value.some(f => f.name === newName)) return
  const file = files.value.find(f => f.name === oldName)
  if (file) file.name = newName
  if (activeFile.value === oldName) activeFile.value = newName
  saveFilesToStorage()
}

function removeFile(name: string) {
  if (files.value.length <= 1) return
  const idx = files.value.findIndex(f => f.name === name)
  files.value.splice(idx, 1)
  if (activeFile.value === name) {
    const next = files.value[Math.max(0, idx - 1)]
    selectFile(next.name)
  }
  saveFilesToStorage()
}

function saveFilesToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(files.value))
}

function loadFilesFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY)
  if (data) {
    try {
      const arr = JSON.parse(data)
      if (Array.isArray(arr) && arr.length > 0) {
        files.value = arr
        activeFile.value = arr[0].name
        code.value = arr[0].content
        language.value = arr[0].name.endsWith('.ts') ? 'typescript' : 'javascript'
      }
    } catch { }
  }
}

onMounted(() => {
  loadFilesFromStorage()
})

watch(files, saveFilesToStorage, { deep: true })

// Untuk EditorTabs event
function selectTab(name: string) {
  selectFile(name)
}
</script>


<style scoped>
.secret-editor-wrapper {
  display: flex;
  flex-direction: row;
  height: 100vh;
  background: #11131a;
  gap: 0;
  position: relative;
  padding: 0;
}

.editor-main {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  min-width: 0;
  position: relative;
}

.editor-super-killer {
  flex: 1 1 0;
  min-height: 0;
  min-width: 0;
  font-size: 12px !important;
  line-height: 1.35;
}

.editor-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 2px;
  user-select: none;
}

.editor-actions {
  display: flex;
  gap: 6px;
}

.editor-action {
  background: none;
  border: none;
  color: #8dc6ff;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: 4px;
  transition: background 0.12s, color 0.12s;
  cursor: pointer;
  letter-spacing: 0.03em;
  outline: none;
}

.editor-action:hover {
  background: #223e5a;
  color: #fff;
}

.editor-footer-meta {
  position: absolute;
  left: 14px;
  bottom: 10px;
  color: #6db2f7;
  font-size: 10px;
  opacity: 0.77;
  z-index: 8;
  user-select: none;
  letter-spacing: 0.04em;
  pointer-events: none;
}

.editor-footer-meta b {
  color: #fff;
  font-weight: 700;
  font-size: 10px;
}

:deep(.monaco-editor, .CodeMirror, textarea, pre) {
  font-size: 12px !important;
  line-height: 1.35 !important;
}

@media (max-width: 600px) {
  .secret-editor-wrapper {
    padding: 2px;
  }

  .editor-action,
  .editor-footer-meta,
  .editor-footer-meta b {
    font-size: 8px;
  }

  .editor-super-killer {
    font-size: 10px !important;
  }
}
</style>

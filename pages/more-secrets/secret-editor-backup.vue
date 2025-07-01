<template>
  <div class="secret-editor-wrapper">
    <EditorFileTree :files="files" :activeFile="activeFile" @selectFile="selectFile" @addFile="addFile"
      @addFolder="addFolder" @removeFile="removeFile" @renameFile="renameFile" @renameFolder="renameFolder"
      @moveNode="moveNode" />
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
import { ref, onMounted, watch, computed } from 'vue'
import EditorCore from '~/components/code-editor/EditorCore.vue'
import EditorTabs from '~/components/code-editor/EditorTabs.vue'
import EditorFileTree from '~/components/code-editor/EditorFileTree.vue'

interface FileOrFolder {
  name: string
  type: 'file' | 'folder'
  content?: string
  children?: FileOrFolder[]
}

const STORAGE_KEY = 'super-killer-files'

const defaultFiles: FileOrFolder[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'main.js',
        type: 'file',
        content: `function helloWorld() {\n  console.log('🔥 Welcome to the next-level editor!');\n}\nhelloWorld();`
      },
      {
        name: 'main.ts',
        type: 'file',
        content: `function helloWorld(): void {\n  console.log('🔥 Welcome to the next-level editor (TS)!');\n}\nhelloWorld();`
      }
    ]
  }
]

const files = ref<FileOrFolder[]>([])
const activeFile = ref('main.js')
const language = ref('javascript')
const theme = ref('dark')
const code = ref('')

// Helper: folder root
function getRootFolder(): FileOrFolder {
  if (!files.value.length || files.value[0].type !== 'folder') {
    files.value = JSON.parse(JSON.stringify(defaultFiles))
  }
  return files.value[0]
}

// Recursive cari file/folder by name
function findNode(nodes: FileOrFolder[], name: string): FileOrFolder | null {
  for (const node of nodes) {
    if (node.name === name) return node
    if (node.type === 'folder' && node.children) {
      const found = findNode(node.children, name)
      if (found) return found
    }
  }
  return null
}

// Flatten file untuk Tabs (hanya file, no folder)
function flattenFiles(nodes: FileOrFolder[]): FileOrFolder[] {
  let result: FileOrFolder[] = []
  for (const node of nodes) {
    if (node.type === 'file') result.push(node)
    if (node.type === 'folder' && node.children) {
      result = result.concat(flattenFiles(node.children))
    }
  }
  return result
}
const flatFiles = computed(() => flattenFiles(getRootFolder().children || []))

// Ambil isi file aktif
function getFileContent(name: string) {
  const file = findNode(getRootFolder().children || [], name)
  return file && file.type === 'file' ? file.content || '' : ''
}

// Inisialisasi dari localStorage/default
function loadFilesFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY)
  if (data) {
    try {
      const arr = JSON.parse(data)
      // PATCH: Hanya izinkan satu root folder "src"
      if (
        Array.isArray(arr) &&
        arr.length === 1 &&
        arr[0].type === 'folder' &&
        arr[0].name === 'src'
      ) {
        files.value = arr
      } else {
        // Reset ke defaultFiles jika struktur tidak benar
        files.value = JSON.parse(JSON.stringify(defaultFiles))
      }
    } catch {
      files.value = JSON.parse(JSON.stringify(defaultFiles))
    }
  } else {
    files.value = JSON.parse(JSON.stringify(defaultFiles))
  }
  // Set file aktif & kode
  const first = findFirstFile(files.value[0].children || [])
  if (first) {
    activeFile.value = first.name
    code.value = first.content || ''
    language.value = first.name.endsWith('.ts') ? 'typescript' : 'javascript'
  }
}


// Save ke storage
function saveFilesToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(files.value))
}

onMounted(() => {
  loadFilesFromStorage()
})

watch(files, saveFilesToStorage, { deep: true })

// CRUD FILE/FOLDER
function getSrcChildren(): FileOrFolder[] {
  return files.value[0].children || []
}

function selectFile(name: string) {
  activeFile.value = name
  const file = findNode(getSrcChildren(), name)
  code.value = file && file.type === 'file' ? file.content || '' : ''
  language.value = name.endsWith('.ts') ? 'typescript' : 'javascript'
}
function updateCode(newCode: string) {
  code.value = newCode
  const file = findNode(getSrcChildren(), activeFile.value)
  if (file && file.type === 'file') file.content = newCode
}
function addFile(parent: FileOrFolder | null = null) {
  let i = 1
  let newName = `untitled${i}.js`
  while (findNode(getSrcChildren(), newName)) {
    i++
    newName = `untitled${i}.js`
  }
  const newFile: FileOrFolder = { name: newName, type: 'file', content: '// New file\n' }
  const target = parent && parent.type === 'folder' ? parent : files.value[0]
  target.children = target.children || []
  target.children.push(newFile)
  selectFile(newName)
  saveFilesToStorage()
}
function addFolder(parent: FileOrFolder | null = null) {
  let i = 1
  let newName = `untitled-folder${i}`
  function folderExist(nodes: FileOrFolder[], name: string): boolean {
    for (const node of nodes) {
      if (node.type === 'folder' && node.name === name) return true
      if (node.type === 'folder' && node.children && folderExist(node.children, name)) return true
    }
    return false
  }
  while (folderExist(getSrcChildren(), newName)) {
    i++
    newName = `untitled-folder${i}`
  }
  const newFolder: FileOrFolder = { name: newName, type: 'folder', children: [] }
  const target = parent && parent.type === 'folder' ? parent : files.value[0]
  target.children = target.children || []
  target.children.push(newFolder)
  saveFilesToStorage()
}
function renameFile({ node, newName }: { node: FileOrFolder, newName: string }) {
  if (!newName || findNode(getSrcChildren(), newName)) return
  node.name = newName
  if (activeFile.value === node.name) activeFile.value = newName
  saveFilesToStorage()
}
function renameFolder(payload: { node: FileOrFolder, newName: string }) {
  renameFile(payload)
}
function removeFile(node: FileOrFolder) {
  function removeNode(nodes: FileOrFolder[], target: FileOrFolder): boolean {
    const idx = nodes.indexOf(target)
    if (idx !== -1) {
      nodes.splice(idx, 1)
      return true
    }
    for (const n of nodes) {
      if (n.type === 'folder' && n.children && removeNode(n.children, target)) return true
    }
    return false
  }
  removeNode(getSrcChildren(), node)
  if (activeFile.value === node.name) {
    const first = findFirstFile(getSrcChildren())
    if (first) selectFile(first.name)
  }
  saveFilesToStorage()
}
function findFirstFile(nodes: FileOrFolder[]): FileOrFolder | null {
  for (const node of nodes) {
    if (node.type === 'file') return node
    if (node.type === 'folder' && node.children) {
      const found = findFirstFile(node.children)
      if (found) return found
    }
  }
  return null
}

// Tabs (hanya file, bukan folder)
function addTab() {
  addFile()
}
function selectTab(name: string) {
  selectFile(name)
}
function closeTab(name: string) {
  const node = findNode(getSrcChildren(), name)
  if (node) removeFile(node)
}

// Theme/language/reset
function switchLanguage() {
  language.value = language.value === 'javascript' ? 'typescript' : 'javascript'
  const newFile = language.value === 'typescript' ? 'main.ts' : 'main.js'
  selectFile(newFile)
}
function switchTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
function resetCode() {
  const file = findNode(getSrcChildren(), activeFile.value)
  if (file && file.type === 'file') {
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

// Drag/drop moveNode (optional)
function moveNode(payload: { from: FileOrFolder, to: FileOrFolder | null }) {
  // Implement drag&drop jika perlu
}
</script>







<style scoped>
.secret-editor-wrapper {
  display: flex;
  flex-direction: row;
  height: 100vh;
  min-height: 0;
  background: #11131a;
  gap: 0;
  position: relative;
  padding: 0;
  border-radius: 8px;
  box-shadow: 0 4px 24px #000c1a22;
  overflow: hidden;
}

.editor-main {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: 100vh;
  position: relative;
  background: #1a1d24;
  border-radius: 0 8px 8px 0;
  overflow: hidden;
}

.editor-super-killer {
  flex: 1 1 0;
  min-height: 0;
  min-width: 0;
  height: 100%;
  font-size: 13px !important;
  line-height: 1.5;
  background: #181a1b;
  border-radius: 6px;
  box-shadow: 0 2px 10px #00000018;
  margin-top: 1.5px;
  border: 1.5px solid #1a263e;
}

.editor-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 2px;
  user-select: none;
  background: #181e2a;
  border-top: 1px solid #151b2a;
  padding: 2px 8px;
}

.editor-actions {
  display: flex;
  gap: 8px;
}

.editor-action {
  background: none;
  border: none;
  color: #8dc6ff;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 10px;
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
  left: 18px;
  bottom: 11px;
  color: #6db2f7;
  font-size: 11px;
  opacity: 0.79;
  z-index: 8;
  user-select: none;
  letter-spacing: 0.04em;
  pointer-events: none;
}

.editor-footer-meta b {
  color: #fff;
  font-weight: 700;
  font-size: 11px;
}

:deep(.monaco-editor, .CodeMirror, textarea, pre) {
  font-size: 13px !important;
  line-height: 1.47 !important;
}

@media (max-width: 900px) {
  .secret-editor-wrapper {
    flex-direction: column;
    height: 100dvh;
    border-radius: 0;
    box-shadow: none;
  }

  .editor-main {
    border-radius: 0 0 8px 8px;
  }
}

@media (max-width: 600px) {
  .secret-editor-wrapper {
    padding: 0;
  }

  .editor-action,
  .editor-footer-meta,
  .editor-footer-meta b {
    font-size: 9px;
  }

  .editor-super-killer {
    font-size: 11px !important;
  }
}
</style>

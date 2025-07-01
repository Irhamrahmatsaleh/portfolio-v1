<template>
  <div class="editor-file-tree-wrapper" :class="{ collapsed }">
    <button class="sidebar-toggle" @click="collapsed = !collapsed">
      <span v-if="collapsed">›</span>
      <span v-else>‹</span>
    </button>
    <div class="editor-file-tree" v-if="!collapsed">
      <FileTreeNode v-for="item in files" :key="item.name" :node="item" :activeFile="activeFile"
        @selectFile="selectFile" @addFile="addFile" @addFolder="addFolder" @removeFile="removeFile"
        @renameFile="renameFile" @renameFolder="renameFolder" @moveNode="moveNode" />
      <div class="tree-actions">
        <button class="file-add" @click="addFile(null)">＋ File</button>
        <button class="file-add" @click="addFolder(null)">＋ Folder</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FileTreeNode from './FileTreeNode.vue'

interface FileOrFolder {
  name: string
  type: 'file' | 'folder'
  content?: string
  children?: FileOrFolder[]
}

const props = defineProps<{
  files: Array<FileOrFolder>,
  activeFile: string
}>()

const emit = defineEmits([
  'selectFile',
  'addFile',
  'addFolder',
  'removeFile',
  'renameFile',
  'renameFolder',
  'moveNode'
])

const collapsed = ref(false)

function selectFile(name: string) {
  emit('selectFile', name)
}
function addFile(parent: FileOrFolder | null) {
  emit('addFile', parent)
}
function addFolder(parent: FileOrFolder | null) {
  emit('addFolder', parent)
}
function removeFile(node: FileOrFolder) {
  emit('removeFile', node)
}
function renameFile(payload: { node: FileOrFolder, newName: string }) {
  emit('renameFile', payload)
}
function renameFolder(payload: { node: FileOrFolder, newName: string }) {
  emit('renameFolder', payload)
}
function moveNode(payload: { from: FileOrFolder, to: FileOrFolder | null }) {
  emit('moveNode', payload)
}
</script>

<style scoped>
.editor-file-tree-wrapper {
  display: flex;
  flex-direction: column;
  width: 210px;
  min-width: 160px;
  max-width: 240px;
  background: #182235;
  border-right: 2px solid #162140;
  box-shadow: 2px 0 12px #000b1a12;
  z-index: 2;
  height: 100vh;
  overflow: hidden;
}

.editor-file-tree {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1 1 0;
  width: 100%;
  min-width: 0;
  overflow-y: auto;
  padding: 6px 0 8px 0;
}

.editor-file-tree-wrapper.collapsed {
  width: 34px;
  min-width: 34px;
}

.sidebar-toggle {
  background: none;
  border: none;
  color: #8dc6ff;
  font-size: 18px;
  cursor: pointer;
  margin: 7px 2px 5px 2px;
  align-self: flex-end;
  outline: none;
  width: 22px;
  height: 22px;
  border-radius: 12px;
  transition: background 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-toggle:hover {
  background: #334b6b;
}


.tree-actions {
  display: flex;
  gap: 8px;
  padding: 7px 10px 3px 10px;
  justify-content: flex-end;
}

.file-add {
  background: #253a5a;
  border: none;
  color: #8dc6ff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  padding: 3px 12px;
  cursor: pointer;
  transition: background 0.14s;
  letter-spacing: 0.03em;
}

.file-add:hover {
  background: #334b6b;
  color: #fff;
}
</style>

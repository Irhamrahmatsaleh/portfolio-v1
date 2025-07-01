<template>
  <div class="editor-file-tree-wrapper" :class="{ collapsed: collapsed }">
    <button class="sidebar-toggle" @click="collapsed = !collapsed">
      <span v-if="collapsed">›</span>
      <span v-else>‹</span>
    </button>
    <div class="editor-file-tree" v-if="!collapsed">
      <div v-for="file in files" :key="file.name" :class="['file-item', { active: file.name === activeFile }]"
        @click="selectFile(file.name)">
        <span class="file-icon">📄</span>
        <span v-if="renaming !== file.name" class="file-name" @dblclick="startRenaming(file.name)">
          {{ file.name }}
        </span>
        <input v-else class="file-rename-input" v-model="renameValue" @keyup.enter="confirmRename(file.name)"
          @blur="confirmRename(file.name)" @keyup.esc="cancelRename" autofocus />
        <span class="file-delete" @click.stop="removeFile(file.name)" title="Delete">×</span>
      </div>
      <button class="file-add" @click="addFile">＋ Add File</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  files: Array<{ name: string }>,
  activeFile: string
}>()
const emit = defineEmits(['selectFile', 'addFile', 'removeFile', 'renameFile'])
const collapsed = ref(false)
const renaming = ref<string | null>(null)
const renameValue = ref('')

function selectFile(name: string) {
  emit('selectFile', name)
}

function addFile() {
  emit('addFile')
}
function removeFile(name: string) {
  emit('removeFile', name)
}

function startRenaming(name: string) {
  renaming.value = name
  renameValue.value = name
}
function confirmRename(oldName: string) {
  if (!renameValue.value.trim() || renameValue.value === oldName) {
    renaming.value = null
    return
  }
  emit('renameFile', { oldName, newName: renameValue.value.trim() })
  renaming.value = null
}
function cancelRename() {
  renaming.value = null
}
</script>

<style scoped>
.editor-file-tree-wrapper {
  display: flex;
  flex-direction: column;
  width: 180px;
  min-width: 48px;
  background: #222d3a;
  position: relative;
  transition: width 0.2s;
}

.editor-file-tree-wrapper.collapsed {
  width: 32px;
  min-width: 32px;
}

.sidebar-toggle {
  background: none;
  border: none;
  color: #8dc6ff;
  font-size: 18px;
  cursor: pointer;
  margin: 8px 2px 8px 2px;
  align-self: flex-end;
  outline: none;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  transition: background 0.15s;
}

.sidebar-toggle:hover {
  background: #334b6b;
}

.editor-file-tree {
  flex: 1;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.file-item {
  padding: 4px 8px 4px 18px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 7px;
  justify-content: space-between;
  background: linear-gradient(90deg, #1e2a3a, #283c5e 100%);
  color: #a4e1fa;
  transition: background 0.16s, color 0.13s, box-shadow 0.12s;
  margin: 2px 5px;
}

.file-item.active {
  background: linear-gradient(90deg, #3752a6 65%, #34d9ff 100%);
  color: #fff;
  font-weight: 0 0 7px #34d9ff55;
}

.file-item:hover:not(.active) {
  background: linear-gradient(90deg, #24446c 65%, #39c3ef 100%);
  color: #fff;
}

.file-icon {
  font-size: 13px;
}

.file-delete {
  color: #ff6464;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 6px;
  border-radius: 3px;
  padding: 0 4px;
  transition: background 0.13s;
}

.file-delete:hover {
  background: #242d3a;
}

.file-add {
  background: #192b45;
  border: none;
  color: #8dc6ff;
  font-size: 12px;
  font-weight: 600;
  margin: 8px 10px 0 10px;
  border-radius: 4px;
  padding: 4px 0;
  cursor: pointer;
  transition: background 0.14s;
}

.file-add:hover {
  background: #334b6b;
}

.file-rename-input {
  background: #10395e;
  color: #fff;
  border: 1px solid #44e1ff;
  border-radius: 4px;
  font-size: 13px;
  padding: 2px 7px;
  outline: none;
  width: 110px;
}
</style>

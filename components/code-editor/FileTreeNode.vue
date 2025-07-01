<template>
  <div :class="['file-item', { active: isActive, folder: node.type === 'folder' }]"
    @click="node.type === 'file' && !renaming ? handleSelectFile() : null">
    <!-- FILE NODE -->
    <template v-if="node.type === 'file'">
      <span class="file-icon">📄</span>
      <span class="file-name" :title="node.name">
        <template v-if="!renaming">{{ node.name }}</template>
        <input v-else class="rename-input" v-model="renameValue" @keyup.enter="confirmRename" @keyup.esc="cancelRename"
          @blur="confirmRename" autofocus />
      </span>
      <span class="file-actions" v-if="!renaming">
        <span class="file-action rename" @click.stop="startRenaming" title="Rename">✎</span>
        <span class="file-action delete" @click.stop="handleRemove" title="Delete">×</span>
      </span>
    </template>
    <!-- FOLDER NODE -->
    <template v-else>
      <span class="file-icon">📁</span>
      <span class="file-name" :title="node.name">
        <template v-if="!renaming">{{ node.name }}</template>
        <input v-else class="rename-input" v-model="renameValue" @keyup.enter="confirmRename" @keyup.esc="cancelRename"
          @blur="confirmRename" autofocus />
      </span>
      <span class="file-actions" v-if="!renaming">
        <span class="file-action add-file" @click.stop="handleAddFile" title="Add File"></span>
        <span class="file-action add-folder" @click.stop="handleAddFolder" title="Add Folder"></span>
        <span class="file-action rename" @click.stop="startRenaming" title="Rename">✎</span>
        <span class="file-action delete" @click.stop="handleRemove" title="Delete">×</span>
      </span>
    </template>
  </div>
  <!-- RECURSIVE CHILDREN -->
  <div v-if="node.type === 'folder' && node.children && node.children.length" class="folder-children">
    <FileTreeNode v-for="child in node.children" :key="child.name" :node="child" :activeFile="activeFile"
      @selectFile="$emit('selectFile', $event)" @addFile="$emit('addFile', $event)"
      @addFolder="$emit('addFolder', $event)" @removeFile="$emit('removeFile', $event)"
      @renameFile="$emit('renameFile', $event)" @renameFolder="$emit('renameFolder', $event)"
      @moveNode="$emit('moveNode', $event)" />
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'

// Props: data node (file/folder) & active file
const props = defineProps<{
  node: {
    name: string
    type: 'file' | 'folder'
    content?: string
    children?: any[]
  }
  activeFile: string
  siblings?: any[] // opsional: list sibling dari parent, jika ingin validasi unik
}>()

// Emits: event CRUD lengkap untuk parent
const emit = defineEmits([
  'selectFile',
  'addFile',
  'addFolder',
  'removeFile',
  'renameFile',
  'renameFolder',
  'moveNode'
])

// State
const renaming = ref(false)
const renameValue = ref(props.node.name)
const isActive = computed(() =>
  props.node.type === 'file' && props.node.name === props.activeFile
)

// Select file
function handleSelectFile() {
  if (props.node.type === 'file' && !renaming.value) emit('selectFile', props.node.name)
}

// Mulai rename
function startRenaming() {
  if (renaming.value) return
  renaming.value = true
  renameValue.value = props.node.name
  nextTick(() => {
    const inp = document.querySelector('.rename-input') as HTMLInputElement
    if (inp) inp.focus()
  })
}

// Validasi nama unik di siblings (jika ada)
function isNameUnique(newName: string): boolean {
  if (!props.siblings) return true
  return !props.siblings.some(
    (n: any) => n.name === newName && n !== props.node
  )
}

// Konfirmasi rename
function confirmRename() {
  const val = renameValue.value.trim()
  if (!val || val === props.node.name) {
    renaming.value = false
    return
  }
  if (!isNameUnique(val)) {
    alert('Nama sudah dipakai di folder ini.')
    return
  }
  if (props.node.type === 'file')
    emit('renameFile', { node: props.node, newName: val })
  else
    emit('renameFolder', { node: props.node, newName: val })
  renaming.value = false
}

// Batal rename
function cancelRename() {
  renaming.value = false
}

// Keyboard handler di input rename
function handleRenameKey(e: KeyboardEvent) {
  if (e.key === 'Enter') confirmRename()
  if (e.key === 'Escape') cancelRename()
}

// Tambah file/folder ke node ini (folder)
function handleAddFile() {
  emit('addFile', props.node)
}
function handleAddFolder() {
  emit('addFolder', props.node)
}

// Hapus node ini
function handleRemove() {
  emit('removeFile', props.node)
}

// Click outside rename input = cancel
onMounted(() => {
  function handleClickOutside(e: MouseEvent) {
    if (!renaming.value) return
    const target = e.target as HTMLElement
    if (!target.closest('.rename-input')) cancelRename()
  }
  document.addEventListener('mousedown', handleClickOutside)
})

</script>



<style scoped>
.file-item {
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 3px 6px 3px 18px;
  margin: 2px 0;
  border-radius: 6px;
  background: linear-gradient(90deg, #1e2a3a 80%, #283c5e 100%);
  position: relative;
  font-size: 13px;
  color: #a4e1fa;
  cursor: pointer;
  gap: 7px;
  transition: background 0.16s, color 0.13s;
  user-select: none;
}

.file-item.folder {
  background: linear-gradient(90deg, #223355 80%, #23466b 100%);
}

.file-item.active {
  background: linear-gradient(90deg, #3752a6 65%, #34d9ff 100%);
  color: #fff;
  font-weight: 700;
}

.file-icon {
  font-size: 15px;
  margin-right: 6px;
}

.file-name {
  flex: 1 1 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: text;
}

.folder-children {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-left: 20px;
  border-left: 1.5px solid #23405d33;
  padding-left: 8px;
}

.file-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.file-action {
  margin-left: 4px;
  color: #8dc6ff;
  font-size: 13px;
  border-radius: 3px;
  padding: 1px 5px;
  cursor: pointer;
  transition: background 0.13s, color 0.13s;
  background: none;
  border: none;
}

.file-action.delete:hover {
  background: #2b192a;
  color: #ff6464;
}

.file-action.rename:hover {
  background: #223e5a;
  color: #fff;
}

.file-action.add-file:hover,
.file-action.add-folder:hover {
  background: #223e5a;
  color: #fff;
}

.rename-input {
  font-size: 13px;
  border: 1px solid #44e1ff;
  border-radius: 4px;
  padding: 2px 7px;
  background: #0e233e;
  color: #fff;
  outline: none;
  width: 120px;
  margin-left: -4px;
}

@media (max-width: 600px) {
  .file-item {
    font-size: 11px;
    padding-left: 9px;
  }

  .folder-children {
    margin-left: 9px;
    padding-left: 3px;
  }
}
</style>

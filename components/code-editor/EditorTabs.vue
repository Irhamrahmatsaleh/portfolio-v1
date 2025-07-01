<template>
  <div class="editor-tabs">
    <div v-for="file in files" :key="file.name" :class="['tab', { active: file.name === activeFile }]"
      @click="selectTab(file.name)">
      <span class="tab-name">{{ file.name }}</span>
      <span v-if="files.length > 1" class="tab-close" @click.stop="closeTab(file.name)" title="Close">×</span>
    </div>
    <button class="tab-add" @click="addTab">+</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  files: Array<{ name: string }>,
  activeFile: string
}>()
const emit = defineEmits(['selectTab', 'closeTab', 'addTab'])

function selectTab(name: string) {
  emit('selectTab', name)
}
function closeTab(name: string) {
  emit('closeTab', name)
}
function addTab() {
  emit('addTab')
}
</script>

<style scoped>
.editor-tabs {
  display: flex;
  align-items: center;
  background: #16202d;
  padding: 0 8px;
  border-radius: 6px 6px 0 0;
  min-height: 33px;
  gap: 4px;
  user-select: none;
}

.tab {
  padding: 6px 16px 6px 10px;
  border-radius: 5px 5px 0 0;
  background: #1b2940;
  color: #b2d1ff;
  margin-right: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  transition: background 0.15s;
  font-size: 12px;
}

.tab.active {
  background: #24395a;
  color: #fff;
  font-weight: 700;
}

.tab-close {
  margin-left: 8px;
  color: #8dc6ff;
  font-size: 13px;
  cursor: pointer;
  font-weight: 900;
  transition: color 0.13s;
}

.tab-close:hover {
  color: #ff6464;
}

.tab-add {
  background: none;
  border: none;
  color: #8dc6ff;
  font-size: 16px;
  margin-left: 8px;
  cursor: pointer;
  padding: 0 5px;
  border-radius: 4px;
  transition: background 0.13s;
}

.tab-add:hover {
  background: #2b436b;
  color: #fff;
}
</style>

<script setup>
// Import Vue composition API
import { ref, watch, onMounted } from 'vue'

// Ambil prop dari parent agar sinkron (v-model / :model-value)
const props = defineProps({
  modelValue: { type: Boolean, default: true }
})
const emit = defineEmits(['update:sound'])

// State lokal toggle (sinkron dengan parent)
const soundOn = ref(props.modelValue)

// Sinkronisasi ke parent (bi-directional binding)
watch(() => props.modelValue, (val) => {
  soundOn.value = val
})
watch(soundOn, (val) => {
  emit('update:sound', val)
  localStorage.setItem('superkiller-sound', val ? 'on' : 'off')
})

// Restore dari localStorage saat mount
onMounted(() => {
  const saved = localStorage.getItem('superkiller-sound')
  if (saved === 'off') soundOn.value = false
})
</script>

<template>
  <button class="sound-toggle" :aria-pressed="soundOn" :title="soundOn ? 'Sound ON' : 'Sound OFF'"
    @click="soundOn = !soundOn">
    <span v-if="soundOn" class="icon" aria-label="Sound On">🔊</span>
    <span v-else class="icon" aria-label="Sound Off">🔇</span>
    <span class="label">{{ soundOn ? 'Sound ON' : 'Sound OFF' }}</span>
  </button>
</template>

<style scoped>
.sound-toggle {
  display: flex;
  align-items: center;
  background: #232323;
  color: #39ff14;
  border: 2px solid #1aff65;
  border-radius: 8px;
  padding: 8px 16px;
  font-family: 'Fira Mono', 'Consolas', monospace;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
  user-select: none;
  outline: none;
}

.sound-toggle[aria-pressed="true"] {
  background: #181f18;
  color: #39ff14;
  border-color: #39ff14;
}

.sound-toggle[aria-pressed="false"] {
  background: #232323;
  color: #aaa;
  border-color: #444;
}

.icon {
  font-size: 1.3em;
  margin-right: 10px;
}

.label {
  font-weight: bold;
  letter-spacing: 0.03em;
}

.sound-toggle:focus {
  box-shadow: 0 0 0 2px #39ff1466;
}
</style>

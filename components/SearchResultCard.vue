<template>
  <div
    class="group bg-[#181818] hover:bg-[#222] rounded-lg p-10 mb-8 border border-transparent hover:border-green-500 transition-all shadow-xl flex flex-col gap-4 cursor-pointer w-full max-w-5xl mx-auto"
    @click="openLink" tabindex="0" @keydown.enter="openLink" :aria-label="result.title">
    <div class="flex items-center gap-4 mb-2">
      <img v-if="result.pagemap?.cse_thumbnail?.[0]?.src" :src="result.pagemap.cse_thumbnail[0].src" alt="thumbnail"
        class="w-12 h-12 rounded shadow border border-green-900 object-contain" loading="lazy" />
      <span
        class="text-base text-green-300 font-mono tracking-tight whitespace-nowrap overflow-hidden overflow-ellipsis"
        :title="displayUrl">
        {{ displayUrl }}
      </span>
    </div>
    <h3 class="text-2xl font-bold text-green-400 group-hover:underline group-hover:text-green-200 transition"
      v-html="highlight(result.title)"></h3>
    <p class="text-lg text-green-100 leading-relaxed line-clamp-4" v-html="highlight(result.snippet)"></p>
    <div v-if="result.displayLink" class="mt-4 flex items-center gap-2">
      <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M13.828 10.172a4 4 0 015.656 5.656l-3 3a4 4 0 01-5.656-5.656l1-1"></path>
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M10.172 13.828a4 4 0 01-5.656-5.656l3-3a4 4 0 015.656 5.656l-1 1"></path>
      </svg>
      <span class="text-green-500 text-sm font-mono">{{ result.displayLink }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  result: {
    type: Object,
    required: true
  },
  keyword: {
    type: String,
    default: ''
  }
})

const displayUrl = computed(() => {
  try {
    const url = new URL(props.result.link)
    return url.hostname + url.pathname
  } catch {
    return props.result.link
  }
})

function highlight(text) {
  if (!props.keyword) return text
  const escaped = props.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  return text.replace(regex, '<span class="bg-green-700 text-white px-1 rounded-sm">$1</span>')
}

function openLink() {
  window.open(props.result.link, '_blank', 'noopener')
}
</script>

<style scoped>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;

  /* Properti tambahan untuk kompatibilitas dan stabilitas */
  line-height: 1.6;
  word-wrap: break-word;

  /* Fallback untuk browser yang tidak mendukung line-clamp */
  max-height: calc(1.6em * 4);
}

/* Fallback untuk browser yang tidak mendukung */
@supports not ((-webkit-line-clamp: 4) and (display: -webkit-box)) {
  .line-clamp-4 {
    overflow: hidden;
    display: block;
    max-height: calc(1.6em * 4);
    line-height: 1.6;
    word-wrap: break-word;
    position: relative;
  }

  .line-clamp-4::after {
    content: '...';
    position: absolute;
    bottom: 0;
    right: 0;
    padding-left: 1rem;
    background: linear-gradient(to right, transparent, #181818 50%);
  }
}
</style>

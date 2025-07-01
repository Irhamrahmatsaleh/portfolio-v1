<template>
  <div class="min-h-screen bg-[#111] flex flex-col" style="min-height:400px;">


    <!-- MAIN PANEL -->
    <main class="flex-1 flex flex-col items-center justify-center py-6 px-2">
      <div class="w-full max-w-5xl bg-[#181818] rounded-xl shadow-2xl border border-green-900 flex flex-col px-8"
        style="min-height:500px;">
        <!-- TITLE & SEARCH BAR -->
        <div class="flex flex-col gap-2 pt-6 pb-3 border-b border-green-900">
          <h1 class="text-green-400 text-2xl font-extrabold tracking-widest mb-1">Search Engine</h1>
          <form @submit.prevent="onSearch" class="flex gap-2 w-full">
            <input v-model="searchInput" :placeholder="`Ketik kata kunci lalu Enter...`"
              class="flex-1 bg-[#212121] border border-green-700 rounded px-4 py-2 text-green-200 focus:outline-none focus:border-green-500 font-mono"
              maxlength="100" autofocus />
            <button type="submit"
              class="bg-green-500 hover:bg-green-600 px-5 py-2 rounded text-black font-bold shadow">Search</button>
          </form>
          <div class="text-xs text-green-700 mt-1 font-mono truncate">
            {{ "Prompt: sudo google " + searchInput }}
          </div>
        </div>

        <!-- HASIL SEARCH (scrollable) -->
        <div class="flex-1 overflow-y-auto py-4" style="max-height: 60vh; min-height: 200px;">
          <div v-if="loading" class="flex flex-col items-center justify-center min-h-[200px]">
            <svg class="w-10 h-10 text-green-400 animate-spin mb-3" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <span class="text-green-300 font-mono">Mencari hasil terbaik...</span>
          </div>
          <div v-else-if="error" class="text-red-400 font-mono text-center py-8">
            <b>Error:</b> {{ error }}
          </div>
          <div v-else-if="results.length === 0 && searched" class="text-green-300 font-mono text-center py-8">
            Tidak ada hasil untuk "<b>{{ query }}</b>"
          </div>
          <div v-else>
            <div class="text-green-600 text-xs mb-2 font-mono">
              Ditemukan <b>{{ info.totalResults || 0 }}</b> hasil dalam <b>{{ info.searchTime || 0 }}</b> detik.
            </div>
            <SearchResultCard v-for="result in results" :key="result.cacheId + result.title" :result="result"
              :keyword="query" />
            <!-- PAGINATION CONTROL -->
            <div v-if="info.nextPage || info.prevPage" class="flex justify-between mt-4 mb-2">
              <button v-if="info.prevPage" @click="gotoPage(info.prevPage)"
                class="px-4 py-2 rounded bg-green-700 text-white hover:bg-green-500 font-mono text-xs">Prev</button>
              <div />
              <button v-if="info.nextPage" @click="gotoPage(info.nextPage)"
                class="px-4 py-2 rounded bg-green-700 text-white hover:bg-green-500 font-mono text-xs">Next</button>
            </div>
          </div>
        </div>
      </div>
    </main>


  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SearchResultCard from '@/components/SearchResultCard.vue'



const searchInput = ref('')
const query = ref('')
const results = ref([])
const error = ref('')
const loading = ref(false)
const info = ref({})
const searched = ref(false)

const route = useRoute()
const router = useRouter()

function getQueryFromUrl() {
  return (route.query.q || '').toString()
}

// Fetch dari endpoint API server
async function googleSearch(q, num = 10, start = 1) {
  try {
    const url = `/api/google-search?q=${encodeURIComponent(q)}&num=${num}&start=${start}`
    const res = await fetch(url)
    return await res.json()
  } catch (e) {
    return { error: e.message, items: [] }
  }
}

async function fetchResults(q, start = 1) {
  if (!q) return
  loading.value = true
  error.value = ''
  results.value = []
  info.value = {}
  searched.value = false
  try {
    const res = await googleSearch(q, 10, start)
    if (res.error) {
      error.value = res.error
      return
    }
    results.value = res.items
    info.value = res.info || {}
    searched.value = true
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

function onSearch() {
  if (!searchInput.value.trim()) return
  router.push({ path: '/search/google', query: { q: searchInput.value.trim() } })
}

function gotoPage(pageIndex) {
  fetchResults(query.value, pageIndex)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  query.value = getQueryFromUrl()
  searchInput.value = query.value
  if (query.value) fetchResults(query.value)
})

watch(
  () => route.query.q,
  (q) => {
    query.value = q?.toString() || ''
    searchInput.value = query.value
    if (query.value) fetchResults(query.value)
  }
)
</script>

<style scoped>
.flex-1::-webkit-scrollbar {
  width: 9px;
  background: #161b22;
}

.flex-1::-webkit-scrollbar-thumb {
  background: #2e4e30;
  border-radius: 8px;
}

.flex-1::-webkit-scrollbar-thumb:hover {
  background: #3ddc68;
}
</style>

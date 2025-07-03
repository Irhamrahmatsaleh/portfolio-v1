export default defineEventHandler(async (event) => {
  const { q, num = 10, start = 1 } = getQuery(event)

  if (!q || typeof q !== 'string' || !q.trim()) {
    return { error: 'Query tidak boleh kosong', items: [] }
  }

  const config = useRuntimeConfig()
  const GOOGLE_API_KEY = config.GOOGLE_API_KEY
  const GOOGLE_CX = config.GOOGLE_CX

  if (!GOOGLE_API_KEY || !GOOGLE_CX) {
    return {
      error: 'GOOGLE_API_KEY dan GOOGLE_CX harus diatur di file .env',
      items: [],
    }
  }

  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(
    q,
  )}&num=${num}&start=${start}`

  try {
    const res = await fetch(url)
    const data = await res.json()
    if (data.error) throw new Error(data.error.message)
    return {
      items: data.items || [],
      info: {
        totalResults: data.searchInformation?.totalResults ?? 0,
        searchTime: data.searchInformation?.searchTime ?? 0,
        nextPage: data.queries?.nextPage?.[0]?.startIndex ?? null,
        prevPage: data.queries?.previousPage?.[0]?.startIndex ?? null,
      },
    }
  } catch (e) {
    return { error: e.message, items: [] }
  }
})

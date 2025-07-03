export default defineEventHandler(async (event) => {
  const apiKey = process.env.NUXT_GROQ_API_KEY
  const body = await readBody(event)
  const messages = body?.messages || []

  // Debug: log apiKey dan pesan yang dikirim
  // console.log('GROQ API KEY exists:', !!apiKey)
  // console.log('Messages:', JSON.stringify(messages, null, 2))

  try {
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant', // Model sesuai Groq docs
          messages,
        }),
      },
    )

    const data = await response.json()
    // Debug: log hasil response dari Groq
    // console.log('Groq API response:', JSON.stringify(data, null, 2))

    if (data?.choices?.[0]?.message?.content) {
      return { reply: data.choices[0].message.content }
    } else {
      // Debug: log error dari response
      // console.error('Groq API error:', data)
      return { error: data?.error?.message || 'No reply from Groq' }
    }
  } catch (e) {
    // console.error('Fetch error:', e)
    return { error: 'Failed to connect to Groq API' }
  }
})

// POST /api/contact
//
// Contact form endpoint.
//
// Flow (anti-spam):
//   1. Validate name / email / message.
//   2. Send a confirmation copy to the USER's own email first.
//   3. Only then forward the message to the OWNER.
//
// If the user's email cannot be delivered, the owner never receives the
// message — this is what keeps spam from fake addresses out of the inbox.
//
// Email delivery uses the Resend REST API (native fetch — no extra npm
// package). Set RESEND_API_KEY in your environment (Vercel → Settings →
// Environment Variables) to enable sending. Without it the endpoint still
// validates and records the message but returns a clear "not configured"
// response instead of silently dropping the submission.

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const name = String(body?.name || '').trim()
  const email = String(body?.email || '').trim()
  const subject = String(body?.subject || '').trim()
  const message = String(body?.message || '').trim()

  if (!name || !email || !message) {
    return { ok: false, error: 'Name, email, and message are required.' }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Invalid email address.' }
  }

  const config = useRuntimeConfig()
  const apiKey = (config && config.resendApiKey) || process.env.RESEND_API_KEY || process.env.NUXT_RESEND_API_KEY

  const ownerEmail = 'irhamrahmatsaleh904@gmail.com'
  const finalSubject = subject || `New message from ${name}`

  const ownerHtml = `
    <h2>New Contact Message</h2>
    <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
    <p><strong>Subject:</strong> ${escapeHtml(finalSubject)}</p>
    <hr>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    <hr>
    <p><em>Reply directly to ${escapeHtml(email)}.</em></p>
  `

  const ownerText = `Name: ${name}\nEmail: ${email}\nSubject: ${finalSubject}\n\nMessage:\n${message}`

  const userHtml = `
    <h2>Thanks for your message, ${escapeHtml(name)}!</h2>
    <p>A copy of your message has been forwarded to the owner.</p>
    <hr>
    <p><strong>Subject:</strong> ${escapeHtml(finalSubject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `

  const userText = `Hi ${name},\n\nThank you for your message. A copy is below:\n\nSubject: ${finalSubject}\n\n${message}\n\n— The Owner`

  const results = []

  if (!apiKey) {
    return {
      ok: false,
      error: 'Email service not configured. Set RESEND_API_KEY to enable delivery.',
      recorded: { name, email, subject: finalSubject, message },
    }
  }

  // 1) Send to the USER first.
  let userSent = false
  try {
    const userRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.com>',
        to: email,
        subject: `Re: ${finalSubject}`,
        html: userHtml,
        text: userText,
      }),
    })
    const userJson = await userRes.json().catch(() => ({}))
    userSent = userRes.ok
    results.push({ to: 'user', ok: userSent, detail: userJson })
  } catch (err) {
    results.push({ to: 'user', ok: false, error: String(err) })
  }

  // 2) Only forward to the owner if the user copy was accepted.
  if (userSent) {
    try {
      const ownerRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Contact Form <onboarding@resend.com>',
          to: ownerEmail,
          subject: finalSubject,
          html: ownerHtml,
          text: ownerText,
          reply_to: email,
        }),
      })
      const ownerJson = await ownerRes.json().catch(() => ({}))
      results.push({ to: 'owner', ok: ownerRes.ok, detail: ownerJson })
    } catch (err) {
      results.push({ to: 'owner', ok: false, error: String(err) })
    }
  }

  const allOk = results.every(r => r.ok)
  return { ok: allOk, results }
})

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]))
}
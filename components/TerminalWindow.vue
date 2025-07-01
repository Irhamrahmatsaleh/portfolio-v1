<template>
  <div class="terminal-window" @click="focusInput" tabindex="0" ref="terminalContainer"
    aria-label="Super Killer Terminal">
    <div class="terminal-output">
      <div v-for="(line, idx) in displayLines" :key="idx" class="terminal-line">
        <span v-if="line.prompt" class="prompt">{{ line.prompt }}</span>
        <span class="content" v-html="line.content"></span>
      </div>
      <div class="terminal-input-line">
        <span class="prompt">{{ prompt }}</span>
        <input v-model="currentInput" @keydown="handleKey" class="terminal-input" autocomplete="off" spellcheck="false"
          autofocus ref="input" />
        <span class="blinking-cursor">_</span>
      </div>
      <div class="text-yellow-300 font-mono text-xs mt-1 mb-3 px-2 animate-pulse">
        Example Command: <b><i>sudo apt update</i></b>
      </div>
      <div class="text-yellow-300 font-mono text-xs mt-1 mb-3 px-2 animate-pulse">
        💡 Terminal Linux Tips:
        <ol class="list-decimal pl-4 mt-1">
          <li>Gunakan <b>ls</b> untuk melihat daftar file/folder di direktori saat ini.</li>
          <li>Ketik <b>cd nama_folder</b> untuk berpindah direktori.</li>
          <li><b>pwd</b> menampilkan path direktori aktif Anda.</li>
          <li>Untuk membuat folder baru: <b>mkdir nama_folder</b>.</li>
          <li><b>man [perintah]</b> menampilkan manual/penjelasan untuk perintah Linux.</li>
        </ol>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick, onMounted } from 'vue'
import { parseCommand } from '@/utils/FakeCommandEngine.js'


const prompt = 'root@secret:~#'
const currentInput = ref('')
const history = ref([])
const historyIdx = ref(-1)
const terminalLines = reactive([])
const emit = defineEmits(['terminal-event'])
const displayLines = computed(() => [...terminalLines])
const input = ref(null)
const terminalContainer = ref(null)

const props = defineProps({
  soundOn: {
    type: Boolean,
    default: true
  }
})

let typingSound = null
onMounted(() => {
  if (typeof window !== 'undefined') {
    typingSound = new window.Audio('/sounds/typing.wav')
  }
  nextTick(focusInput)
})


function focusInput() {
  input.value && input.value.focus()
}


function playTypingSound() {
  if (props.soundOn && typingSound) {
    try {
      typingSound.currentTime = 0
      typingSound.play()
    } catch { }
  }
}


function handleKey(e) {
  if (e.key === 'Enter') {
    handleEnter()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    prevHistory()
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    nextHistory()
  } else if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') {
    playTypingSound()
  }
}


async function handleEnter() {
  const inputVal = currentInput.value.trim()
  if (!inputVal) return

  terminalLines.push({ prompt, content: inputVal })
  history.value.push(inputVal)
  historyIdx.value = history.value.length


  if (inputVal === 'clear' || inputVal === 'cls') {
    terminalLines.splice(0, terminalLines.length)
    currentInput.value = ''
    nextTick(scrollToBottom)
    return
  }

  if (inputVal.toLowerCase() === 'pwd') {
    terminalLines.push({ prompt: '', content: `/home/user/workspace` })
    terminalLines.push({
      prompt: '',
      content: `<span class="text-cyan-400">📚 PWD (Print Working Directory)</span><br>
      <span class="text-green-400">✓ Fungsi:</span> Menampilkan direktori aktif saat ini<br>
      <span class="text-yellow-400">💡 Tips:</span> Gunakan saat tersesat navigasi direktori<br>
      <span class="text-blue-400">🔗 Related:</span> cd, ls, tree`
    })
    currentInput.value = ''
    nextTick(scrollToBottom)
    return
  }

  if (inputVal.toLowerCase() === 'ls' || inputVal.toLowerCase().startsWith('ls ')) {
    const lsOptions = inputVal.slice(2).trim()
    let fileList = `
<span class="text-blue-400">drwxr-xr-x</span>  3 user user  4096 Dec 30 10:15 <span class="text-blue-400">Documents/</span>
<span class="text-blue-400">drwxr-xr-x</span>  2 user user  4096 Dec 29 14:20 <span class="text-blue-400">Downloads/</span>
<span class="text-green-400">-rw-r--r--</span>  1 user user  1024 Dec 30 09:30 <span class="text-white">config.txt</span>
<span class="text-green-400">-rwxr-xr-x</span>  1 user user  8192 Dec 28 16:45 <span class="text-green-400">script.sh</span>
<span class="text-green-400">-rw-r--r--</span>  1 user user   512 Dec 27 11:10 <span class="text-white">readme.md</span>`
    if (lsOptions.includes('-l')) {
      terminalLines.push({ prompt: '', content: `total 20${fileList}` })
    } else if (lsOptions.includes('-a')) {
      terminalLines.push({ prompt: '', content: `<span class="text-blue-400">.</span>  <span class="text-blue-400">..</span>  <span class="text-gray-400">.hidden</span>  Documents  Downloads  config.txt  script.sh  readme.md` })
    } else {
      terminalLines.push({ prompt: '', content: `<span class="text-blue-400">Documents</span>  <span class="text-blue-400">Downloads</span>  config.txt  script.sh  readme.md` })
    }
    terminalLines.push({
      prompt: '',
      content: `<span class="text-cyan-400">📚 LS (List Directory Contents)</span><br>
      <span class="text-green-400">✓ Fungsi:</span> Menampilkan daftar file dan folder<br>
      <span class="text-yellow-400">💡 Options:</span> -l (detail), -a (semua/hidden), -h (human readable)<br>
      <span class="text-purple-400">🎯 Contoh:</span> ls -la, ls -lh, ls *.txt<br>
      <span class="text-blue-400">🔗 Related:</span> pwd, cd, find, tree`
    })
    currentInput.value = ''
    nextTick(scrollToBottom)
    return
  }

  if (inputVal.toLowerCase().startsWith('cd ') || inputVal.toLowerCase() === 'cd') {
    const targetDir = inputVal.slice(2).trim() || '~'
    let newPath = '/home/user'
    if (targetDir === '..') newPath = '/home'
    else if (targetDir === '/') newPath = '/'
    else if (targetDir !== '~') newPath = `/home/user/${targetDir}`
    terminalLines.push({ prompt: '', content: `<span class="text-green-400">✓ Changed to:</span> ${newPath}` })
    terminalLines.push({
      prompt: '',
      content: `<span class="text-cyan-400">📚 CD (Change Directory)</span><br>
      <span class="text-green-400">✓ Fungsi:</span> Berpindah ke direktori lain<br>
      <span class="text-yellow-400">💡 Shortcuts:</span> cd ~ (home), cd .. (parent), cd - (last dir)<br>
      <span class="text-purple-400">🎯 Contoh:</span> cd /var/log, cd ~/Documents<br>
      <span class="text-blue-400">🔗 Related:</span> pwd, ls, pushd, popd`
    })
    currentInput.value = ''
    nextTick(scrollToBottom)
    return
  }

  if (inputVal.toLowerCase().startsWith('mkdir ')) {
    const dirName = inputVal.slice(6).trim()
    terminalLines.push({ prompt: '', content: `<span class="text-green-400">✓ Directory '${dirName}' created successfully</span>` })
    terminalLines.push({
      prompt: '',
      content: `<span class="text-cyan-400">📚 MKDIR (Make Directory)</span><br>
      <span class="text-green-400">✓ Fungsi:</span> Membuat direktori/folder baru<br>
      <span class="text-yellow-400">💡 Options:</span> -p (parent dirs), -m (set permissions)<br>
      <span class="text-purple-400">🎯 Contoh:</span> mkdir -p path/to/deep/dir<br>
      <span class="text-blue-400">🔗 Related:</span> rmdir, ls, cd, chmod`
    })
    currentInput.value = ''
    nextTick(scrollToBottom)
    return
  }

  if (inputVal.toLowerCase().startsWith('cat ')) {
    const fileName = inputVal.slice(4).trim()
    terminalLines.push({
      prompt: '',
      content: `<span class="text-gray-300"># Content of ${fileName}
#!/bin/bash
echo "Hello World!"
echo "This is a sample file content"
# End of file</span>`
    })
    terminalLines.push({
      prompt: '',
      content: `<span class="text-cyan-400">📚 CAT (Concatenate)</span><br>
      <span class="text-green-400">✓ Fungsi:</span> Menampilkan isi file ke layar<br>
      <span class="text-yellow-400">💡 Tips:</span> Gunakan less/more untuk file besar<br>
      <span class="text-purple-400">🎯 Contoh:</span> cat file1 file2 > combined.txt<br>
      <span class="text-blue-400">🔗 Related:</span> less, more, head, tail, grep`
    })
    currentInput.value = ''
    nextTick(scrollToBottom)
    return
  }

  if (inputVal.toLowerCase() === 'ps' || inputVal.toLowerCase().startsWith('ps ')) {
    terminalLines.push({
      prompt: '',
      content: `<span class="text-white">  PID TTY          TIME CMD</span>
<span class="text-green-400"> 1234</span> pts/0    00:00:01 bash
<span class="text-green-400"> 5678</span> pts/0    00:00:00 node
<span class="text-green-400"> 9012</span> pts/0    00:00:02 nginx
<span class="text-green-400"> 3456</span> pts/0    00:00:00 ps`
    })
    terminalLines.push({
      prompt: '',
      content: `<span class="text-cyan-400">📚 PS (Process Status)</span><br>
      <span class="text-green-400">✓ Fungsi:</span> Menampilkan proses yang sedang berjalan<br>
      <span class="text-yellow-400">💡 Options:</span> -aux (all users), -ef (full format)<br>
      <span class="text-purple-400">🎯 Contoh:</span> ps aux | grep nginx<br>
      <span class="text-blue-400">🔗 Related:</span> top, htop, kill, jobs`
    })
    currentInput.value = ''
    nextTick(scrollToBottom)
    return
  }

  if (inputVal.toLowerCase() === 'top') {
    terminalLines.push({
      prompt: '',
      content: `<span class="text-green-400">top - 14:30:25 up 2 days, 5:42, 2 users, load average: 0.15, 0.10, 0.08</span>
Tasks: 95 total, 1 running, 94 sleeping
%Cpu(s): 2.3 us, 1.2 sy, 0.0 ni, 96.5 id
MiB Mem: 8192.0 total, 2048.5 free, 4096.2 used
MiB Swap: 2048.0 total, 2048.0 free, 0.0 used

<span class="text-cyan-400">PID  USER   %CPU %MEM   TIME+ COMMAND</span>
1234 user    12.5  8.3   0:45.23 firefox
5678 user     5.2  4.1   0:12.45 code
9012 root     2.1  1.5   0:05.67 systemd`
    })
    terminalLines.push({
      prompt: '',
      content: `<span class="text-cyan-400">📚 TOP (Table of Processes)</span><br>
      <span class="text-green-400">✓ Fungsi:</span> Monitor sistem real-time<br>
      <span class="text-yellow-400">💡 Hotkeys:</span> q (quit), k (kill), s (sort), f (fields)<br>
      <span class="text-purple-400">🎯 Alternative:</span> htop (lebih user-friendly)<br>
      <span class="text-blue-400">🔗 Related:</span> ps, htop, iotop, free, uptime`
    })
    currentInput.value = ''
    nextTick(scrollToBottom)
    return
  }

  if (inputVal.toLowerCase() === 'whoami') {
    terminalLines.push({ prompt: '', content: `user` })
    terminalLines.push({
      prompt: '',
      content: `<span class="text-cyan-400">📚 WHOAMI (Who Am I)</span><br>
      <span class="text-green-400">✓ Fungsi:</span> Menampilkan username aktif<br>
      <span class="text-yellow-400">💡 Uses:</span> Script automation, permission checking<br>
      <span class="text-purple-400">🎯 Related:</span> id, who, users, groups<br>
      <span class="text-blue-400">🔗 Similar:</span> echo $USER, id -un`
    })
    currentInput.value = ''
    nextTick(scrollToBottom)
    return
  }

  if (inputVal.toLowerCase() === 'date') {
    const now = new Date()
    terminalLines.push({ prompt: '', content: `${now.toString()}` })
    terminalLines.push({
      prompt: '',
      content: `<span class="text-cyan-400">📚 DATE (Date and Time)</span><br>
      <span class="text-green-400">✓ Fungsi:</span> Menampilkan/mengatur tanggal dan waktu<br>
      <span class="text-yellow-400">💡 Format:</span> date +"%Y-%m-%d %H:%M:%S"<br>
      <span class="text-purple-400">🎯 Contoh:</span> date -d "next monday", date +%s<br>
      <span class="text-blue-400">🔗 Related:</span> cal, uptime, timedatectl`
    })
    currentInput.value = ''
    nextTick(scrollToBottom)
    return
  }

  if (inputVal.toLowerCase() === 'history') {
    const recentHistory = history.value.slice(-10).map((cmd, idx) =>
      `<span class="text-gray-400">${history.value.length - 10 + idx + 1}</span>  ${cmd}`
    ).join('<br>')
    terminalLines.push({ prompt: '', content: recentHistory })
    terminalLines.push({
      prompt: '',
      content: `<span class="text-cyan-400">📚 HISTORY (Command History)</span><br>
      <span class="text-green-400">✓ Fungsi:</span> Menampilkan riwayat perintah<br>
      <span class="text-yellow-400">💡 Shortcuts:</span> !! (last cmd), !n (cmd #n), Ctrl+R (search)<br>
      <span class="text-purple-400">🎯 Options:</span> history -c (clear), history -d n (delete)<br>
      <span class="text-blue-400">🔗 Related:</span> fc, alias, bash shortcuts`
    })
    currentInput.value = ''
    nextTick(scrollToBottom)
    return
  }

  if (inputVal.toLowerCase().startsWith('sudo google ')) {
    const keyword = inputVal.slice(12).trim()
    terminalLines.push({ prompt: '', content: `<span class="text-green-400">🚀 Launching Google search for:</span> "${keyword}"` })
    setTimeout(() => {
      window.location.href = `/search/google?q=${encodeURIComponent(keyword)}`
    }, 1000)
    currentInput.value = ''
    nextTick(scrollToBottom)
    return
  }
  if (inputVal.toLowerCase().startsWith('sudo duckduckgo ')) {
    const keyword = inputVal.slice(16).trim()
    terminalLines.push({ prompt: '', content: `<span class="text-green-400">🦆 Launching DuckDuckGo search for:</span> "${keyword}"` })
    setTimeout(() => {
      window.location.href = `/search/duckduckgo?q=${encodeURIComponent(keyword)}`
    }, 1000)
    currentInput.value = ''
    nextTick(scrollToBottom)
    return
  }

  if (inputVal.toLowerCase() === 'sudo apt update' || inputVal.toLowerCase() === 'sudo apt upgrade') {
    const isUpdate = inputVal.toLowerCase().includes('update')
    terminalLines.push({ prompt: '', content: `<span class="text-cyan-400">🔄 ${isUpdate ? 'Updating' : 'Upgrading'} package lists...</span>` })
    const steps = [
      'Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease',
      'Get:2 http://archive.ubuntu.com/ubuntu jammy-updates InRelease [119 kB]',
      'Get:3 http://archive.ubuntu.com/ubuntu jammy-backports InRelease [108 kB]',
      'Get:4 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]',
      'Fetched 337 kB in 2s (168 kB/s)',
      'Reading package lists... Done',
      isUpdate ? 'Building dependency tree... Done' : 'Calculating upgrade... Done',
      `<span class="text-green-400">✅ ${isUpdate ? 'Package lists updated' : 'System upgraded'} successfully!</span>`
    ]
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 400 + Math.random() * 300))
      terminalLines.push({ prompt: '', content: steps[i] })
      nextTick(scrollToBottom)
    }
    terminalLines.push({
      prompt: '',
      content: `<span class="text-cyan-400">📚 APT (Advanced Package Tool)</span><br>
      <span class="text-green-400">✓ Fungsi:</span> Mengelola paket/software di Ubuntu/Debian<br>
      <span class="text-yellow-400">💡 Commands:</span> install, remove, search, show, list<br>
      <span class="text-purple-400">🎯 Contoh:</span> sudo apt install nginx, apt search python<br>
      <span class="text-blue-400">🔗 Related:</span> dpkg, snap, flatpak, synaptic`
    })
    currentInput.value = ''
    nextTick(scrollToBottom)
    return
  }

  if (inputVal.toLowerCase() === 'sudo hacktheworld') {
    const hackingSteps = [
      '<span class="text-red-400">🔥 INITIALIZING SUPER KILLER MODE...</span>',
      '<span class="text-yellow-400">📡 Scanning global networks...</span>',
      '<span class="text-green-400">💀 Bypassing firewalls...</span>',
      '<span class="text-blue-400">🌐 Accessing mainframes...</span>',
      '<span class="text-purple-400">⚡ Quantum encryption cracked!</span>',
      '<span class="text-cyan-400">🚀 Neural network infiltration complete!</span>',
      '<span class="text-red-500 text-xl">💥 WORLD DOMINATION ACHIEVED! 💥</span>',
      '<span class="text-green-400 text-lg">🎯 You are now the ULTIMATE SUPER KILLER HACKER! 🎯</span>'
    ]
    for (const step of hackingSteps) {
      await new Promise(r => setTimeout(r, 600))
      terminalLines.push({ prompt: '', content: step })
      nextTick(scrollToBottom)
    }
    terminalLines.push({
      prompt: '',
      content: `<span class="text-rainbow text-lg">🌟 STATUS: ELITE HACKER ACTIVATED 🌟</span><br>
      <span class="text-gold">👑 Access Level: MAXIMUM KILLER</span><br>
      <span class="text-silver">⚔️ Skills: ALL UNLOCKED</span><br>
      <span class="text-bronze">🎖️ Rank: LEGENDARY</span>`
    })
    currentInput.value = ''
    nextTick(scrollToBottom)
    return
  }

  if (inputVal.toLowerCase() === 'help' || inputVal.toLowerCase() === '--help') {
    terminalLines.push({
      prompt: '',
      content: `<span class="text-cyan-400 text-xl">🚀 SUPER KILLER TERMINAL - HELP CENTER</span><br><br>
      <span class="text-yellow-400">📚 EDUCATIONAL COMMANDS:</span><br>
      <span class="text-green-400">pwd, ls, cd, mkdir, cat, ps, top, whoami, date, history</span><br><br>
      <span class="text-yellow-400">🔍 SEARCH COMMANDS:</span><br>
      <span class="text-green-400">sudo google [query], sudo duckduckgo [query]</span><br><br>
      <span class="text-yellow-400">📦 SYSTEM COMMANDS:</span><br>
      <span class="text-green-400">sudo apt update, sudo apt upgrade</span><br><br>
      <span class="text-yellow-400">🎯 SPECIAL COMMANDS:</span><br>
      <span class="text-green-400">sudo hacktheworld, sudo linux [command], clear</span><br><br>
      <span class="text-red-400">💡 Pro Tip:</span> Setiap command memberikan penjelasan edukatif!<br>
      <span class="text-blue-400">🔗 Type any Linux command to learn more about it!</span>`
    })
    currentInput.value = ''
    nextTick(scrollToBottom)
    return
  }

  const result = parseCommand(inputVal, history.value) // result selalu objek { output, clear }
  if (result && typeof result === 'object' && ('output' in result)) {
    // Cek jika result.clear true, hapus terminalLines (untuk clear)
    if (result.clear) {
      terminalLines.splice(0, terminalLines.length) // clear terminal
    }
    // Push hasil output string ke terminal
    if (result.output && result.output.trim() !== '') {
      terminalLines.push({ prompt: '', content: result.output })
    }
  } else {
    terminalLines.push({
      prompt: '',
      content: `<span class="text-red-400">❌ Command not found:</span> ${inputVal}<br>
      <span class="text-cyan-400">💡 Try:</span> help (untuk bantuan), sudo linux list (Linux commands)<br>
      <span class="text-yellow-400">🎯 Available:</span> Basic Linux commands, sudo google/duckduckgo, sudo hacktheworld`
    })
  }
  currentInput.value = ''
  nextTick(scrollToBottom)
}

// -- History Navigation / Terminal Tools --
function prevHistory() {
  if (!history.value.length) return
  if (historyIdx.value > 0) historyIdx.value--
  currentInput.value = history.value[historyIdx.value] || ''
}
function nextHistory() {
  if (!history.value.length) return
  if (historyIdx.value < history.value.length - 1) historyIdx.value++
  else {
    historyIdx.value = history.value.length
    currentInput.value = ''
    return
  }
  currentInput.value = history.value[historyIdx.value] || ''
}
function scrollToBottom() {
  if (terminalContainer.value) {
    terminalContainer.value.scrollTop = terminalContainer.value.scrollHeight
  }
}
function showInfo(message) {
  emit('terminal-event', 'modal', message)
}

</script>


<style scoped>
.terminal-window {
  background: #121212;
  color: #39ff14;
  font-family: 'Fira Mono', 'Consolas', monospace;
  padding: 24px;
  border-radius: 12px;
  min-height: 400px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 32px #39ff1422;
  outline: none;
}

.terminal-output {
  width: 100%;
}

.terminal-line {
  display: flex;
  line-height: 1.6;
  white-space: pre-wrap;
}

.prompt {
  color: #1aff65;
  margin-right: 8px;
  font-weight: bold;
}

.content {
  flex: 1;
}

.terminal-input-line {
  display: flex;
  align-items: center;
  margin-top: 2px;
}

.terminal-input {
  background: transparent;
  color: #39ff14;
  border: none;
  font: inherit;
  outline: none;
  width: 60vw;
  min-width: 30ch;
}

.blinking-cursor {
  margin-left: 2px;
  animation: blink 1s steps(1) infinite;
  color: #39ff14;
  user-select: none;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

::-webkit-scrollbar {
  width: 8px;
  background: #232323;
}

::-webkit-scrollbar-thumb {
  background: #1aff65;
  border-radius: 4px;
}

/* KILLER RAINBOW AND KILLER COLORS */
.text-cyan-400 {
  color: #22d3ee;
}

.text-green-400 {
  color: #4ade80;
}

.text-yellow-400 {
  color: #fde047;
}

.text-purple-400 {
  color: #a78bfa;
}

.text-blue-400 {
  color: #60a5fa;
}

.text-gray-400 {
  color: #9ca3af;
}

.text-red-400 {
  color: #f87171;
}

.text-red-500 {
  color: #ef4444;
}

.text-rainbow {
  background: linear-gradient(90deg, #ff5ec4, #45f3ff, #39ff14, #fde047, #ff5ec4);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

.text-gold {
  color: #FFD700;
  font-weight: bold;
}

.text-silver {
  color: #C0C0C0;
  font-weight: bold;
}

.text-bronze {
  color: #CD7F32;
  font-weight: bold;
}

.text-xl {
  font-size: 1.25rem;
}

.text-lg {
  font-size: 1.1rem;
}

.font-mono {
  font-family: 'Fira Mono', 'Consolas', monospace;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: .5;
  }
}

/* KILLER TERMINAL: Extra Details, Accessibility and Modern Touches */
::-webkit-input-placeholder {
  color: #39ff1488;
  font-style: italic;
}

::-moz-placeholder {
  color: #39ff1488;
  font-style: italic;
}

:-ms-input-placeholder {
  color: #39ff1488;
  font-style: italic;
}

::placeholder {
  color: #39ff1488;
  font-style: italic;
}

.terminal-window:focus {
  box-shadow: 0 0 0 2px #39ff1488, 0 4px 32px #39ff1422;
  border: 1.5px solid #39ff14;
}

.terminal-input:focus {
  outline: none;
  background: #161616;
  border-bottom: 1.5px solid #39ff14;
}

.terminal-line .prompt {
  user-select: none;
}

.terminal-line .content {
  word-break: break-all;
  transition: color 0.18s;
}

@media (max-width: 800px) {
  .terminal-window {
    padding: 8px;
    font-size: 0.94em;
    min-width: 0;
    width: 99vw;
    max-width: 100vw;
  }

  .terminal-input {
    width: 90vw;
    min-width: 10ch;
  }
}

@media (max-width: 500px) {
  .terminal-window {
    padding: 2px;
    font-size: 0.83em;
  }

  .terminal-input {
    width: 98vw;
  }
}

/* Scrollbar Customization for Dark Theme */
.terminal-window::-webkit-scrollbar-thumb:hover {
  background: #39ff14cc;
}

.terminal-window::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.terminal-window::-webkit-scrollbar-corner {
  background: #232323;
}

/* Accessibility improvements */
.terminal-input:focus-visible {
  outline: 2px solid #22d3ee;
  background: #181818;
}

.terminal-window:focus-visible {
  outline: 2px solid #a78bfa;
}

/* Custom selection color for hacker vibe */
.terminal-window ::selection {
  background: #39ff14;
  color: #121212;
}

.terminal-window ::-moz-selection {
  background: #39ff14;
  color: #121212;
}

/* Touchscreen improvement */
@media (pointer: coarse) {
  .terminal-input {
    font-size: 1.25em;
  }

  .terminal-window {
    padding-bottom: 36px;
  }
}

/* Killer terminal line animation */
.terminal-line {
  animation: killer-pop-in 0.25s cubic-bezier(.59, .21, .37, 1.01);
}

@keyframes killer-pop-in {
  0% {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* End of killer style extension */
</style>

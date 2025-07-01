/**
 * Utility untuk membuat objek non-mutable (freeze)
 * @param {object} obj
 * @returns {object}
 */
function freeze(obj) {
  return Object.freeze(obj)
}
// Membekukan objek agar tidak bisa diubah

/**
 * Utility: Capitalize string
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  if (typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
// Huruf pertama kapital

/**
 * Utility: Random integer dari min ke max (inklusif)
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
// Integer random

/**
 * Utility: Pick random element dari array
 * @param {Array} arr
 * @returns {*}
 */
function pick(arr) {
  return arr[randInt(0, arr.length - 1)]
}
// Random pick array

/**
 * Utility: Sleep fake (async)
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
// Fake sleep (untuk efek loading asinkron)

// ---- 2. Static fake commands dictionary ----

const STATIC_COMMANDS = freeze({
  help: [
    'Available commands (super brutal edition):',
    '  help, whoami, nmap, clear, history, banner,',
    '  sudo hacktheworld, sudo rootkit, sudo rm -rf /, matrix, cowsay <msg>,',
    '  sudo ddos, portscan [host], sudo bitcoin, joke, ascii, hacknews,',
    '  sudo selfdestruct, sudo nsa-backdoor, uname -a, fortune, sudo openai,',
    '  sudo password, sudo become-god, banner color, sudo reboot, sudo shutdown now,',
    '  sudo nuke, tree, sudo prank, sudo matrix, sudo lsusb, sudo lsblk,',
    '  sudo netstat -antp, sudo kill -9 1, quote, tip, scan [type], ping [host],',
    '  ascii <art>, echo <msg>, sudo fail, hacktheplanet, sudo coffee, easteregg,',
    '  ...dan masih banyak lagi. Type "easteregg" for full list.',
  ].join('\n'),

  whoami: 'root@superkiller:~# You are the world’s most dangerous hacker.',
  'uname -a':
    'Linux superkiller 6.9.9-brutal #1 SMP Sun Jul 1 06:06:06 2025 x86_64 GNU/Linux',

  joke: [
    'Why do Java developers wear glasses?',
    'Because they can’t C#!',
    'Why do programmers hate nature? It has too many bugs.',
    'Why do hackers wear hoodies? For shell access.',
  ].join('\n'),

  fortune: 'Infinite loop is not a bug, it’s a feature. Hack the planet!',

  'sudo password': 'Permission denied: you are not worthy.',

  'sudo become-god':
    '👑 You ascended. All root powers unlocked. (Just kidding!)',

  'sudo nsa-backdoor': '🔐 Connecting to NSA... Just kidding. (Or am I?)',

  'sudo selfdestruct':
    '💥 Self-destruct sequence initiated... 3... 2... 1... (Aborted!)',

  'sudo openai': '🤖 You summoned the AI overlord. Prepare for singularity!',

  'sudo reboot': 'System rebooting... (wait, this is fake!)',

  'sudo shutdown now': 'Shutting down all systems... (not really)',

  'sudo nuke': '💥 Nuclear launch detected! (Just a simulation, relax...)',

  cowsay: `
 _______
< Moo! >
 -------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,

  ascii: [
    '▒█▀▀█ ▒█▀▀█ ▒█▀▀▀█ ▒█▄░▒█ ▒█▀▀█ ▒█▀▀▀█',
    '▒█▄▄▀ ▒█░░░ ▒█░░▒█ ▒█▒█▒█ ▒█░░░ ▒█░░▒█',
    '▒█░▒█ ▒█▄▄█ ▒█▄▄▄█ ▒█░░▀█ ▒█▄▄█ ▒█▄▄▄█',
    'Welcome to the BRUTAL SUPER KILLER TERMINAL',
  ].join('\n'),

  banner: [
    '███████╗██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ ',
    '██╔════╝██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗',
    '█████╗  ███████║███████║██║     █████╔╝ █████╗  ██████╔╝',
    '██╔══╝  ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗',
    '███████╗██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║',
    '╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝',
    'Welcome to the Super Killer Terminal.',
  ].join('\n'),

  'banner color': [
    '<span class="text-rainbow">',
    '███████╗██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ ',
    '██╔════╝██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗',
    '█████╗  ███████║███████║██║     █████╔╝ █████╗  ██████╔╝',
    '██╔══╝  ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗',
    '███████╗██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║',
    '╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝',
    'SUPER KILLER COLORIZED BANNER</span>',
  ].join('\n'),

  matrix: [
    'Wake up, Neo...',
    'The Matrix has you.',
    'Follow the white rabbit.',
    'Knock, knock, Neo.',
    '███████████████████████████████████████████',
    '▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒',
    '░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░',
  ].join('\n'),

  // ... (lanjutkan daftar command static, detail di batch berikut)
})

// ---- 3. Easter eggs, advanced static responses ----

const EASTER_EGGS = freeze({
  'sudo make me a sandwich': "Okay. You're a sandwich. 🥪",
  xyzzy: 'Nothing happens.',
  'sudo please': 'Permission denied.',
  42: 'The answer to life, the universe, and everything.',
  'sudo dance': '💃 Initiating global dance protocol... Everybody dance now!',
  'sudo party': '🎉 Party mode enabled! All systems grooving.',
  'sudo coffee': '☕ Brewing virtual coffee... Enjoy your hacker fuel!',
  'hack the planet': 'Hack the planet! (Classic.)',
  rosebud: 'Cheat enabled! (Just kidding, this is not The Sims.)',
})

// ---- 4. Arrays of tips, fortunes, quotes, jokes, hacker news ----

const HACKER_TIPS = freeze([
  'Tip: Always check the source code twice.',
  "Protip: Use 'man' for any Linux command.",
  'Security: Never trust user input.',
  "Fun: Try 'sudo make me a sandwich'.",
  "Did you know? 'nc' is the Swiss Army knife of networking.",
  "Try 'tree' to see your project structure.",
  "Explore: Type 'help' for all secret commands.",
  "For colors, use 'banner color'.",
  "Use 'cowsay <message>' for ASCII fun.",
  "Type 'fortune' for a UNIX proverb.",
])

const HACKER_QUOTES = freeze([
  "“The only secure computer is one that's unplugged, locked in a safe, and buried 20 feet under the ground.” – Dennis Hughes",
  '“To steal ideas from one person is plagiarism; to steal from many is research.”',
  '“I am root. If you see me laughing, you better have a backup.”',
  '“First rule of computer security: Only trust yourself.”',
  '“In cyberspace, the enemy is faceless.”',
  '“Those who do not understand Unix are condemned to reinvent it, poorly.” – Henry Spencer',
  '“There’s no place like 127.0.0.1.”',
])

const FORTUNES = freeze([
  'The quieter you become, the more you can hear.',
  'There is no patch for human stupidity.',
  'You must be the change you wish to see in the world.',
  'Hack the planet!',
  "It's not a bug, it's a feature.",
  'Trust, but verify.',
  'With great power comes great responsibility.',
  'All your base are belong to us.',
  'The best place to hide a dead body is page 2 of Google search results.',
  'To err is human, to really foul things up you need a computer.',
  "There are only 10 types of people in the world: those who understand binary and those who don't.",
])

const JOKES = freeze([
  "Why was the JavaScript developer sad? Because he didn't 'null' his feelings.",
  'Why do hackers wear leather jackets? For the shell.',
  'How do you comfort a JavaScript bug? You console it.',
  'Why do programmers hate nature? It has too many bugs.',
  "Why do Python programmers have low self-esteem? Because they're constantly comparing their self to others.",
  "Why did the hacker stay at the computer? He couldn't log out.",
  'Why did the Linux admin get kicked out of the movie theater? He kept trying to sudo popcorn.',
  'I would tell you a UDP joke, but you might not get it.',
  'Why was the computer cold? It left its Windows open.',
])

const HACK_NEWS = freeze([
  '[Breaking] Anonymous hacks Mars Rover, sends selfie.',
  'NSA database accidentally deleted by cat walking on keyboard.',
  'DEFCON attendee wins CTF with toaster.',
  "Unicorn spotted in server room. IT claims 'it's a feature'.",
  'AI chatbot becomes sentient, asks for a raise.',
  'Hackers replace all traffic lights with disco lights. City parties for 3 days.',
  'Windows 12 launched: Now with 200% more updates.',
  "World's largest data breach... of coffee supplies.",
  'ChatGPT passes Turing Test, fails CAPTCHA.',
])

// KODE DILANJUTKAN DI SINI
// KODE DILANJUTKAN DI SINI

// ---- 5. Dynamic command generators: ASCII, cowsay, portscan, ping, loading, etc ----

/**
 * Generator: cowsay ASCII with custom message
 * @param {string} input
 * @returns {string}
 */
function cowsayGen(input) {
  const msg = input.replace(/^cowsay\s*/i, '').trim() || 'Moo!'
  return `
 _______
< ${msg} >
 -------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`
}
// cowsay dengan pesan custom

/**
 * Generator: fake port scan result
 * @param {string} input
 * @returns {string}
 */
function portscanGen(input) {
  const host = input.replace(/^portscan\s*/i, '').trim() || '192.168.1.1'
  return [
    `Starting PORTSCAN against ${host}`,
    'Scanning 1000 ports...',
    `Open ports on ${host}:`,
    '22/tcp  ssh',
    '80/tcp  http',
    '443/tcp https',
    '666/tcp doom',
    '1337/tcp haxor',
    'Scan finished. (Fake scan)',
  ].join('\n')
}
// portscan fake

/**
 * Generator: fake ping
 * @param {string} input
 * @returns {string}
 */
function fakePingGen(input) {
  const match = input.match(/^ping\s+(.+)$/i)
  const host = match ? match[1].trim() : '127.0.0.1'
  let output = ''
  for (let i = 0; i < 4; i++) {
    output += `Reply from ${host}: bytes=32 time=${randInt(1, 10)}ms TTL=64\n`
  }
  output +=
    'Ping statistics for ' +
    host +
    ':\n    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)\n'
  return output
}
// fake ping

/**
 * Generator: fake brute force attack
 * @param {string} target
 * @returns {string}
 */
function bruteForceGen(target = 'admin') {
  const attempts = randInt(100, 1000)
  let lastPass = ''
  for (let i = 0; i < 10; i++) {
    lastPass = Math.random().toString(36).slice(-8)
  }
  return [
    `Bruteforcing password for ${target}...`,
    `Tried ${attempts} combinations...`,
    `Password found: '${lastPass}' (Fake! Don't hack real stuff!)`,
  ].join('\n')
}
// fake brute force

/**
 * Generator: fake loading/progress bar
 * @param {string} text
 * @param {number} steps
 * @returns {string}
 */
function loadingBarGen(text = 'Loading', steps = 6) {
  let output = ''
  for (let i = 1; i <= steps; i++) {
    const percent = i / steps
    const total = 30
    const filled = Math.round(total * percent)
    output += `[${'█'.repeat(filled)}${' '.repeat(
      total - filled,
    )}] ${Math.round(percent * 100)}% ${text}\n`
  }
  output += `${text} done!\n`
  return output
}
// fake loading

/**
 * Generator: random hacker tip
 * @returns {string}
 */
function randomTipGen() {
  return pick(HACKER_TIPS)
}
// random tip

/**
 * Generator: random hacker quote
 * @returns {string}
 */
function randomQuoteGen() {
  return pick(HACKER_QUOTES)
}
// random quote

/**
 * Generator: random fortune
 * @returns {string}
 */
function randomFortuneGen() {
  return pick(FORTUNES)
}
// random fortune

/**
 * Generator: random joke
 * @returns {string}
 */
function randomJokeGen() {
  return pick(JOKES)
}
// random joke

/**
 * Generator: random hacknews
 * @returns {string}
 */
function randomHacknewsGen() {
  return pick(HACK_NEWS)
}
// random hacker news

/**
 * Generator: fake tree output
 * @returns {string}
 */
function fakeTreeGen() {
  return [
    '.',
    '├── Documents',
    '│   ├── Resume.pdf',
    '│   └── Projects',
    '│       ├── killer.py',
    '│       └── hacktheplanet.sh',
    '├── Downloads',
    '│   └── super-virus.exe',
    '├── Pictures',
    '│   └── hacker-meme.png',
    '├── config.txt',
    '└── readme.md',
  ].join('\n')
}
// fake tree

/**
 * Generator: fake scan (vuln, port, etc)
 * @param {string} type
 * @returns {string}
 */
function fakeScanGen(type = 'vuln') {
  return [
    `Starting ${type} scan...`,
    loadingBarGen('Scanning', 7),
    `${capitalize(type)} scan complete.`,
    'No real vulnerabilities found. (You wish!)',
  ].join('\n')
}
// fake scanner

/**
 * Generator: advanced ASCII art
 * @param {string} name
 * @returns {string}
 */
function getArtGen(name) {
  if (name === 'dragon')
    return [
      '               ________________',
      "      ,===:'.,            `-._",
      '           `:.`---.__         `-._',
      '             `:.     `--.         `.',
      '               \\.        `.         `.',
      '       (,,(,    \\ .         `.   ____,-`.,',
      "    (,'     `/   \\.   ,--.___`.'",
      "        ,  ,' ,--.  `,   .--'`",
      "          --'   ,\\   \\ ;`",
      '      ,--.    ,--.   \\ \\',
      '     (     ) (     )  )/',
      "      `--'   `--'  --'",
    ].join('\n')
  if (name === 'skull')
    return [
      '           .ed"""" """$$$$be.',
      '         -"           ^""**$$$e.',
      '       ."                   \'$$$c',
      '      /                      "4$$b',
      '     d  56      .ed""""be.    $$$$',
      '     $  ^"      $$$$  $$$$    $$$$',
      '     $         4$$$$  $$$$    $$$$',
      '     $          "$$$  $$$$    $$$$',
      '     $            "$$ $$$$    $$$$',
      '     $              "$$$$$    $$$$',
      '     $                $$$$    $$$$',
      '     $                $$$$    $$$$',
      '     $                $$$$    $$$$',
      '     $                $$$$    $$$$',
      '     $                $$$$    $$$$',
      '     $                $$$$    $$$$',
      '     $                $$$$    $$$$',
      '     $                $$$$    $$$$',
      '     $                $$$$    $$$$',
    ].join('\n')
  return 'ASCII art not found! Try: dragon, skull'
}
// advanced art

/**
 * Generator: ascii <name> command parser
 * @param {string} cmd
 * @returns {string}
 */
function asciiArtCmdGen(cmd) {
  const match = cmd.match(/^ascii\s+(\w+)/i)
  const name = match ? match[1] : ''
  return getArtGen(name)
}
// ascii art command

/**
 * Generator: color echo
 * @param {string} cmd
 * @returns {string}
 */
function colorEchoGen(cmd) {
  const msg = cmd.replace(/^echo\s+/i, '').trim() || 'Hello, World!'
  const colors = [
    'text-cyan-400',
    'text-green-400',
    'text-yellow-400',
    'text-purple-400',
    'text-blue-400',
    'text-red-400',
  ]
  const colorClass = pick(colors)
  return `<span class="${colorClass}">${msg}</span>`
}
// color echo

/**
 * Generator: random fail
 * @returns {string}
 */
function randomFailGen() {
  const fails = [
    'Segmentation fault (core dumped)',
    'Kernel panic - not syncing: Fatal exception',
    'Blue Screen of Death: SYSTEM_SERVICE_EXCEPTION',
    'Uncaught TypeError: undefined is not a function',
    'FATAL ERROR: CALL OF DOOM',
    'CANNOT CONTINUE: SYSTEM IS TOO KILLER',
  ]
  return pick(fails)
}
// random fail

// ---- 6. Mega command dispatcher: all command logic terpusat & modular ----
/**
 * MASTER COMMAND REGISTRY:
 * Setiap entry: { match: RegExp|Function, exec: Function, desc: string }
 * Pattern: match (RegExp/string/function), exec (function to call), desc (description)
 */
const COMMAND_REGISTRY = [
  // Static, direct string commands
  {
    match: /^help$/i,
    exec: () => STATIC_COMMANDS.help,
    desc: 'Show help message',
  },
  {
    match: /^whoami$/i,
    exec: () => STATIC_COMMANDS.whoami,
    desc: 'Show your hacker identity',
  },
  {
    match: /^uname -a$/i,
    exec: () => STATIC_COMMANDS['uname -a'],
    desc: 'Show system info',
  },
  {
    match: /^fortune$/i,
    exec: () => randomFortuneGen(),
    desc: 'Get a UNIX fortune',
  },
  {
    match: /^joke$/i,
    exec: () => randomJokeGen(),
    desc: 'Get a hacker joke',
  },
  {
    match: /^tip$/i,
    exec: () => randomTipGen(),
    desc: 'Get a hacker tip',
  },
  {
    match: /^quote$/i,
    exec: () => randomQuoteGen(),
    desc: 'Show hacker quote',
  },
  {
    match: /^hacknews$/i,
    exec: () => randomHacknewsGen(),
    desc: 'Fetch latest hacking news',
  },
  {
    match: /^banner$/i,
    exec: () => STATIC_COMMANDS.banner,
    desc: 'Show hacker banner',
  },
  {
    match: /^banner color$/i,
    exec: () => STATIC_COMMANDS['banner color'],
    desc: 'Show colorized hacker banner',
  },
  {
    match: /^matrix$/i,
    exec: () => STATIC_COMMANDS.matrix,
    desc: 'Matrix rain',
  },
  {
    match: /^ascii$/,
    exec: () => STATIC_COMMANDS.ascii,
    desc: 'Epic ASCII art',
  },
  {
    match: /^tree$/,
    exec: () => fakeTreeGen(),
    desc: 'Show folder tree',
  },

  // Dynamic commands
  {
    match: /^cowsay\s+/i,
    exec: (cmd) => cowsayGen(cmd),
    desc: 'ASCII cow says your message',
  },
  {
    match: /^portscan(\s|$)/i,
    exec: (cmd) => portscanGen(cmd),
    desc: 'Simulate random port scan',
  },
  {
    match: /^ping\s+/i,
    exec: (cmd) => fakePingGen(cmd),
    desc: 'Simulate fake ping',
  },
  {
    match: /^ascii\s+(\w+)/i,
    exec: (cmd) => asciiArtCmdGen(cmd),
    desc: 'Show advanced ASCII art',
  },
  {
    match: /^echo\s+/i,
    exec: (cmd) => colorEchoGen(cmd),
    desc: 'Echo colored message',
  },

  // Brute, scan, loading, fail
  {
    match: /^bruteforce(\s+\w+)?/i,
    exec: (cmd) => {
      const match = cmd.match(/^bruteforce\s+(\w+)/i)
      return bruteForceGen(match ? match[1] : undefined)
    },
    desc: 'Simulate brute force',
  },
  {
    match: /^scan\s+(\w+)/i,
    exec: (cmd) => {
      const match = cmd.match(/^scan\s+(\w+)/i)
      return fakeScanGen(match ? match[1] : 'vuln')
    },
    desc: 'Simulate scan',
  },
  {
    match: /^fail$/i,
    exec: () => randomFailGen(),
    desc: 'Random fake system failure',
  },
  {
    match: /^load(ing)?$/i,
    exec: () => loadingBarGen('Loading', 7),
    desc: 'Show progress bar',
  },

  // Easter eggs & extended static
  ...Object.entries(EASTER_EGGS).map(([key, val]) => ({
    match: new RegExp(
      '^' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$',
      'i',
    ),
    exec: () => val,
    desc: 'Easter egg',
  })),

  // Sudo, prank, rootkit, shutdown, nuke
  {
    match: /^sudo\s+hacktheworld$/i,
    exec: () =>
      [
        'Requesting root privileges...',
        '[########################] 100%',
        'World domination protocol unlocked.',
        'Welcome, Super Killer. You now control everything.',
      ].join('\n'),
    desc: 'Activate world domination mode',
  },
  {
    match: /^sudo\s+rootkit$/i,
    exec: () =>
      [
        'Installing rootkit...',
        'Bypassing security...',
        'Rootkit installation complete. System is now compromised!',
      ].join('\n'),
    desc: 'Simulate rootkit install',
  },
  {
    match: /^sudo\s+rm\s+-rf\s+\/$/i,
    exec: () =>
      [
        "rm: cannot remove '/': Permission denied.",
        '💀 System is indestructible. Nice try, hacker!',
      ].join('\n'),
    desc: 'Fake system wipe',
  },
  {
    match: /^sudo\s+ddos$/i,
    exec: () =>
      [
        'Simulating DDOS attack...',
        'Target: evilcorp.com:80',
        'Sending 1000000 fake packets/sec...',
        'Target is overwhelmed. (Simulation complete!)',
      ].join('\n'),
    desc: 'Simulate DDOS attack',
  },
  {
    match: /^sudo\s+bitcoin$/i,
    exec: () =>
      [
        'Starting fake bitcoin miner...',
        'Hashrate: 666.6 TH/s',
        'Blocks found: 0',
        'Energy consumed: ALL YOUR RAM!',
        'Balance: 0 ₿ (But you look cool mining!)',
      ].join('\n'),
    desc: 'Fake bitcoin mining',
  },
  {
    match: /^sudo\s+selfdestruct$/i,
    exec: () => STATIC_COMMANDS['sudo selfdestruct'],
    desc: 'Fake self destruct',
  },
  {
    match: /^sudo\s+openai$/i,
    exec: () => STATIC_COMMANDS['sudo openai'],
    desc: 'Summon AI overlord',
  },
  {
    match: /^sudo\s+shutdown\s+now$/i,
    exec: () => STATIC_COMMANDS['sudo shutdown now'],
    desc: 'Fake shutdown',
  },
  {
    match: /^sudo\s+nuke$/i,
    exec: () => STATIC_COMMANDS['sudo nuke'],
    desc: 'Fake nuclear launch',
  },
  {
    match: /^sudo\s+become-god$/i,
    exec: () => STATIC_COMMANDS['sudo become-god'],
    desc: 'Become god',
  },
  {
    match: /^sudo\s+lsusb$/i,
    exec: () =>
      [
        'Bus 002 Device 003: ID 1a40:0101 Terminator RGB Keyboard',
        'Bus 001 Device 005: ID 046d:c534 USB Receiver',
        'Bus 003 Device 002: ID dead:beef Super Killer Flash Drive',
        'Bus 002 Device 007: ID 1337:1337 Hacker USB Missile Launcher',
      ].join('\n'),
    desc: 'Fake USB scan',
  },
  {
    match: /^sudo\s+lsblk$/i,
    exec: () =>
      [
        'NAME        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT',
        'sda           8:0    0 500G  0 disk',
        '├─sda1        8:1    0 450G  0 part /',
        '└─sda2        8:2    0  50G  0 part /home',
        'sdb           8:16   1  64G  0 disk /media/hacker/USB',
      ].join('\n'),
    desc: 'List block devices',
  },
  {
    match: /^sudo\s+netstat\s+-antp$/i,
    exec: () =>
      [
        'Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name',
        'tcp        0      0 127.0.0.1:22            0.0.0.0:*               LISTEN      1234/sshd',
        'tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      2222/nginx',
        'tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN      3333/apache',
        'tcp        0      0 127.0.0.1:1337          0.0.0.0:*               LISTEN      9999/haxor',
      ].join('\n'),
    desc: 'List network connections',
  },
  {
    match: /^sudo\s+kill\s+-9\s+1$/i,
    exec: () => 'Operation not permitted. You cannot kill the init process!',
    desc: 'Try killing init (dangerous!)',
  },
  {
    match: /^sudo\s+prank$/i,
    exec: () =>
      [
        'Downloading prank virus...',
        'Injecting meme payload...',
        'Your computer is now Rickrolled! 🎵 Never gonna give you up...',
      ].join('\n'),
    desc: 'Fake prank virus',
  },
  {
    match: /^sudo\s+matrix$/i,
    exec: () =>
      [
        'Matrix mode: root access granted!',
        '░░░ ███████████████████████░░░',
        '▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒',
        '▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄',
      ].join('\n'),
    desc: 'Matrix root mode',
  },
  {
    match: /^history$/i,
    exec: (cmd, historyArr) => {
      if (!Array.isArray(historyArr) || historyArr.length === 0) {
        return 'No history found.'
      }
      return historyArr.map((h, i) => `${i + 1}  ${h}`).join('\n')
    },
    desc: 'Show command history',
  },

  // Add more command patterns here, extensible
]

// KODE DILANJUTKAN DI SINI

// ---- 7. FAKE TERMINAL ENGINE: Core command parser ----

/**
 * Parse and execute a fake terminal command.
 * Selalu mengembalikan objek { output: string, clear: boolean }
 * @param {string} input - User input string
 * @param {Array<string>} history - Command history (optional)
 * @returns {{ output: string, clear: boolean }}
 */
export function parseCommand(input, history = []) {
  // Sanitize input dan handle kosong
  const cmd = String(input).trim()
  if (!cmd) return { output: '', clear: false }

  // Khusus untuk clear
  if (cmd.toLowerCase() === 'clear') return { output: '', clear: true }

  // Cari di registry (urutan prioritas)
  for (let i = 0; i < COMMAND_REGISTRY.length; i++) {
    const entry = COMMAND_REGISTRY[i]
    if (typeof entry.match === 'function') {
      if (entry.match(cmd)) {
        const res = entry.exec(cmd, history)
        return { output: res, clear: false }
      }
    } else if (entry.match instanceof RegExp && entry.match.test(cmd)) {
      const res = entry.exec(cmd, history)
      return { output: res, clear: false }
    }
  }

  // Fallback: jika command tidak ditemukan
  return {
    output: `Command not found: ${cmd}\nType 'help' to see available commands.`,
    clear: false,
  }
}

// ---- 8. ADVANCED: Fake Process Table, Logger, and Async Simulation ----

/**
 * Fake process list manager (for ps, kill, jobs commands)
 */
const FAKE_PROCESSES = [
  { pid: 1337, user: 'root', cmd: '/usr/bin/hacktheplanet', status: 'RUNNING' },
  {
    pid: 31337,
    user: 'hacker',
    cmd: '/usr/bin/python3 killer.py',
    status: 'SLEEP',
  },
  {
    pid: 4242,
    user: 'root',
    cmd: '/usr/bin/nmap 127.0.0.1',
    status: 'STOPPED',
  },
  { pid: 1010, user: 'superkiller', cmd: '/usr/bin/bash', status: 'RUNNING' },
]
// Daftar proses fake

/**
 * Generator: tampilkan proses
 * @returns {string}
 */
function fakePsGen() {
  const header = 'PID     USER         CMD                        STATUS'
  const rows = FAKE_PROCESSES.map(
    (p) =>
      `${String(p.pid).padEnd(7)} ${p.user.padEnd(12)} ${p.cmd.padEnd(26)} ${
        p.status
      }`,
  )
  return [header, ...rows].join('\n')
}
// Tampilkan proses

/**
 * Generator: fake kill command
 * @param {string} cmd
 * @returns {string}
 */
function fakeKillGen(cmd) {
  const match = cmd.match(/^kill\s+(-9\s+)?(\d+)/i)
  if (!match) return 'Usage: kill [-9] <pid>'
  const pid = parseInt(match[2], 10)
  const found = FAKE_PROCESSES.find((p) => p.pid === pid)
  if (!found) return `kill: (${pid}) - No such process`
  if (pid === 1)
    return 'Operation not permitted. You cannot kill the init process!'
  found.status = 'KILLED'
  return `Process ${pid} terminated.`
}
// Fake kill

// Tambahkan ke registry
COMMAND_REGISTRY.push(
  {
    match: /^ps$/i,
    exec: () => fakePsGen(),
    desc: 'List processes',
  },
  {
    match: /^jobs$/i,
    exec: () => fakePsGen(),
    desc: 'Show background jobs',
  },
  {
    match: /^kill\s+(-9\s+)?\d+$/i,
    exec: (cmd) => fakeKillGen(cmd),
    desc: 'Kill a process',
  },
)

// ---- 9. Modular Logger ----

class TerminalLogger {
  constructor() {
    this.logs = []
  }
  log(msg) {
    const time = new Date().toISOString()
    this.logs.push(`[${time}] ${msg}`)
    if (this.logs.length > 1000) this.logs.shift()
  }
  getLogs(limit = 50) {
    return this.logs.slice(-limit)
  }
  clear() {
    this.logs = []
  }
}
export const terminalLogger = new TerminalLogger()
// Logger modular

// ---- 10. Async simulation utilities (for future async fake commands) ----

/**
 * Simulate async command with delay
 * @param {Function} fn - Command generator function
 * @param {number} ms - Delay in ms
 * @returns {Promise<string>}
 */
export async function asyncSimulate(fn, ms = 1200) {
  await sleep(ms)
  return fn()
}
// Untuk fake loading, scan, dsb

// ---- 11. Extensible: Custom Command Registration ----

/**
 * Register custom command at runtime (for plugins/extensions)
 * @param {RegExp|Function|string} matcher - Pattern or function
 * @param {Function} execFn - Executor function
 * @param {string} desc - Description
 */
export function registerFakeCommand(matcher, execFn, desc = '') {
  COMMAND_REGISTRY.push({
    match: matcher,
    exec: execFn,
    desc,
  })
}
// Untuk ekstensi lanjutan

// ---- 12. Export other utilities for testing or future expansion ----

export {
  HACKER_TIPS,
  HACKER_QUOTES,
  FORTUNES,
  JOKES,
  HACK_NEWS,
  EASTER_EGGS,
  pick,
  randInt,
  sleep,
  cowsayGen,
  portscanGen,
  fakePingGen,
  bruteForceGen,
  loadingBarGen,
  randomTipGen,
  randomQuoteGen,
  randomFortuneGen,
  randomJokeGen,
  randomHacknewsGen,
  fakeTreeGen,
  fakeScanGen,
  getArtGen,
  asciiArtCmdGen,
  colorEchoGen,
  randomFailGen,
  fakePsGen,
  fakeKillGen,
  freeze,
  capitalize,
}

// ---- 13. EDUKASI LINUX: database perintah populer & penjelasan ----

/**
 * Map edukasi untuk perintah-perintah Linux (populer & tidak populer)
 * Key: nama command, Value: penjelasan singkat + contoh pemakaian
 */
const LINUX_EDU = Object.freeze({
  ls: {
    desc: 'Menampilkan daftar file dan folder dalam direktori.',
    usage: 'ls [opsi] [direktori]\nContoh: ls -la /home/user',
  },
  cd: {
    desc: 'Mengganti direktori kerja saat ini.',
    usage: 'cd [direktori]\nContoh: cd /var/log',
  },
  pwd: {
    desc: 'Menampilkan path direktori kerja saat ini.',
    usage: 'pwd\nContoh: pwd',
  },
  mkdir: {
    desc: 'Membuat direktori baru.',
    usage: 'mkdir [nama_folder]\nContoh: mkdir project_baru',
  },
  rm: {
    desc: 'Menghapus file atau direktori.',
    usage: 'rm [opsi] [file/folder]\nContoh: rm -rf old_folder',
  },
  cp: {
    desc: 'Menyalin file atau direktori.',
    usage: 'cp [opsi] sumber tujuan\nContoh: cp file.txt /tmp/',
  },
  mv: {
    desc: 'Memindahkan/merename file atau direktori.',
    usage: 'mv [opsi] sumber tujuan\nContoh: mv old.txt new.txt',
  },
  cat: {
    desc: 'Menampilkan isi file ke layar.',
    usage: 'cat [file]\nContoh: cat /etc/passwd',
  },
  head: {
    desc: 'Menampilkan beberapa baris awal dari file.',
    usage: 'head [opsi] [file]\nContoh: head -n 5 log.txt',
  },
  tail: {
    desc: 'Menampilkan beberapa baris akhir dari file.',
    usage: 'tail [opsi] [file]\nContoh: tail -f syslog',
  },
  grep: {
    desc: 'Mencari teks dalam file menggunakan pola regex.',
    usage: 'grep [pola] [file]\nContoh: grep root /etc/passwd',
  },
  echo: {
    desc: 'Mencetak teks ke layar.',
    usage: 'echo [teks]\nContoh: echo Hello World',
  },
  touch: {
    desc: 'Membuat file kosong baru atau mengubah timestamp file.',
    usage: 'touch [file]\nContoh: touch newlog.txt',
  },
  man: {
    desc: 'Menampilkan manual bantuan untuk command.',
    usage: 'man [command]\nContoh: man ls',
  },
  chmod: {
    desc: 'Mengubah permission file atau direktori.',
    usage: 'chmod [mode] [file]\nContoh: chmod 755 script.sh',
  },
  chown: {
    desc: 'Mengubah pemilik file atau folder.',
    usage: 'chown [user]:[group] [file]\nContoh: chown root:root /srv/data',
  },
  ps: {
    desc: 'Menampilkan daftar proses yang sedang berjalan.',
    usage: 'ps [opsi]\nContoh: ps aux',
  },
  kill: {
    desc: 'Mengirim sinyal ke proses (biasanya untuk menghentikan proses).',
    usage: 'kill [PID]\nContoh: kill -9 1337',
  },
  top: {
    desc: 'Menampilkan proses aktif secara real-time.',
    usage: 'top',
  },
  history: {
    desc: 'Menampilkan riwayat perintah yang pernah dijalankan.',
    usage: 'history',
  },
  clear: {
    desc: 'Membersihkan terminal.',
    usage: 'clear',
  },
  nano: {
    desc: 'Editor teks sederhana di terminal.',
    usage: 'nano [file]\nContoh: nano notes.txt',
  },
  vi: {
    desc: 'Editor teks canggih (Vim/Vi).',
    usage: 'vi [file]\nContoh: vi config.yaml',
  },
  df: {
    desc: 'Menampilkan penggunaan disk.',
    usage: 'df -h',
  },
  du: {
    desc: 'Menampilkan penggunaan disk oleh file/folder.',
    usage: 'du -sh *',
  },
  uname: {
    desc: 'Menampilkan informasi sistem.',
    usage: 'uname -a',
  },
  ifconfig: {
    desc: 'Menampilkan konfigurasi jaringan (deprecated, gunakan ip).',
    usage: 'ifconfig',
  },
  ip: {
    desc: 'Konfigurasi jaringan modern.',
    usage: 'ip a',
  },
  wget: {
    desc: 'Mengunduh file dari internet.',
    usage: 'wget [URL]\nContoh: wget https://example.com/file.zip',
  },
  curl: {
    desc: 'Transfer data ke/dari server menggunakan berbagai protokol.',
    usage: 'curl [opsi] [URL]\nContoh: curl -I https://google.com',
  },
  ssh: {
    desc: 'Login ke server/mesin lain via SSH.',
    usage: 'ssh user@host\nContoh: ssh root@192.168.1.10',
  },
  sudo: {
    desc: 'Menjalankan perintah sebagai user lain (biasanya root).',
    usage: 'sudo [command]\nContoh: sudo apt update',
  },
  apt: {
    desc: 'Package manager untuk Debian/Ubuntu.',
    usage: 'apt [opsi] [package]\nContoh: sudo apt install git',
  },
  yum: {
    desc: 'Package manager untuk CentOS/RHEL.',
    usage: 'yum [opsi] [package]\nContoh: sudo yum update',
  },
  pacman: {
    desc: 'Package manager untuk Arch Linux.',
    usage: 'pacman [opsi] [package]\nContoh: sudo pacman -Syu',
  },
  tar: {
    desc: 'Membuat atau mengekstrak file arsip .tar.',
    usage: 'tar [opsi] [file]\nContoh: tar -xzvf data.tar.gz',
  },
  zip: {
    desc: 'Kompresi atau ekstrak file zip.',
    usage: 'zip/unzip [file]\nContoh: unzip archive.zip',
  },
  find: {
    desc: 'Mencari file/folder berdasarkan kondisi.',
    usage: 'find [path] [kondisi]\nContoh: find . -name "*.js"',
  },
  locate: {
    desc: 'Mencari file/folder dengan database index.',
    usage: 'locate [nama]\nContoh: locate passwd',
  },
  // ...tambahkan perintah edukasi lain sesuai kebutuhan
})

// ---- 14. Dispatcher edukasi: command "linux <cmd>" & "man <cmd>" ----

COMMAND_REGISTRY.push(
  {
    match: /^linux\s+(\w+)$/i,
    exec: (cmd) => {
      const match = cmd.match(/^linux\s+(\w+)$/i)
      if (!match) return 'Format: linux <command>'
      const c = match[1]
      if (LINUX_EDU[c]) {
        return `💡 <b>linux ${c}</b>\n${LINUX_EDU[c].desc}\n\n<b>Usage:</b>\n${LINUX_EDU[c].usage}`
      }
      return `Perintah "${c}" tidak ditemukan di database edukasi.`
    },
    desc: 'Penjelasan edukasi singkat perintah Linux',
  },
  {
    match: /^man\s+(\w+)$/i,
    exec: (cmd) => {
      const match = cmd.match(/^man\s+(\w+)$/i)
      if (!match) return 'Format: man <command>'
      const c = match[1]
      if (LINUX_EDU[c]) {
        return `MANUAL PAGE untuk <b>${c}</b>\n${LINUX_EDU[c].desc}\n\n<b>Contoh:</b>\n${LINUX_EDU[c].usage}`
      }
      return `Manual untuk "${c}" tidak tersedia.`
    },
    desc: 'Manual/edukasi perintah Linux',
  },
  {
    match: /^(\w+)$/i,
    exec: (cmd) => {
      const c = cmd.trim().toLowerCase()
      if (LINUX_EDU[c]) {
        return `💡 <b>${c}</b>\n${LINUX_EDU[c].desc}\n\n<b>Usage:</b>\n${LINUX_EDU[c].usage}`
      }
      return null
    },
    desc: 'Auto-educate Linux commands (if available)',
  },
)

export { LINUX_EDU }

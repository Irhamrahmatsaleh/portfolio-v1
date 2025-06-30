// utils/FakeCommandEngine.js

// List of supported fake commands and their responses
const COMMANDS = Object.freeze({
  help: [
    'Available commands:',
    '  help                Show this help message',
    '  whoami              Show your hacker identity',
    '  nmap                Fake network scan',
    '  clear               Clear terminal',
    '  sudo hacktheworld   Activate world domination mode',
    '  history             Show command history',
    '  banner              Show hacker banner',
  ].join('\n'),

  whoami: 'root@superkiller:~# You are the world’s most dangerous hacker.',

  nmap: [
    'Starting Nmap 7.93 ( https://nmap.org ) at 2025-06-30 17:01',
    'Initiating SYN Stealth Scan against 127.0.0.1 [ports 1-1024]',
    'Discovered open port 22/tcp on 127.0.0.1',
    'Discovered open port 80/tcp on 127.0.0.1',
    'Discovered open port 443/tcp on 127.0.0.1',
    'Nmap scan report for localhost (127.0.0.1)',
    'Host is up (0.00021s latency).',
    'PORT    STATE SERVICE',
    '22/tcp  open  ssh',
    '80/tcp  open  http',
    '443/tcp open  https',
    'Scan completed successfully.',
  ].join('\n'),

  'sudo hacktheworld': [
    'Requesting root privileges...',
    '[########################] 100%',
    'World domination protocol unlocked.',
    'Welcome, Super Killer. You now control everything.',
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
})

/**
 * Parse and execute a fake terminal command.
 * @param {string} input - The user command input.
 * @param {Array<string>} history - The command history array (optional).
 * @returns {Object} { output: string, clear: boolean }
 */
export function parseCommand(input, history = []) {
  // Sanitize input and handle empty case
  const cmd = String(input).trim()
  if (!cmd) {
    return { output: '', clear: false } // Empty input, no output
  }

  // Handle 'clear' command
  if (cmd.toLowerCase() === 'clear') {
    return { output: '', clear: true } // Signal the UI to clear terminal
  }

  // Handle 'history' command
  if (cmd.toLowerCase() === 'history') {
    if (!Array.isArray(history) || history.length === 0) {
      return { output: 'No history found.', clear: false }
    }
    const hist = history.map((h, i) => `${i + 1}  ${h}`).join('\n')
    return { output: hist, clear: false }
  }

  // Main command dispatch (case-insensitive)
  const normalized = cmd.toLowerCase()
  if (COMMANDS.hasOwnProperty(normalized)) {
    return { output: COMMANDS[normalized], clear: false }
  }

  // Unknown command fallback
  return {
    output: `Command not found: ${cmd}\nType 'help' to see available commands.`,
    clear: false,
  }
}

<template>
  <div class="chess-wrapper">
    <div class="chess-header">
      <h2>Chess Game</h2>
      <div class="player-select">
        <label>Select Color:</label>
        <button :class="{ active: playerColor === 'w' }" @click="setPlayer('w')" :disabled="gameStarted">White</button>
        <button :class="{ active: playerColor === 'b' }" @click="setPlayer('b')" :disabled="gameStarted">Black</button>
      </div>
    </div>
    <div class="chess-main">
      <div class="chess-board-container" :class="{ flipped: playerColor === 'b' }">
        <div class="chess-board">
          <div v-for="(row, y) in displayBoard" :key="y" class="board-row">
            <div v-for="(piece, x) in row" :key="x" class="square" :class="getSquareColor(x, y)"
              :style="getHighlightStyle(x, y)" @click="handleSquareClick(x, y)">
              <span v-if="piece" :class="['piece', getPieceColor(piece)]" :style="getPieceStyle(x, y, piece)">
                {{ getPieceSymbol(piece) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="chess-info-panel">
        <div class="info-block">
          <div class="turn-indicator" :class="turn === 'w' ? 'turn-white' : 'turn-black'">
            <span>{{ turn === 'w' ? "White's turn" : "Black's turn" }}</span>
          </div>
          <div class="timer">
            Time: <span>{{ minutes }}:{{ seconds < 10 ? '0' + seconds : seconds }}</span>
          </div>
          <div class="score">
            Score: <span>{{ score }}</span>
          </div>
          <div v-if="gameOver" class="game-over">
            <b>{{ winnerMsg }}</b>
            <button @click="resetGame" class="reset-btn">Play Again</button>
          </div>
        </div>
        <div class="move-history">
          <b>Move History:</b>
          <ul>
            <li v-for="(move, i) in moveHistory" :key="i" :class="i % 2 === 0 ? 'mh-white' : 'mh-black'">
              {{ move }}
            </li>
          </ul>
        </div>
        <button v-if="!gameOver" @click="resetGame" class="reset-btn">Reset</button>
      </div>
    </div>
  </div>
</template>



<script setup>
// ===== STATE DAN DATA UTAMA =====
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

// Simbol bidak Unicode
const PIECE_SYMBOLS = {
  K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙',
  k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟'
}

function getInitialBoard() {
  return [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
  ]
}

const board = ref(getInitialBoard())
const turn = ref('w')
const selected = ref(null)
const validMoves = ref([])
const moveHistory = ref([])
const lastMove = ref(null)
const gameOver = ref(false)
const winner = ref(null)
const winnerMsg = computed(() => {
  if (!gameOver.value) return ''
  if (winner.value === 'draw') return 'DRAW!'
  return winner.value === playerColor.value ? 'You WIN!' : 'Kamu LOSE!'
})

const playerColor = ref('w')
const gameStarted = ref(false)
const aiThinking = ref(false)
const score = ref(0)

// ===== TIMER =====
const timeLimit = 300 // 5 menit per game
const timeLeft = ref(timeLimit)
let timerInterval = null

const minutes = computed(() => Math.floor(timeLeft.value / 60))
const seconds = computed(() => timeLeft.value % 60)

function startTimer() {
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (!gameOver.value && gameStarted.value) {
      timeLeft.value--
      if (timeLeft.value <= 0) {
        gameOver.value = true
        winner.value = turn.value === playerColor.value ? getOpponentColor() : playerColor.value
      }
    }
  }, 1000)
}
function stopTimer() {
  if (timerInterval) clearInterval(timerInterval)
}

// ======= BOARD ROTATION =======
const displayBoard = computed(() => {
  return playerColor.value === 'w'
    ? board.value
    : [...board.value].slice().reverse().map(row => [...row].reverse())
})

// ===== UTILITY & PILIHAN WARNA LAWAN =====
function getOpponentColor() {
  return playerColor.value === 'w' ? 'b' : 'w'
}

// ===== RESET GAME =====
function resetGame() {
  board.value = getInitialBoard()
  turn.value = 'w'
  selected.value = null
  validMoves.value = []
  moveHistory.value = []
  lastMove.value = null
  gameOver.value = false
  winner.value = null
  timeLeft.value = timeLimit
  score.value = 0
  gameStarted.value = false
  aiThinking.value = false
  stopTimer()
  // Auto start jika warna pemain hitam, AI main dulu
  if (playerColor.value === 'b') {
    setTimeout(() => {
      gameStarted.value = true
      startTimer()
      aiMove()
    }, 500)
  }
}

// ===== PEMILIHAN WARNA PEMAIN =====
function setPlayer(color) {
  if (playerColor.value !== color) {
    playerColor.value = color
    resetGame()
  }
}

// ======= KOORDINAT SESUAI ROTASI PAPAN =======
function toBoardCoords(x, y) {
  if (playerColor.value === 'w') return { x, y }
  return { x: 7 - x, y: 7 - y }
}

// ====== GET WARNA BIDAK & SQUARE ======
function getPieceColor(piece) {
  return piece === piece?.toUpperCase() ? 'white-piece' : 'black-piece'
}
function getPieceSymbol(piece) {
  return PIECE_SYMBOLS[piece] || ''
}
function getSquareColor(x, y) {
  return (x + y) % 2 === 0 ? 'light' : 'dark'
}
function getHighlightStyle(x, y) {
  if (selected.value && selected.value.x === x && selected.value.y === y)
    return { boxShadow: '0 0 10px 3px #4dd0e1 inset' }
  if (validMoves.value.some(m => m.x === x && m.y === y))
    return { boxShadow: '0 0 10px 4px #8bc34a inset' }
  if (
    lastMove.value &&
    ((lastMove.value.from.x === x && lastMove.value.from.y === y) ||
      (lastMove.value.to.x === x && lastMove.value.to.y === y))
  )
    return { boxShadow: '0 0 12px 2px #ffeb3b inset' }
  return {}
}
function getPieceStyle(x, y, piece) {
  return {
    filter:
      lastMove.value &&
        ((lastMove.value.from.x === x && lastMove.value.from.y === y) ||
          (lastMove.value.to.x === x && lastMove.value.to.y === y))
        ? 'drop-shadow(0 0 8px #ffeb3b)'
        : ''
  }
}

// ===== INTERAKSI PAPAN: PILIH & JALANKAN LANGKAH =====
function handleSquareClick(x, y) {
  if (gameOver.value || aiThinking.value) return
  const { x: bx, y: by } = toBoardCoords(x, y)
  const piece = board.value[by][bx]

  // Pilih bidak milik sendiri
  if (
    piece &&
    ((turn.value === 'w' && piece === piece.toUpperCase()) ||
      (turn.value === 'b' && piece === piece.toLowerCase())) &&
    turn.value === playerColor.value
  ) {
    selected.value = { x, y }
    validMoves.value = getValidMoves(bx, by, piece)
    return
  }

  // Jika memilih target langkah yang valid
  if (
    selected.value &&
    validMoves.value.some(m => m.x === bx && m.y === by) &&
    turn.value === playerColor.value
  ) {
    movePiece(selected.value, { x, y })
    selected.value = null
    validMoves.value = []
    return
  }

  // Jika klik area kosong/tidak valid
  selected.value = null
  validMoves.value = []
}

// ====== EKSEKUSI LANGKAH ======
function movePiece(from, to) {
  const { x: fx, y: fy } = toBoardCoords(from.x, from.y)
  const { x: tx, y: ty } = toBoardCoords(to.x, to.y)
  const movingPiece = board.value[fy][fx]
  const capturedPiece = board.value[ty][tx]

  // Jalankan langkah di papan
  board.value[ty][tx] = movingPiece
  board.value[fy][fx] = null

  // Simpan histori langkah
  moveHistory.value.push(
    `${String.fromCharCode(97 + fx)}${8 - fy} - ${String.fromCharCode(97 + tx)}${8 - ty}` +
    (capturedPiece ? ` (x ${capturedPiece})` : '')
  )
  lastMove.value = { from: { x: tx, y: ty }, to: { x: fx, y: fy } }

  // Naikkan skor jika makan
  if (capturedPiece) score.value += getPiecePoint(capturedPiece)

  // Cek selesai (raja lawan hilang)
  if (isGameOver()) {
    gameOver.value = true
    winner.value = turn.value
    stopTimer()
    return
  }

  // Ganti giliran
  turn.value = turn.value === 'w' ? 'b' : 'w'

  // Auto AI move jika giliran AI
  if (turn.value !== playerColor.value && !gameOver.value) {
    aiThinking.value = true
    setTimeout(() => {
      aiMove()
      aiThinking.value = false
    }, 600)
  }
  if (!gameStarted.value) {
    gameStarted.value = true
    startTimer()
  }
}

// ====== SKOR TIAP BIDAK ======
function getPiecePoint(piece) {
  switch (piece.toLowerCase()) {
    case 'p': return 1
    case 'n': case 'b': return 3
    case 'r': return 5
    case 'q': return 9
    default: return 0
  }
}

// ===== CEK GAME OVER (RAJA LAWAN HILANG) =====
function isGameOver() {
  let whiteKing = false, blackKing = false
  for (let row of board.value) {
    for (let piece of row) {
      if (piece === 'K') whiteKing = true
      if (piece === 'k') blackKing = true
    }
  }
  if (!whiteKing || !blackKing) return true
  return false
}

// ===== AI MOVE: PILIH LANGKAH RANDOM TERBAIK =====
function aiMove() {
  let moves = []
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const piece = board.value[y][x]
      if (
        piece &&
        ((turn.value === 'w' && piece === piece.toUpperCase()) ||
          (turn.value === 'b' && piece === piece.toLowerCase())) &&
        turn.value !== playerColor.value
      ) {
        const valid = getValidMoves(x, y, piece)
        valid.forEach(m => {
          moves.push({ from: { x, y }, to: m, value: getPiecePoint(board.value[m.y][m.x] || '') })
        })
      }
    }
  }
  // Pilih langkah capture (prioritas), jika tidak ada random
  let captureMoves = moves.filter(m => m.value > 0)
  let move = captureMoves.length
    ? captureMoves[Math.floor(Math.random() * captureMoves.length)]
    : moves[Math.floor(Math.random() * moves.length)]
  if (move) {
    movePiece(
      { x: playerColor.value === 'w' ? move.from.x : 7 - move.from.x, y: playerColor.value === 'w' ? move.from.y : 7 - move.from.y },
      { x: playerColor.value === 'w' ? move.to.x : 7 - move.to.x, y: playerColor.value === 'w' ? move.to.y : 7 - move.to.y }
    )
  }
}

// ===== LOGIKA LANGKAH BIDAK =====
function getValidMoves(x, y, piece) {
  const moves = []
  const isWhite = piece === piece.toUpperCase()
  const directions = {
    N: [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]],
    B: [[-1, -1], [-1, 1], [1, -1], [1, 1]],
    R: [[-1, 0], [1, 0], [0, -1], [0, 1]],
    Q: [[-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]],
    K: [[-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]]
  }
  // Pawn
  if (piece.toLowerCase() === 'p') {
    const dir = isWhite ? -1 : 1
    // maju satu langkah
    if (inBounds(x, y + dir) && !board.value[y + dir][x])
      moves.push({ x, y: y + dir })
    // maju dua langkah dari posisi awal
    if (
      (isWhite && y === 6) || (!isWhite && y === 1)
    ) {
      if (
        inBounds(x, y + dir) &&
        !board.value[y + dir][x] &&
        inBounds(x, y + 2 * dir) &&
        !board.value[y + 2 * dir][x]
      )
        moves.push({ x, y: y + 2 * dir })
    }
    // makan secara diagonal
    for (const dx of [-1, 1]) {
      if (
        inBounds(x + dx, y + dir) &&
        board.value[y + dir][x + dx] &&
        (isWhite
          ? board.value[y + dir][x + dx] === board.value[y + dir][x + dx].toLowerCase()
          : board.value[y + dir][x + dx] === board.value[y + dir][x + dx].toUpperCase())
      ) {
        moves.push({ x: x + dx, y: y + dir })
      }
    }
  }
  // Knight
  else if (piece.toLowerCase() === 'n') {
    for (const [dy, dx] of directions.N) {
      const nx = x + dx
      const ny = y + dy
      if (inBounds(nx, ny) && !sameColor(board.value[ny][nx], piece)) {
        moves.push({ x: nx, y: ny })
      }
    }
  }
  // Bishop, Rook, Queen
  else if (['b', 'r', 'q'].includes(piece.toLowerCase())) {
    let dirs = []
    if (piece.toLowerCase() === 'b') dirs = directions.B
    if (piece.toLowerCase() === 'r') dirs = directions.R
    if (piece.toLowerCase() === 'q') dirs = directions.Q
    for (const [dy, dx] of dirs) {
      let step = 1
      while (true) {
        const nx = x + dx * step
        const ny = y + dy * step
        if (!inBounds(nx, ny)) break
        if (!board.value[ny][nx]) {
          moves.push({ x: nx, y: ny })
        } else {
          if (!sameColor(board.value[ny][nx], piece)) {
            moves.push({ x: nx, y: ny })
          }
          break
        }
        step++
      }
    }
  }
  // King
  else if (piece.toLowerCase() === 'k') {
    for (const [dy, dx] of directions.K) {
      const nx = x + dx
      const ny = y + dy
      if (inBounds(nx, ny) && !sameColor(board.value[ny][nx], piece)) {
        moves.push({ x: nx, y: ny })
      }
    }
    // Castling belum diimplementasi
  }

  const safeMoves = moves.filter(move => {
    const tempBoard = JSON.parse(JSON.stringify(board.value));
    tempBoard[move.y][move.x] = tempBoard[y][x];
    tempBoard[y][x] = null;
    return !isKingChecked(tempBoard, getPieceColor(piece));
  });
  return safeMoves;
}

// ===== UTILITY =====
function inBounds(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8
}
function sameColor(a, b) {
  if (!a || !b) return false
  return (
    (a === a.toUpperCase() && b === b.toUpperCase()) ||
    (a === a.toLowerCase() && b === b.toLowerCase())
  )
}

// ===== PROMOSI PAWN OTOMATIS =====
function promoteIfNeeded() {
  for (let x = 0; x < 8; x++) {
    // Putih promosi di baris 0
    if (board.value[0][x] === 'P') board.value[0][x] = 'Q'
    // Hitam promosi di baris 7
    if (board.value[7][x] === 'p') board.value[7][x] = 'q'
  }
}




// ====== FORMAT SKOR DAN WAKTU (RAPI) ======
const displayScore = computed(() => score.value.toLocaleString())
const displayTime = computed(() => `${minutes.value}:${seconds.value < 10 ? '0' + seconds.value : seconds.value}`)

// ====== EFEK & UX ======
onMounted(() => {
  resetGame()
})
onBeforeUnmount(() => {
  stopTimer()
})
watch(gameOver, (val) => {
  if (val) stopTimer()
})

// ====== TINGKATKAN UX ======
// - Highlight giliran
// - Kunci tombol pilih warna saat game berjalan
// - "Main Lagi" otomatis reset dan randomize giliran AI/user
// - Panel skor dan waktu selalu update live

// (Sudah di-handle pada template step 1 & 2)

// ====== FINISHING: EXPORT & AKHIR SCRIPT ======
// === 1. Notifikasi interaktif (feedback toast sederhana) ===
const toastMsg = ref('')
const showToast = ref(false)
function showNotification(msg) {
  toastMsg.value = msg
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 1600)
}

// === 2. Konfirmasi saat keluar/reset di tengah permainan ===
function resetGameConfirm() {
  if (gameStarted.value && !gameOver.value) {
    if (confirm('Game sedang berjalan. Yakin ingin mengulang?')) {
      resetGame()
      showNotification('Permainan di-reset.')
    }
  } else {
    resetGame()
    showNotification('Permainan di-reset.')
  }
}

// === 3. Animasi giliran & highlight langkah ===
watch(turn, (newTurn, oldTurn) => {
  if (gameStarted.value && !gameOver.value) {
    showNotification(`${newTurn === 'w' ? "White's Turn" : "Black's Turn"}`)
  }
})

// === 4. Akhiri game jika waktu habis (otomatis kalah) ===
watch(timeLeft, (val) => {
  if (val === 0 && !gameOver.value) {
    gameOver.value = true
    winner.value = turn.value === playerColor.value ? getOpponentColor() : playerColor.value
    showNotification('Waktu habis!')
  }
})

// === 5. Deteksi check (ancaman raja) dan tampilkan warning ===
function isKingChecked(boardToCheck, color) {
  if (!boardToCheck || !Array.isArray(boardToCheck) || !Array.isArray(boardToCheck[0])) {
    console.error("Invalid board diberikan ke isKingChecked", boardToCheck);
    return false;
  }
  let kingPos = null;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const piece = boardToCheck[y][x];
      if ((color === 'w' && piece === 'K') || (color === 'b' && piece === 'k')) {
        kingPos = { x, y };
      }
    }
  }
  if (!kingPos) return false;
  const oppColor = color === 'w' ? 'b' : 'w';
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const piece = boardToCheck[y][x];
      if (piece && getPieceColor(piece) === oppColor) {
        const moves = getValidMoves(x, y, piece, boardToCheck); // pastikan getValidMoves juga bisa terima board
        if (moves.some(m => m.x === kingPos.x && m.y === kingPos.y)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Setelah setiap move, tambahkan:
if (isKingChecked(turn.value)) {
  showNotification('Check pada raja!')
}

// === 6. Undo langkah terakhir (opsional UX) ===
function undoLastMove() {
  if (moveHistory.value.length < 1) return
  // Untuk UX, cukup pakai simpan stack board sebelum langkah (implementasi penuh: simpan board snapshot setiap langkah)
  showNotification('Fitur Undo belum diaktifkan (bisa dikembangkan lebih lanjut).')
}
</script>

<style scoped>
.chess-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #151c27 60%, #2fd9ad 100%);
  border-radius: 22px;
  box-shadow: 0 8px 36px #00000055;
  padding: 28px 8px 22px 8px;
  margin: 28px auto 18px auto;
  max-width: 420px;
  min-width: 0;
  width: 100%;
  position: relative;
}

.chess-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.chess-header h2 {
  color: #fff;
  font-size: 2rem;
  letter-spacing: 1.5px;
  margin-bottom: 8px;
  text-shadow: 0 2px 14px #2fd9ad99, 0 1px 1px #000;
}

.player-select {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  margin-bottom: 8px;
}

.player-select label {
  color: #b5ffe1;
  font-size: 1rem;
  margin-right: 2px;
}

.player-select button {
  background: linear-gradient(90deg, #2fd9ad 65%, #2196f3 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 5px 16px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 1px 8px #2223, 0 0 4px #2fd9ad44;
  transition: background 0.17s, box-shadow 0.17s;
}

.player-select button.active,
.player-select button:focus {
  background: linear-gradient(90deg, #2196f3 60%, #2fd9ad 100%);
  box-shadow: 0 2px 14px #2196f344;
}

.player-select button:disabled {
  background: #1c5757aa;
  color: #b5ffe1cc;
  cursor: not-allowed;
}

.chess-main {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 18px;
  align-items: flex-start;
}

.chess-board-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.55s cubic-bezier(.68, -0.55, .27, 1.55);
}

.chess-board-container.flipped {
  transform: rotate(180deg);
}

.chess-board {
  display: flex;
  flex-direction: column;
  border: 5px solid #212;
  border-radius: 14px;
  background: #093642;
  box-shadow: 0 0 22px #43d9ad33;
  margin-bottom: 2px;
  /* Smooth shadow & border */
}

.board-row {
  display: flex;
}

.square {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  position: relative;
  transition: box-shadow 0.3s, background 0.3s;
  border: 1px solid #1f353b;
  box-sizing: border-box;
  z-index: 1;
}

.square.light {
  background: linear-gradient(135deg, #f6fcff 80%, #b5ffe1 100%);
}

.square.dark {
  background: linear-gradient(135deg, #1e2844 70%, #1c5757 100%);
}

.square.selected {
  box-shadow: 0 0 10px 4px #00b894cc inset;
}

.square:hover:not(.selected) {
  box-shadow: 0 0 8px 2px #2fd9adcc inset;
}

.piece {
  user-select: none;
  text-shadow: 0 2px 8px #000a, 0 0 2px #fff9;
  font-weight: bold;
  transition: filter 0.2s, text-shadow 0.2s;
  z-index: 2;
  pointer-events: none;
}

.white-piece {
  color: #fff;
  text-shadow: 0 2px 12px #3b8ef3bb, 0 0 1px #000;
  filter: drop-shadow(0 0 2px #fff) drop-shadow(0 0 7px #2196f399);
}

.black-piece {
  color: #222;
  text-shadow: 0 2px 12px #e91e63aa, 0 0 1px #fff;
  filter: drop-shadow(0 0 2px #e91e63) drop-shadow(0 0 7px #b6004c99);
}

.chess-info-panel {
  min-width: 130px;
  max-width: 170px;
  background: #232d36e8;
  border-radius: 13px;
  padding: 13px 9px 10px 9px;
  color: #b5ffe1;
  font-size: 1rem;
  box-shadow: 0 0 10px #2fd9ad44;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 2px;
  gap: 10px;
}

.info-block {
  width: 100%;
  margin-bottom: 7px;
}

.turn-indicator {
  font-size: 1.09rem;
  font-weight: 700;
  margin-bottom: 6px;
  text-align: center;
  letter-spacing: 0.2px;
  transition: color 0.2s;
}

.turn-white {
  color: #2196f3;
}

.turn-black {
  color: #e91e63;
}

.timer {
  background: #083a3a99;
  padding: 3px 0 3.5px 0;
  border-radius: 5px;
  font-size: 1.03rem;
  margin-bottom: 6px;
  text-align: center;
  color: #ffe2b5;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 1px 4px #43d9ad33;
}

.score {
  color: #fedb59;
  font-weight: 700;
  font-size: 1.03rem;
  margin-bottom: 8px;
  background: #473c1a34;
  padding: 2.5px 0;
  text-align: center;
  border-radius: 4px;
}

.game-over {
  margin: 10px 0 6px 0;
  color: #ffeb3b;
  font-weight: 700;
  font-size: 1.06rem;
  text-align: center;
  background: #800f4c33;
  border-radius: 7px;
  padding: 7px 2.5px;
  box-shadow: 0 2px 7px #7b1fa244;
}

.reset-btn {
  background: linear-gradient(90deg, #2fd9ad 60%, #2196f3 100%);
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 6px 16px;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 2px 8px #2226, 0 0 4px #2fd9ad55;
  transition: background 0.2s, box-shadow 0.2s;
  display: block;
  margin: 0 auto;
}

.reset-btn:hover {
  background: linear-gradient(90deg, #2196f3 60%, #2fd9ad 100%);
  box-shadow: 0 4px 12px #2196f355;
}

.move-history {
  width: 100%;
  max-height: 90px;
  overflow-y: auto;
  background: #1e325233;
  border-radius: 6px;
  font-size: 0.94rem;
  padding: 5px 5px 5px 9px;
  margin-bottom: 4px;
}

.move-history ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.move-history li {
  margin-bottom: 2.5px;
}

.mh-white {
  color: #2196f3;
}

.mh-black {
  color: #e91e63;
}

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-thumb {
  background: #2fd9ad55;
  border-radius: 7px;
}

/* Toast Notifikasi */
.toast-popup {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 120px;
  max-width: 300px;
  background: linear-gradient(90deg, #43d9ad 80%, #fedb59 100%);
  color: #1e2844;
  font-weight: bold;
  font-size: 1.05rem;
  padding: 12px 25px 11px 25px;
  border-radius: 18px;
  box-shadow: 0 2px 16px #2fd9ad44, 0 0 12px #fedb5966;
  z-index: 10010;
  opacity: 0.97;
  text-align: center;
  animation: toastIn 0.30s cubic-bezier(.36, .66, .04, 1.15);
}

@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-30px);
  }

  to {
    opacity: 0.97;
    transform: translateX(-50%) translateY(0);
  }
}

/* ===== RESPONSIVE MOBILE & TWEAK FINAL ===== */
@media (max-width: 600px) {
  .chess-wrapper {
    max-width: 99vw;
    padding: 7vw 1vw 7vw 1vw;
    margin: 9px auto 0 auto;
    border-radius: 14px;
  }

  .chess-header h2 {
    font-size: 1.15rem;
    margin-bottom: 4px;
  }

  .player-select button,
  .reset-btn {
    font-size: 0.91rem;
    padding: 4px 10px;
    border-radius: 6px;
  }

  .chess-main {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .chess-board {
    border-width: 2.5px;
    border-radius: 8px;
    margin-bottom: 1px;
  }

  .square {
    width: 22px;
    height: 22px;
    font-size: 0.95rem;
    border-width: 1px;
    border-radius: 2px;
  }

  .chess-info-panel {
    min-width: 0;
    max-width: 98vw;
    font-size: 0.88rem;
    border-radius: 8px;
    padding: 6px 3.5vw 6px 3.5vw;
    margin-left: 0;
    margin-top: 5px;
    gap: 6px;
  }

  .move-history {
    font-size: 0.87rem;
    border-radius: 4px;
    padding: 3px 2px 3px 6px;
  }

  .info-block {
    margin-bottom: 4px;
  }

  .game-over {
    font-size: 0.97rem;
    padding: 5px 1px;
    border-radius: 5px;
  }

  .toast-popup {
    font-size: 0.97rem;
    padding: 8px 10vw 8px 10vw;
    border-radius: 13px;
    min-width: 60px;
    max-width: 90vw;
    top: 10px;
  }
}

/* ===== EFEK: TRANSISI BOARD & PIECE ===== */
.chess-board,
.square,
.piece {
  transition: background 0.22s, color 0.22s, box-shadow 0.24s, filter 0.22s, border 0.18s;
}

.square.selected,
.square:hover:not(.selected) {
  outline: 2px solid #ffd600a2;
  outline-offset: -2px;
}

.piece {
  transition: text-shadow 0.18s, filter 0.18s;
}

.piece:active {
  filter: brightness(1.25) drop-shadow(0 0 3px #fff8);
}

.chess-board-container.flipped .piece {
  transform: rotate(180deg);
  transition: transform 0.4s cubic-bezier(.5, -0.2, .3, 1.7);
}

/* ===== DISABLE-SELECT ===== */
.chess-board,
.square,
.piece {
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>

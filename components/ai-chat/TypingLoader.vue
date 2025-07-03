<template>
  <div class="typing-loader flex items-center gap-2 px-4 py-2">
    <span class="dot bg-cyan-400"></span>
    <span class="dot bg-cyan-300"></span>
    <span class="dot bg-cyan-200"></span>
    <span class="ml-2 text-cyan-300 font-mono text-sm opacity-90">AI sedang mengetik...</span>
  </div>
</template>

<style scoped>
.typing-loader {
  min-height: 44px;
}

.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 2px;
  animation: bounce 1s infinite alternate;
}

.dot:nth-child(2) {
  animation-delay: 0.17s;
}

.dot:nth-child(3) {
  animation-delay: 0.34s;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-8px);
  }
}
</style>

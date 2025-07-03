<!-- <template>
  <div class="flex items-center justify-center min-h-[60vh] text-3xl font-bold text-gray-300">
    _secret_math-lab<br>
    <span class="text-lg font-normal text-gray-400">Coming soon...</span>
  </div>
</template> -->


<template>
  <div class="math-lab-embed">
    <iframe src="https://www.geogebra.org/calculator" width="100%" height="600" frameborder="0"
      allowfullscreen></iframe>
  </div>
</template>

<script setup>
// Tidak perlu script khusus untuk embed dasar
</script>

<style scoped>
.math-lab-embed {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>

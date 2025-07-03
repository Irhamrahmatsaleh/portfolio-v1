<!-- components/ai-chat/TentangIrham.vue -->
<script setup>
// Tidak ada script khusus, hanya presentasi data statis
</script>

<template>
  <div
    class="irham-card max-w-xl mx-auto my-4 px-6 py-5 rounded-2xl bg-gradient-to-br from-[#181e2a]/95 via-[#182034]/90 to-[#212b3d]/95 shadow-xl border border-cyan-400/30 ring-1 ring-cyan-500/40 backdrop-blur-md relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none z-0">
      <div class="irham-glow absolute -top-5 -left-5 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl"></div>
      <div class="irham-glow absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
    </div>
    <div class="relative z-10">
      <div class="flex items-center gap-4 mb-2">
        <img src="https://avatars.githubusercontent.com/u/10681722?v=4" alt="Irham Rahmat Saleh"
          class="w-14 h-14 rounded-full border-2 border-cyan-400 shadow-cyan-500/30 shadow-lg" />
        <div>
          <h2 class="text-2xl font-extrabold tracking-tight text-cyan-300 font-mono leading-none">Irham Rahmat Saleh
          </h2>
          <div class="text-sm font-semibold text-blue-200 tracking-wide">
            Software Engineer · Full Stack Developer · AI Trainer
          </div>
        </div>
      </div>
      <div class="flex flex-wrap gap-3 my-2 text-base font-mono">
        <a href="mailto:irhamrahmatsaleh11@gmail.com"
          class="text-cyan-400 hover:underline transition">irhamrahmatsaleh11@gmail.com</a>
        <span class="text-cyan-300/80">|</span>
        <a href="tel:081364573630" class="text-cyan-400 hover:underline transition">081364573630</a>
        <span class="text-cyan-300/80">|</span>
        <span class="text-blue-300/80">Sukabumi</span>
      </div>
      <div class="flex flex-wrap gap-3 text-base mb-3">
        <a href="https://linkedin.com/in/irham-rahmat-saleh" target="_blank"
          class="text-blue-400 hover:glow-link font-semibold transition">LinkedIn</a>
        <a href="https://github.com/Irhamrahmatsaleh" target="_blank"
          class="text-blue-400 hover:glow-link font-semibold transition">GitHub</a>
        <a href="https://x.com/Irham_R_S" target="_blank"
          class="text-blue-400 hover:glow-link font-semibold transition">Twitter/X</a>
        <a href="https://irhamrahmatsaleh.github.io/irham/" target="_blank"
          class="text-blue-400 hover:glow-link font-semibold transition">Portfolio</a>
      </div>
      <div class="mb-4 text-slate-100/90 text-base leading-snug font-normal font-mono">
        <span class="font-bold text-cyan-300">Summary:</span>
        <br />
        Passionate in IT, electronics, mathematics, and computer science. Expert in full stack web & mobile dev
        (ReactJS, ExpressJS, Spring Boot, MySQL, Go, JavaScript, TypeScript). Experienced in scalable API, 3rd-party
        integration, and cloud deployment. Strong interest in electrical systems, automation, and IoT. Open to
        collaboration and career growth in the tech industry.
      </div>
      <div class="mb-3">
        <span class="font-bold text-cyan-300">Experience:</span>
        <ul class="list-none pl-0 mt-1 text-blue-100/90 text-sm font-mono space-y-1">
          <li><span class="text-cyan-200 font-semibold">Full-stack Developer</span> @ PT. Anugerah Swa Mandiri
            (Magniship), 03/2023–Present</li>
          <li><span class="text-cyan-200 font-semibold">Founder & Technician</span> @ Irham Cellular Business,
            01/2015–Present</li>
          <li><span class="text-cyan-200 font-semibold">AI Trainer</span> @ Outlier, 07/2024–06/2025</li>
          <li><span class="text-cyan-200 font-semibold">Web Developer & English Teacher</span> @ Sorayah English Course,
            01/2022–07/2024</li>
          <li><span class="text-cyan-200 font-semibold">Research & Development Specialist</span> @ APRIL,
            07/2019–11/2019</li>
        </ul>
      </div>
      <div class="mb-3">
        <span class="font-bold text-cyan-300">Skills:</span>
        <div class="flex flex-wrap gap-2 mt-1 text-xs text-cyan-200 font-mono">
          <span class="px-2 py-0.5 bg-cyan-900/60 rounded border border-cyan-700">Spring Boot</span>
          <span class="px-2 py-0.5 bg-cyan-900/60 rounded border border-cyan-700">ReactJS</span>
          <span class="px-2 py-0.5 bg-cyan-900/60 rounded border border-cyan-700">ExpressJS</span>
          <span class="px-2 py-0.5 bg-cyan-900/60 rounded border border-cyan-700">TypeScript</span>
          <span class="px-2 py-0.5 bg-cyan-900/60 rounded border border-cyan-700">MySQL</span>
          <span class="px-2 py-0.5 bg-cyan-900/60 rounded border border-cyan-700">Go</span>
          <span class="px-2 py-0.5 bg-cyan-900/60 rounded border border-cyan-700">JavaScript</span>
          <span class="px-2 py-0.5 bg-cyan-900/60 rounded border border-cyan-700">Python</span>
        </div>
      </div>
      <div class="mt-4 text-xs text-slate-400">
        <span class="font-mono">#irham #fullstack #portfolio #ai</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.irham-card {
  box-shadow: 0 6px 40px 0 rgba(25, 180, 255, 0.18), 0 2px 8px rgba(0, 0, 0, 0.18);
  border-radius: 1.25rem;
  border-width: 2px;
  border-color: #22d3ee44;
  position: relative;
}

.irham-glow {
  pointer-events: none;
  z-index: 0;
}

.hover\:glow-link:hover {
  text-shadow: 0 0 8px #38bdf8, 0 0 4px #22d3ee;
  color: #7dd3fc !important;
}
</style>

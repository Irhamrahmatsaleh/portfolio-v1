<template>
  <aside :class="['sidebar', { collapsed }]">
    <button v-if="!overlay" class="sidebar-toggle" @click="$emit('toggle')">
      <span class="toggle-icon" :class="{ rotated: !collapsed }">☰</span>
    </button>
    <div class="sidebar-content" v-if="!collapsed">
      <div class="sidebar-header">
        <h3 class="sidebar-title">Chat History</h3>
      </div>

      <div class="sidebar-items">
        <div v-for="item in 7" :key="item" class="sidebar-item">
          <!-- <div class="item-icon">💬</div> -->
          <span class="item-text"> </span>
        </div>
      </div>
    </div>

    <div class="sidebar-footer" v-if="!collapsed">
      <div class="footer-item">
        <div class="item-icon">⚙️</div>
        <span class="item-text">Settings</span>
      </div>
      <div class="footer-item">
        <div class="item-icon">👤</div>
        <span class="item-text">Profile</span>
      </div>
    </div>

    <div class="sidebar-footer-collapsed" v-else-if="!overlay">
      <div class="footer-item-collapsed" title="Settings">⚙️</div>
      <div class="footer-item-collapsed" title="Profile">👤</div>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  collapsed: {
    type: Boolean,
    default: false
  },
  overlay: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle', 'close'])
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(180deg, #0f1419 0%, #101a24 100%);
  border-right: 1px solid #1a2733;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 280px;
  min-width: 280px;
  max-width: 280px;
  overflow: hidden;
  position: relative;
}

.sidebar.collapsed {
  width: 60px;
  min-width: 60px;
  max-width: 60px;
}

.sidebar-toggle {
  height: 48px;
  width: 48px;
  border: none;
  background: rgba(108, 126, 182, 0.1);
  color: #6c7eb6;
  font-size: 1.4rem;
  margin: 16px auto 0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.sidebar-toggle:hover {
  background: rgba(151, 170, 255, 0.15);
  color: #97aaff;
  transform: scale(1.05);
}

.toggle-icon {
  transition: transform 0.3s ease;
  display: inline-block;
}

.toggle-icon.rotated {
  transform: rotate(90deg);
}

.sidebar-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0;
  animation: fadeInContent 0.3s ease-in-out;
}

@keyframes fadeInContent {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.sidebar-header {
  padding: 20px 16px 16px;
  border-bottom: 1px solid rgba(26, 39, 51, 0.8);
}

.sidebar-title {
  color: #e2e8f0;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.5px;
}

.sidebar-items {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  scrollbar-width: thin;
  scrollbar-color: #2a3441 transparent;
}

.sidebar-items::-webkit-scrollbar {
  width: 6px;
}

.sidebar-items::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-items::-webkit-scrollbar-thumb {
  background: #2a3441;
  border-radius: 3px;
}

.sidebar-items::-webkit-scrollbar-thumb:hover {
  background: #3a4551;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 4px;
  border-radius: 12px;
  color: #c4d0e5;
  font-size: 0.95rem;
  cursor: pointer;
  background: transparent;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  min-height: 44px;
}

.sidebar-item:hover {
  background: rgba(25, 41, 66, 0.8);
  color: #f0f4ff;
  transform: translateX(4px);
}

.item-icon {
  font-size: 1.2rem;
  margin-right: 12px;
  flex-shrink: 0;
  width: 20px;
  text-align: center;
}

.item-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-footer {
  border-top: 1px solid rgba(26, 39, 51, 0.8);
  padding: 16px 8px;
  background: rgba(15, 20, 25, 0.8);
  backdrop-filter: blur(10px);
  /* Animasi smooth saat muncul */
  animation: fadeInContent 0.3s ease-in-out;
}

.sidebar-footer-collapsed {
  border-top: 1px solid rgba(26, 39, 51, 0.8);
  padding: 16px 8px;
  background: rgba(15, 20, 25, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  /* Posisi di bagian bawah sidebar saat collapsed */
  margin-top: auto;
  /* Animasi smooth saat muncul */
  animation: fadeInFooter 0.3s ease-in-out;
}

@keyframes fadeInFooter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.footer-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 10px;
  color: #8892b0;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 4px;
}

.footer-item:hover {
  background: rgba(25, 41, 66, 0.6);
  color: #c4d0e5;
}

.footer-item-collapsed {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #8892b0;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: rgba(25, 41, 66, 0.3);
  border: 1px solid rgba(108, 126, 182, 0.1);
}

.footer-item-collapsed:hover {
  background: rgba(25, 41, 66, 0.8);
  color: #c4d0e5;
  transform: scale(1.1);
  border-color: rgba(151, 170, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Animasi smooth untuk transisi */
.sidebar * {
  box-sizing: border-box;
}

/* Responsif untuk mobile */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
  }

  .sidebar.collapsed {
    transform: translateX(-100%);
  }
}

/* Smooth transition untuk semua elemen */
.sidebar-content,
.sidebar-footer,
.sidebar-footer-collapsed {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

<template>
  <main v-if="!loading" id="hello">

    <!-- gradients -->
    <div class="css-blurry-gradient-blue"></div>
    <div class="css-blurry-gradient-green"></div>

    <section class="hero">

      <div class="head">
        <span>
          Hi all, I am
        </span>
        <h1>{{ config.name }}</h1>
        <span class="diple flex">
          >&nbsp;
          <h2 class="line-1 anim-typewriter max-w-fit"> {{ config.role }} </h2>
        </span>
      </div>

      <div id="info">
        <span class="action">
          // complete the game to continue
        </span>
        <span :class="{hide: isMobile}">
          // you can also see it on my Github page
        </span>
        <span :class="{hide: !isMobile}">
          // find my profile on Github:
        </span>
        <p class="code">
          <span class="identifier">
            const
          </span>
          <span class="variable-name">
            githubLink
          </span>
          <span class="operator">
            =
          </span>
          <a class="string" :href="'https://github.com/' + config.contacts.social.github.user">
            "https://github.com/{{ config.contacts.social.github.user }}"
          </a>
        </p>
      </div>
    </section>

    <section data-aos="fade-up" class="game" v-if="!isMobile">
      <NuxtLink id="skip-btn" to="/about-me" class="skip-btn font-fira_retina flex items-center justify-center mt-6">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" class="mr-2">
          <circle cx="12" cy="12" r="11" stroke="#43d9ad" stroke-width="2" fill="#151c27" />
          <path d="M9 8l4 4-4 4" stroke="#43d9ad" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Skip
      </NuxtLink>
      <ChessGame />

    </section>

  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import DevConfig from '~/developer.json';
import { useRouter } from 'vue-router'
const router = useRouter()

let touchStartX = 0

const config = ref(DevConfig)

const isMobile = ref(false)
const loading = ref(false)

onMounted(() => {
  if (window.innerWidth <= 1024) isMobile.value = true
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  if (window.innerWidth <= 1024) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
}



function handleTouchStart(e) {
  // Hanya deteksi satu sentuhan (jangan mouse/touch lain)
  if (e.touches && e.touches.length === 1) {
    touchStartX = e.touches[0].clientX
  }
}
function handleTouchEnd(e) {
  if (e.changedTouches && e.changedTouches.length === 1) {
    const touchEndX = e.changedTouches[0].clientX
    if (touchEndX - touchStartX > 80) {
      router.push('/about-me')
    }
  }
}

onMounted(() => {
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchend', handleTouchEnd, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
})


</script>

<style scoped>
#hello {
  display: flex;
  height: 100%;
  width: 100%;
  flex: 1 1 auto;
  padding-left: 275px;
  overflow: hidden;
}
.hero {
	width: 100%;
	justify-content: center;

}
.game {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	justify-content: center;
/* 	align-items: center; */
	z-index: 20;
}

#hello .hero {
	display: flex;
	flex-direction: column;
	/* display: grid;
	grid-template-columns: repeat(12, minmax(0, 1fr)); */
	margin: 0rem;
}


#hello .head span {
  font-size: 18px;
  line-height: 1;
  color: #E5E9F0;
  font-family: 'Fira Code Retina';
}

#hello .head h1 {
  font-size: 58px;
  line-height: 1;
  color: #E5E9F0;
  font-family: 'Fira Code Regular';
  padding-top: 1rem; /* 16px */
  padding-bottom: 1rem; /* 16px */
}

#hello .head h2, #hello .head .diple {
  font-size: 32px;
  line-height: 1;
  color: #4D5BCE;
  font-family: 'Fira Code Retina';
}

.head {
  padding-bottom: 3rem;
}

#info {
	display: flex;
	flex-direction: column;
}

#info > span {
  font-size: 14px;
  line-height: 1;
  color: #8da9c6;
  font-family: 'Fira Code Retina';
  padding-bottom: 1rem; /* 16px */
}

.code {
  font-family: 'Fira Code Medium';
  color: #E5E9F0;
}

.code .identifier {
  color: #6172ff;
}

.code .variable-name {
  color: #43D9AD;
}

.code .operator {
  color: white;
}

.code .string {
  color: #E99287;
  text-decoration-line: underline;
  text-underline-offset: 4px;
}

#info {
	padding-block: 2.5rem;
}

#info .action {
	display: flex
}

.hide {
  display: none;
}

.css-blurry-gradient-blue {
  position: fixed;
  bottom: 25%;
  right: 5%;
  width: 300px;
  height: 300px;
	border-radius: 0% 0% 50% 50%;
  rotate: 10deg;
	filter: blur(70px);
  background: radial-gradient(circle at 50% 50%,rgba(77, 91, 206, 1), rgba(76, 0, 255, 0));
  opacity: 0.5;
  z-index: 10;
}

.css-blurry-gradient-green {
  position: absolute;
  top: 20%;
  right: 30%;
  width: 300px;
  height: 300px;
	border-radius: 0% 50% 0% 50%;
	filter: blur(70px);
  background: radial-gradient(circle at 50% 50%,rgba(67, 217, 173, 1), rgba(76, 0, 255, 0));
  opacity: 0.5;
  z-index: 10;
}

#info {
  font-size: 14px;
}

/* Typewrite Animation */

.line-1 {
    width: fit-content;
    border-right: 3px solid rgba(255,255,255,.75);
    white-space: nowrap;
    overflow: hidden;
    padding-right: 2px;
}

.anim-typewriter{
    animation: typewriter 3.5s steps(40) 1s 1 normal both,
    blinkTextCursor 800ms steps(40) infinite normal;
}

@keyframes typewriter{
  from{width: 0;}
  to{width: 100%;}
}

@keyframes blinkTextCursor{
  from{border-right-color: rgba(255,255,255,.75);}
  to{border-right-color: transparent;}
}


/* mobile */
@media (max-width: 768px) {

	#hello {
		padding-left: 0;
	}

	#hello .hero {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 1.75rem; /* 28px */
	}
	.head {
		padding-top: 4rem; /* 40px */
	}

	#hello .head h2, #hello .head .diple {
		font-size: 20px;
		color: #43D9AD;
	}

	#info .action {
		display: none;
	}

}

/* tablet */
@media (min-width: 768px) and (max-width: 1024px) {
	#hello {
		padding-left: 0;
	}
	#hello .hero {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 1.75rem; /* 28px */
	}
	.head {
		padding-top: 4rem; /* 40px */
	}

}

@media (min-width: 1024px) and (max-width: 1320px) {
	#hello {
		padding-left: 135px;
	}
}


/* LG */

@media (min-width: 1024px) {

  .css-blurry-gradient-blue {
    position: fixed;
    bottom: 10%;
    right: 10%;
    width: 500px;
    height: 500px;
    opacity: 0.7;
    border-radius: 100% 50% 100% 0%;
  }

  .css-blurry-gradient-green {
    position: fixed;
    top: 10%;
    right: 35%;
    filter: blur(100px);
    rotate: 10deg;
    width: 400px;
    height: 400px;
    opacity: 0.5;
    border-radius: 100% 0% 0% 0%;
    rotate: 20deg;
  }
}

@media (min-width: 1920px){
	#hello {
		padding-left: 310px;
	}
	#hello .head h1 {
		font-size: 62px;
	}
}


.skip-btn {
  padding: 10px 26px;
  border-radius: 9px;
  font-weight: 600;
  background: linear-gradient(90deg, #43d9ad 65%, #2196f3 100%);
  color: #fff;
  border: none;
  transition: background 0.17s, box-shadow 0.18s, color 0.13s;
  box-shadow: 0 2px 10px #43d9ad55, 0 0 4px #2196f344;
  font-size: 1.06rem;
  margin: 0 auto;
  cursor: pointer;
  letter-spacing: 0.5px;
  outline: none;
  gap: 0.5rem;
}

.skip-btn:hover,
.skip-btn:focus {
  background: linear-gradient(90deg, #2196f3 70%, #43d9ad 100%);
  color: #ffe2b5;
  box-shadow: 0 4px 18px #2196f344;
  outline: none;
}
</style>

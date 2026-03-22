<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const particles = ref([])
const mouseX = ref(0)
const mouseY = ref(0)
const typedText = ref('')
const fullText = computed(() => t('hero.typingText'))
const showCursor = ref(true)

const daysRunning = computed(() => {
  const start = new Date('2025-03-01')
  const now = new Date()
  const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff : 0
})

let typeIndex = 0
let typeInterval = null
let particleInterval = null

function initParticles() {
  particles.value = Array.from({ length: 60 }, () => ({
    id: Math.random(),
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.5 + 0.1,
  }))
}

function handleMouseMove(e) {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 20
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 20
}

function startTyping() {
  typeIndex = 0
  typedText.value = ''
  clearInterval(typeInterval)
  typeInterval = setInterval(() => {
    if (typeIndex <= fullText.value.length) {
      typedText.value = fullText.value.slice(0, typeIndex)
      typeIndex++
    } else {
      clearInterval(typeInterval)
    }
  }, 60)
}

onMounted(() => {
  initParticles()
  window.addEventListener('mousemove', handleMouseMove)
  startTyping()

  setInterval(() => { showCursor.value = !showCursor.value }, 500)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  clearInterval(typeInterval)
})
</script>

<template>
  <section class="hero" id="home">
    <!-- Animated Grid Background -->
    <div class="grid-bg"></div>

    <!-- Particle Field -->
    <div class="particle-field" :style="{ transform: `translate(${mouseX * 0.3}px, ${mouseY * 0.3}px)` }">
      <div
        v-for="p in particles"
        :key="p.id"
        class="particle"
        :style="{
          left: p.x + '%',
          top: p.y + '%',
          width: p.size + 'px',
          height: p.size + 'px',
          animationDuration: p.duration + 's',
          animationDelay: p.delay + 's',
          opacity: p.opacity,
        }"
      ></div>
    </div>

    <!-- Glow Orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <!-- Scanline -->
    <div class="scanline"></div>

    <!-- Content -->
    <div class="hero-content" :style="{ transform: `translate(${mouseX * 0.5}px, ${mouseY * 0.5}px)` }">
      <!-- Pre-title -->
      <div class="pretitle">
        <span class="pretitle-line"></span>
        <span class="pretitle-text">{{ t('hero.pretitle') }}</span>
        <span class="pretitle-line"></span>
      </div>

      <!-- Main Title -->
      <h1 class="hero-title">
        <span class="title-line">{{ t('hero.title1') }}</span>
        <span class="title-line gradient-text">{{ t('hero.title2') }}</span>
        <span class="title-line">{{ t('hero.title3') }}</span>
      </h1>

      <!-- Typing Subtitle -->
      <div class="hero-subtitle">
        <span class="typing-text">{{ typedText }}</span>
        <span class="cursor" :class="{ blink: !showCursor }">_</span>
      </div>

      <!-- Tagline -->
      <p class="hero-desc" v-html="t('hero.desc')"></p>

      <!-- CTA Buttons -->
      <div class="hero-cta">
        <a href="#projects" class="btn-neon btn-neon--filled">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          {{ t('hero.exploreWorks') }}
        </a>
        <a href="#contact" class="btn-neon btn-neon--outline">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          {{ t('hero.letsTalk') }}
        </a>
      </div>

      <!-- Stats Row -->
      <div class="hero-stats">
        <div class="stat-item" v-for="stat in [
          { num: '5+', label: t('hero.yearsExp') },
          { num: '20+', label: t('hero.projects') },
          { num: '26', label: t('hero.clients') },
          { num: daysRunning, label: t('hero.uptime') },
        ]" :key="stat.label">
          <span class="stat-num">{{ stat.num }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator">
      <span>{{ t('hero.scroll') }}</span>
      <div class="scroll-line">
        <div class="scroll-dot"></div>
      </div>
    </div>

    <!-- Decorative Code Block -->
    <div class="code-decoration">
      <pre><code><span class="code-keyword">const</span> <span class="code-var">future</span> = () => &#123;
  <span class="code-keyword">return</span> <span class="code-string">"innovation"</span>;
&#125;</code></pre>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: radial-gradient(ellipse at 20% 50%, rgba(0, 102, 255, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 50%, rgba(123, 47, 255, 0.08) 0%, transparent 50%),
              var(--bg-primary);
}

.grid-bg {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-image:
    linear-gradient(rgba(0, 240, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 240, 255, 0.025) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 0;
}

.particle-field {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 1;
  transition: transform 0.3s ease;
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: var(--neon-cyan);
  box-shadow: 0 0 6px var(--glow-cyan);
  animation: particleFloat linear infinite;
}

@keyframes particleFloat {
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
}

.orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 1;
  animation: float 8s ease-in-out infinite;
}
.orb-1 {
  width: 500px; height: 500px;
  background: rgba(0, 102, 255, 0.06);
  top: 10%; left: 10%;
  animation-duration: 10s;
}
.orb-2 {
  width: 400px; height: 400px;
  background: rgba(123, 47, 255, 0.06);
  bottom: 10%; right: 10%;
  animation-duration: 12s;
  animation-delay: -4s;
}
.orb-3 {
  width: 300px; height: 300px;
  background: rgba(0, 240, 255, 0.04);
  top: 50%; left: 60%;
  animation-duration: 14s;
  animation-delay: -7s;
}

.scanline {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
  opacity: 0.08;
  animation: scanline 10s linear infinite;
  pointer-events: none;
  z-index: 999;
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 20px;
  transition: transform 0.1s ease;
}

.pretitle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--neon-cyan);
  text-shadow: 0 0 10px var(--glow-cyan);
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
}

.pretitle-line {
  width: 40px;
  height: 1px;
  background: var(--neon-cyan);
  box-shadow: 0 0 8px var(--glow-cyan);
}

.hero-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font-display);
  font-weight: 900;
  line-height: 1;
  margin-bottom: 24px;
  animation: fadeInUp 0.8s ease 0.2s forwards;
  opacity: 0;
}

.title-line {
  font-size: clamp(3.5rem, 10vw, 8rem);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  transition: var(--transition-smooth);
}

.title-line:nth-child(2) {
  font-size: clamp(4rem, 12vw, 10rem);
  text-shadow: 0 0 40px var(--glow-cyan);
}

.gradient-text {
  background: var(--gradient-cyber);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: gradientShift 4s ease infinite;
}

.hero-subtitle {
  font-family: var(--font-mono);
  font-size: clamp(0.85rem, 2vw, 1.1rem);
  color: var(--neon-cyan);
  text-shadow: 0 0 15px var(--glow-cyan);
  margin-bottom: 20px;
  letter-spacing: 0.15em;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeInUp 0.8s ease 0.4s forwards;
  opacity: 0;
  min-height: 1.6em;
}

.cursor {
  color: var(--neon-cyan);
  margin-left: 2px;
  text-shadow: 0 0 10px var(--glow-cyan);
}

.hero-desc {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 40px;
  line-height: 1.8;
  animation: fadeInUp 0.8s ease 0.5s forwards;
  opacity: 0;
}

.highlight {
  color: var(--neon-cyan);
  font-weight: 600;
}

.hero-cta {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 60px;
  animation: fadeInUp 0.8s ease 0.6s forwards;
  opacity: 0;
}

.hero-stats {
  display: flex;
  gap: 50px;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease 0.8s forwards;
  opacity: 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  position: relative;
}

.stat-item::after {
  content: '';
  position: absolute;
  right: -25px;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 30px;
  background: linear-gradient(to bottom, transparent, var(--neon-cyan), transparent);
}

.stat-item:last-child::after { display: none; }

.stat-num {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--neon-cyan);
  text-shadow: 0 0 15px var(--glow-cyan);
}

.stat-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: var(--text-muted);
  text-transform: uppercase;
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  color: var(--text-muted);
  animation: fadeInUp 1s ease 1.2s forwards;
  opacity: 0;
  z-index: 10;
}

.scroll-line {
  width: 1px;
  height: 50px;
  background: rgba(0, 240, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.scroll-dot {
  width: 3px;
  height: 8px;
  background: var(--neon-cyan);
  border-radius: 2px;
  position: absolute;
  left: -1px;
  animation: scrollDot 2s ease-in-out infinite;
  box-shadow: 0 0 10px var(--glow-cyan);
}

@keyframes scrollDot {
  0% { top: 0; opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { top: calc(100% - 8px); opacity: 0; }
}

.code-decoration {
  position: absolute;
  bottom: 120px;
  right: 60px;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--text-muted);
  opacity: 0.3;
  animation: fadeInRight 1s ease 1s forwards;
  opacity: 0;
  z-index: 10;
}

.code-keyword { color: var(--neon-purple); }
.code-var { color: var(--neon-green); }
.code-string { color: var(--neon-orange); }

@media (max-width: 768px) {
  .orb-3 { display: none; }
  .code-decoration { display: none; }
  .hero-stats { gap: 30px; }
  .stat-item::after { display: none; }
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isVisible = ref(false)

const traits = [
  { icon: '⚡', key: 'fastPaced' },
  { icon: '🧠', key: 'aiNative' },
  { icon: '🔮', key: 'futureFocused' },
  { icon: '🎯', key: 'precision' },
]

const timeline = [
  { year: '2024.5 - 2025.8' },
  { year: '2022.6 - 2024.5' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) isVisible.value = true
    },
    { threshold: 0.15 }
  )
  const el = document.querySelector('#about')
  if (el) observer.observe(el)
})
</script>

<template>
  <section class="section about-section" id="about">
    <div class="container">
      <div class="about-grid" :class="{ visible: isVisible }">

        <!-- Left: Image & Bio -->
        <div class="about-left">
          <div class="avatar-wrapper">
            <div class="avatar-ring"></div>
            <div class="avatar-ring ring-2"></div>
            <div class="avatar-inner">
              <div class="avatar-placeholder">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#00f0ff;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#7b2fff;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="70" r="35" fill="url(#avatarGrad)" opacity="0.8"/>
                  <ellipse cx="100" cy="170" rx="60" ry="40" fill="url(#avatarGrad)" opacity="0.6"/>
                  <text x="100" y="155" text-anchor="middle" fill="white" font-family="Orbitron" font-size="12" font-weight="700">DEV</text>
                </svg>
              </div>
              <!-- Floating badge -->
              <div class="avatar-badge">
                <span class="badge-dot"></span>
                <span>{{ t('about.availableForHire') }}</span>
              </div>
            </div>
          </div>

          <div class="bio-text">
            <h3 class="bio-name">{{ t('about.bioName') }}</h3>
            <p class="bio-role">{{ t('about.bioRole') }}</p>
            <p class="bio-desc">{{ t('about.bioDesc') }}</p>
          </div>
        </div>

        <!-- Right: Traits + Timeline -->
        <div class="about-right">
          <!-- Traits -->
          <div class="traits-grid">
            <div class="trait-card glass-card" v-for="trait in traits" :key="trait.key">
              <div class="trait-icon">{{ trait.icon }}</div>
              <h4 class="trait-title">{{ t(`about.traits.${trait.key}.title`) }}</h4>
              <p class="trait-desc">{{ t(`about.traits.${trait.key}.desc`) }}</p>
            </div>
          </div>

          <!-- Timeline -->
          <div class="timeline">
            <h3 class="timeline-title">
              <span class="timeline-bar"></span>
              {{ t('about.experience') }}
            </h3>
            <div class="timeline-items">
              <div class="timeline-item" v-for="item in timeline" :key="item.year">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <span class="timeline-year">{{ item.year }}</span>
                  <h4 class="timeline-role">{{ t(`about.timeline[${timeline.indexOf(item)}].role`) }}</h4>
                  <span class="timeline-company">{{ t(`about.timeline[${timeline.indexOf(item)}].company`) }}</span>
                  <p class="timeline-desc">{{ t(`about.timeline[${timeline.indexOf(item)}].desc`) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.about-grid {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 80px;
  align-items: start;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-grid.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Avatar */
.avatar-wrapper {
  position: relative;
  width: 280px;
  height: 280px;
  margin: 0 auto 40px;
}

.avatar-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid var(--neon-cyan);
  box-shadow: 0 0 20px var(--glow-cyan);
  animation: pulse-ring 2.5s ease-out infinite;
}

.ring-2 {
  inset: -15px;
  border-color: var(--neon-purple);
  box-shadow: 0 0 20px var(--glow-purple);
  animation-delay: 0.5s;
  animation: pulse-ring 2.5s ease-out infinite;
}

.avatar-inner {
  position: absolute;
  inset: 30px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 102, 255, 0.1), rgba(123, 47, 255, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-placeholder svg {
  width: 100%;
  height: 100%;
}

.avatar-badge {
  position: absolute;
  bottom: 0;
  right: -20px;
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 20px;
  padding: 6px 14px;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--neon-green);
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--neon-green);
  box-shadow: 0 0 6px var(--neon-green);
  animation: pulse-glow 1.5s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 6px var(--neon-green); }
  50% { box-shadow: 0 0 12px var(--neon-green), 0 0 20px var(--neon-green); }
}

.bio-text {
  text-align: center;
}

.bio-name {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.bio-role {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--neon-cyan);
  text-shadow: 0 0 10px var(--glow-cyan);
  letter-spacing: 0.1em;
  margin-bottom: 16px;
}

.bio-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.8;
}

/* Traits */
.traits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 50px;
}

.trait-card {
  padding: 24px;
}

.trait-icon {
  font-size: 1.8rem;
  margin-bottom: 12px;
  filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.5));
}

.trait-title {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.trait-desc {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* Timeline */
.timeline-title {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--text-secondary);
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.timeline-bar {
  display: block;
  width: 30px;
  height: 2px;
  background: var(--gradient-cyber);
  box-shadow: 0 0 8px var(--glow-cyan);
}

.timeline-items {
  position: relative;
  padding-left: 30px;
}

.timeline-items::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, var(--neon-cyan), var(--neon-purple), transparent);
}

.timeline-item {
  position: relative;
  margin-bottom: 32px;
}

.timeline-item:last-child { margin-bottom: 0; }

.timeline-dot {
  position: absolute;
  left: -30px;
  top: 6px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--neon-cyan);
  box-shadow: 0 0 10px var(--glow-cyan);
  border: 2px solid var(--bg-primary);
}

.timeline-year {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--neon-cyan);
  text-shadow: 0 0 8px var(--glow-cyan);
  letter-spacing: 0.1em;
}

.timeline-role {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 4px 0 2px;
}

.timeline-company {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--neon-purple);
  letter-spacing: 0.05em;
}

.timeline-desc {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-top: 4px;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  .avatar-wrapper {
    width: 220px;
    height: 220px;
  }
}

@media (max-width: 640px) {
  .traits-grid {
    grid-template-columns: 1fr;
  }
}
</style>

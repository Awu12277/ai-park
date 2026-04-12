<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AboutSection from '../components/AboutSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'

const { t } = useI18n()

const stats = ref([
  { num: '5+', label: 'hero.yearsExp' },
  { num: '20+', label: 'hero.projects' },
  { num: '26', label: 'hero.clients' },
])
</script>

<template>
  <div class="about-page">
    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item" v-for="stat in stats" :key="stat.label">
            <span class="stat-num">{{ stat.num }}</span>
            <span class="stat-label">{{ t(stat.label) }}</span>
          </div>
        </div>
      </div>
    </section>

    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
  </div>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
}

.stats-section {
  padding: 140px 24px 40px;
  background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.stats-grid {
  display: flex;
  justify-content: center;
  gap: 80px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stat-num {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  color: var(--neon-cyan);
  text-shadow: 0 0 20px var(--glow-cyan);
}

.stat-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--text-muted);
  text-transform: uppercase;
}

@media (max-width: 640px) {
  .stats-grid {
    gap: 40px;
  }

  .stat-num {
    font-size: 2rem;
  }
}
</style>

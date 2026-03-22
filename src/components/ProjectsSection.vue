<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isVisible = ref(false)

const projects = [
  { title: 'NeuralChat', category: 'projects.items[0].category', desc: 'projects.items[0].desc', tags: ['Vue 3', 'FastAPI', 'LLM', 'WebSocket'], color: '#00f0ff', glow: 'rgba(0, 240, 255, 0.15)', statusKey: 'projects.items[0].status', stars: '2.4k' },
  { title: 'DataForge', category: 'projects.items[1].category', desc: 'projects.items[1].desc', tags: ['Python', 'Kafka', 'ClickHouse', 'K8s'], color: '#7b2fff', glow: 'rgba(123, 47, 255, 0.15)', statusKey: 'projects.items[1].status', stars: '1.8k' },
  { title: 'Synthwave UI', category: 'projects.items[2].category', desc: 'projects.items[2].desc', tags: ['React', 'TypeScript', 'Storybook', 'CSS'], color: '#ff00ff', glow: 'rgba(255, 0, 255, 0.15)', statusKey: 'projects.items[2].status', stars: '3.1k' },
  { title: 'CloudPilot', category: 'projects.items[3].category', desc: 'projects.items[3].desc', tags: ['Go', 'Terraform', 'AWS', 'GCP'], color: '#00ff88', glow: 'rgba(0, 255, 136, 0.15)', statusKey: 'projects.items[3].status', stars: '956' },
  { title: 'VoxelMind', category: 'projects.items[4].category', desc: 'projects.items[4].desc', tags: ['Three.js', 'PyTorch', 'WebGPU', 'Node'], color: '#ff6b00', glow: 'rgba(255, 107, 0, 0.15)', statusKey: 'projects.items[4].status', stars: '1.2k' },
  { title: 'ChainVault', category: 'projects.items[5].category', desc: 'projects.items[5].desc', tags: ['Solidity', 'React', 'IPFS', 'zkSNARKs'], color: '#0066ff', glow: 'rgba(0, 102, 255, 0.15)', statusKey: 'projects.items[5].status', stars: '2.0k' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) isVisible.value = true
    },
    { threshold: 0.08 }
  )
  const el = document.querySelector('#projects')
  if (el) observer.observe(el)
})
</script>

<template>
  <section class="section projects-section" id="projects">
    <div class="container">
      <div class="projects-header" :class="{ visible: isVisible }">
        <h2 class="section-title">
          <span class="accent">{{ t('projects.title') }}</span> {{ t('projects.subtitle') }}
        </h2>
        <p class="projects-intro">
          {{ t('projects.intro') }}
        </p>
      </div>

      <div class="projects-grid" :class="{ visible: isVisible }">
        <div
          class="project-card glass-card"
          v-for="(project, i) in projects"
          :key="project.title"
          :style="{
            transitionDelay: (i * 0.08) + 's',
            '--p-color': project.color,
            '--p-glow': project.glow,
          }"
        >
          <!-- Card Glow BG -->
          <div class="card-glow"></div>

          <!-- Status Badge -->
          <div class="status-badge" :style="{ color: project.color, borderColor: project.color + '40' }">
            <span class="status-dot" :style="{ background: project.color, boxShadow: '0 0 6px ' + project.color }"></span>
            {{ t(project.statusKey) }}
          </div>

          <!-- Content -->
          <div class="card-content">
            <span class="card-category">{{ t(project.category) }}</span>
            <h3 class="card-title">{{ project.title }}</h3>
            <p class="card-desc">{{ t(project.desc) }}</p>
          </div>

          <!-- Tags -->
          <div class="card-tags">
            <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>

          <!-- Footer -->
          <div class="card-footer">
            <div class="stars">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>{{ project.stars }}</span>
            </div>
            <a href="#" class="card-link">
              {{ t('projects.viewProject') }}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%);
}

.projects-header {
  text-align: center;
  margin-bottom: 60px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.projects-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.projects-intro {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  margin-top: 16px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.projects-grid.visible {
  opacity: 1;
  transform: translateY(0);
}

.project-card {
  position: relative;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease, border-color 0.3s, box-shadow 0.3s;
}

.projects-grid.visible .project-card {
  opacity: 1;
  transform: translateY(0);
}

.project-card:hover {
  border-color: var(--p-color);
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.08), inset 0 0 30px rgba(0, 240, 255, 0.03);
  transform: translateY(-6px);
}

.card-glow {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: radial-gradient(ellipse at top left, var(--p-glow), transparent 60%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.project-card:hover .card-glow {
  opacity: 1;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border: 1px solid;
  border-radius: 20px;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  width: fit-content;
}

.status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.card-content {
  flex: 1;
}

.card-category {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--p-color);
  text-shadow: 0 0 8px var(--p-glow);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 8px 0 12px;
  letter-spacing: 0.05em;
}

.card-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.7;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  padding: 3px 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(0, 240, 255, 0.08);
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  transition: var(--transition-fast);
}

.project-card:hover .tag {
  border-color: rgba(0, 240, 255, 0.15);
  color: var(--text-secondary);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.stars {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.stars svg { color: var(--neon-orange); }

.card-link {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--p-color);
  text-decoration: none;
  text-shadow: 0 0 8px var(--p-glow);
  transition: var(--transition-fast);
}

.card-link:hover {
  gap: 8px;
  text-shadow: 0 0 15px var(--p-glow);
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>

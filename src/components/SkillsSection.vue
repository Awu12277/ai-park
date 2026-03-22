<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isVisible = ref(false)

const skillGroups = [
  {
    titleKey: 'skills.frontend',
    color: '#00f0ff',
    glow: 'rgba(0, 240, 255, 0.4)',
    skills: [
      { name: 'Vue.js', level: 95 },
      { name: 'Three.js', level: 80 },
      { name: 'TypeScript', level: 80 },
      { name: 'CSS3 / Sass', level: 90 },
    ],
  },
  {
    titleKey: 'skills.backend',
    color: '#7b2fff',
    glow: 'rgba(123, 47, 255, 0.4)',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Node.js', level: 80 },
      // { name: 'MySQL / MongoDB', level: 78 },
      // { name: 'Express', level: 82 },
    ],
  },
  {
    titleKey: 'skills.aiData',
    color: '#00ff88',
    glow: 'rgba(0, 255, 136, 0.4)',
    skills: [
      { name: 'Cursor', level: 80 },
      { name: 'Claude Code', level: 88 },
      { name: 'Skills', level: 85 },
    ],
  },
  // {
  //   titleKey: 'skills.devops',
  //   color: '#ff6b00',
  //   glow: 'rgba(255, 107, 0, 0.4)',
  //   skills: [
  //     { name: 'Git', level: 92 },
  //     { name: 'AWS S3', level: 75 },
  //     { name: 'Linux', level: 78 },
  //     { name: 'Redis', level: 72 },
  //   ],
  // },
]

const tools = [
  { key: 'cursor', icon: '◉' },
  { key: 'claude', icon: '◆' },
  { key: 'vscode', icon: '◈' },
  { key: 'git', icon: '⎇' },
  { key: 'postman', icon: '⬡' },
  { key: 'supabase', icon: '▲' },
  { key: 'vercel', icon: '▲' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) isVisible.value = true
    },
    { threshold: 0.1 }
  )
  const el = document.querySelector('#skills')
  if (el) observer.observe(el)
})
</script>

<template>
  <section class="section skills-section" id="skills">
    <div class="container">
      <div class="skills-header" :class="{ visible: isVisible }">
        <h2 class="section-title">
          <span class="accent">{{ t('skills.title') }}</span> {{ t('skills.subtitle') }}
        </h2>
        <p class="skills-intro">
          {{ t('skills.intro') }}
        </p>
      </div>

      <div class="skills-grid" :class="{ visible: isVisible }">
        <div
          class="skill-group glass-card"
          v-for="(group, gi) in skillGroups"
          :key="group.titleKey"
          :style="{
            transitionDelay: (gi * 0.1) + 's',
            '--group-color': group.color,
            '--group-glow': group.glow,
          }"
        >
          <div class="group-header">
            <div class="group-dot"></div>
            <h3 class="group-title">{{ t(group.titleKey) }}</h3>
          </div>

          <div class="skill-bars">
            <div class="skill-bar" v-for="(skill, si) in group.skills" :key="skill.name">
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-pct">{{ skill.level }}%</span>
              </div>
              <div class="bar-track">
                <div
                  class="bar-fill"
                  :style="{
                    width: isVisible ? skill.level + '%' : '0%',
                    transitionDelay: (gi * 0.1 + si * 0.08) + 's',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tools -->
      <div class="tools-section" :class="{ visible: isVisible }">
        <h3 class="tools-title">
          <span class="tools-bar"></span>
          {{ t('skills.toolsTitle') }}
        </h3>
        <div class="tools-grid">
          <div class="tool-item" v-for="tool in tools" :key="tool.key">
            <span class="tool-icon">{{ tool.icon }}</span>
            <span class="tool-name">{{ t(`skills.tools.${tool.key}`) }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
}

.skills-header {
  text-align: center;
  margin-bottom: 60px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.skills-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.skills-intro {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  margin-top: 16px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 60px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.skills-grid.visible {
  opacity: 1;
  transform: translateY(0);
}

.skill-group {
  padding: 32px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease, border-color 0.3s, box-shadow 0.3s;
}

.skills-grid.visible .skill-group {
  opacity: 1;
  transform: translateY(0);
}

.skill-group:hover {
  border-color: var(--group-color);
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.08), inset 0 0 30px rgba(0, 240, 255, 0.03);
}

.group-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

.group-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--group-color);
  box-shadow: 0 0 10px var(--group-glow);
}

.group-title {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--group-color);
  text-shadow: 0 0 15px var(--group-glow);
}

.skill-bars {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skill-bar {}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.skill-name {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-primary);
}

.skill-pct {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--group-color);
}

.bar-track {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--gradient-cyber);
  border-radius: 2px;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px var(--glow-cyan);
  position: relative;
}

.bar-fill::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background: var(--neon-cyan);
  box-shadow: 0 0 8px var(--glow-cyan);
  border-radius: 2px;
}

/* Tools */
.tools-section {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease 0.4s;
}

.tools-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.tools-title {
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

.tools-bar {
  display: block;
  width: 30px;
  height: 2px;
  background: var(--gradient-cyber);
  box-shadow: 0 0 8px var(--glow-cyan);
}

.tools-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tool-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--bg-glass);
  border: 1px solid rgba(0, 240, 255, 0.08);
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-secondary);
  transition: var(--transition-smooth);
  cursor: default;
}

.tool-item:hover {
  border-color: var(--neon-cyan);
  color: var(--neon-cyan);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.1);
  transform: translateY(-2px);
}

.tool-icon {
  font-size: 1rem;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>

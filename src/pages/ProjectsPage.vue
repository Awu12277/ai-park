<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const projects = ref([
  {
    id: 1,
    title: 'AI 生成图片',
    desc: '使用 Stable Diffusion 和 Midjourney 生成的数字艺术作品',
    tags: ['SD', 'Midjourney', 'AI Art'],
    date: '2024',
    cover: 'image'
  },
  {
    id: 2,
    title: 'AI 视频创作',
    desc: 'AI 驱动的视频生成与剪辑，包含动画和特效',
    tags: ['Runway', 'Pika', 'Video'],
    date: '2024',
    cover: 'video'
  },
  {
    id: 3,
    title: 'AI 音乐制作',
    desc: 'AI 辅助音乐创作、编曲和声音合成',
    tags: ['Suno', 'Udio', 'Music'],
    date: '2024',
    cover: 'music'
  },
  {
    id: 4,
    title: 'AI 写作助手',
    desc: '基于大语言模型的写作辅助工具',
    tags: ['GPT', 'Claude', 'Writing'],
    date: '2024',
    cover: 'writing'
  },
  {
    id: 5,
    title: 'AI 数据可视化',
    desc: 'AI 驱动的数据分析和可视化仪表盘',
    tags: ['Python', 'AI', 'Data'],
    date: '2024',
    cover: 'data'
  },
  {
    id: 6,
    title: 'AI 3D 生成',
    desc: '使用 AI 技术生成的 3D 模型和场景',
    tags: ['Tripo3D', 'Meshy', '3D'],
    date: '2024',
    cover: '3d'
  }
])
</script>

<template>
  <div class="projects-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">{{ t('projects.pageTitle') }}</h1>
        <p class="page-desc">{{ t('projects.pageDesc') }}</p>
      </div>

      <div class="projects-grid">
        <div class="project-card glass-card" v-for="project in projects" :key="project.id">
          <div class="card-preview">
            <div class="preview-icon">
              <svg v-if="project.cover === 'image'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
              <svg v-else-if="project.cover === 'video'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polygon points="23 7 16 12 23 17 23 7"/>
                <rect x="1" y="5" width="15" height="14" rx="2"/>
              </svg>
              <svg v-else-if="project.cover === 'music'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
              <svg v-else-if="project.cover === 'writing'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
              </svg>
              <svg v-else-if="project.cover === 'data'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M18 20V10M12 20V4M6 20v-6"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </div>
          <div class="card-info">
            <h3 class="card-title">{{ project.title }}</h3>
            <p class="card-desc">{{ project.desc }}</p>
            <div class="card-tags">
              <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
            </div>
            <span class="card-date">{{ project.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects-page {
  min-height: 100vh;
  padding: 120px 24px 60px;
  background: var(--bg-primary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.page-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  letter-spacing: 0.05em;
}

.page-desc {
  font-size: 1rem;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.project-card {
  padding: 0;
  overflow: hidden;
  transition: var(--transition-smooth);
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: rgba(0, 240, 255, 0.3);
}

.card-preview {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(129, 140, 248, 0.1));
  padding: 48px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-icon {
  width: 64px;
  height: 64px;
  color: var(--neon-cyan);
  opacity: 0.6;
}

.preview-icon svg {
  width: 100%;
  height: 100%;
}

.card-info {
  padding: 24px;
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.card-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 16px;
  line-height: 1.6;
}

.card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  padding: 4px 10px;
  background: rgba(0, 240, 255, 0.08);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 4px;
  color: var(--neon-cyan);
}

.card-date {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
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

  .page-title {
    font-size: 1.8rem;
  }
}
</style>

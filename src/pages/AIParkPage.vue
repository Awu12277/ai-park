<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="ai-park-page">
    <div class="container">
      <button class="back-btn" @click="goBack">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
        </svg>
        {{ t('common.back') }}
      </button>

      <h1 class="page-title">AIGC 项目集合</h1>
      <p class="page-desc">这里将展示所有 AI 相关项目...</p>

      <div class="ai-projects-grid">
        <!-- 卡片区域，后续填充 -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-park-page {
  min-height: 100vh;
  padding: 120px 24px 60px;
  background: var(--bg-primary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 40px;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 240, 255, 0.3);
  color: #00f0ff;
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
  margin-bottom: 48px;
}

.ai-projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .ai-projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .ai-projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>

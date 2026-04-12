import { createRouter, createWebHistory } from 'vue-router'

const SITE_NAME = 'AI 公园'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue'),
    meta: { title: `${SITE_NAME} — AIGC 创意项目集 & 技术实验场` },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../pages/ProjectsPage.vue'),
    meta: { title: `项目 | ${SITE_NAME}` },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/AboutPage.vue'),
    meta: { title: `关于 | ${SITE_NAME}` },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = to.meta.title || SITE_NAME
})

export default router

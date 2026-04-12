<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const emit = defineEmits(['toggle-lang'])

const props = defineProps({
  isZh: Boolean,
})

const scrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { name: 'nav.home', href: '/', isRoute: true },
  { name: 'nav.projects', href: '/projects', isRoute: true },
  { name: 'nav.about', href: '/about', isRoute: true },
]

const isActive = (href) => route.path === href

function handleScroll() {
  scrolled.value = window.scrollY > 50
}

function scrollTo(href) {
  mobileOpen.value = false
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function navigateTo(href, isRoute) {
  mobileOpen.value = false
  if (isRoute) {
    router.push(href)
  } else {
    scrollTo(href)
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <nav class="navbar" :class="{ scrolled }">
    <div class="nav-container">
      <!-- Logo -->
      <a class="nav-logo" href="/" @click.prevent="router.push('/')">
        <img src="/logo.svg" alt="Logo" class="logo-img" />
      </a>

      <!-- Desktop Links -->
      <ul class="nav-links">
        <li v-for="link in navLinks" :key="link.name">
          <a
            :href="link.isRoute ? link.href : '#'"
            class="nav-link"
            :class="{ active: isActive(link.href) }"
            @click.prevent="navigateTo(link.href, link.isRoute)"
          >
            {{ t(link.name) }}
          </a>
        </li>
      </ul>

      <!-- Language Toggle -->
      <button class="lang-toggle" @click="emit('toggle-lang')">
        {{ props.isZh ? 'EN' : '中' }}
      </button>

      <!-- CTA -->
      <a
        href="mailto:example@email.com"
        class="btn-neon btn-neon--outline nav-cta"
      >
        {{ t('nav.hireMe') }}
      </a>

      <!-- Mobile Toggle -->
      <button class="mobile-toggle" @click="mobileOpen = !mobileOpen" :class="{ open: mobileOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ open: mobileOpen }">
      <a
        v-for="link in navLinks"
        :key="link.name"
        :href="link.href"
        class="mobile-link"
        @click.prevent="navigateTo(link.href, link.isRoute)"
      >
        {{ t(link.name) }}
      </a>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 0;
  transition: all 0.4s ease;
}

.navbar.scrolled {
  padding: 12px 0;
  background: rgba(3, 0, 20, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 240, 255, 0.06);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: var(--transition-smooth);
}

.nav-logo:hover {
  filter: drop-shadow(0 0 15px var(--glow-cyan));
}

.logo-img {
  height: 72px;
  width: auto;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 8px;
  margin-left: auto;
}

.nav-link {
  position: relative;
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--text-secondary);
  padding: 8px 16px;
  transition: var(--transition-smooth);
  border-radius: 4px;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 1px;
  background: var(--neon-cyan);
  box-shadow: 0 0 8px var(--glow-cyan);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: var(--neon-cyan);
  text-shadow: 0 0 10px var(--glow-cyan);
}

.nav-link:hover::before {
  width: 60%;
}

.nav-link.active {
  color: var(--neon-cyan);
  text-shadow: 0 0 10px var(--glow-cyan);
}

.nav-link.active::before {
  width: 60%;
}

.lang-toggle {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--neon-cyan);
  background: rgba(0, 240, 255, 0.06);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  transition: var(--transition-smooth);
  text-shadow: 0 0 8px var(--glow-cyan);
}

.lang-toggle:hover {
  background: rgba(0, 240, 255, 0.12);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.15);
}

.nav-cta {
  font-size: 0.65rem;
  padding: 8px 20px;
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin-left: auto;
}

.mobile-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--neon-cyan);
  border-radius: 2px;
  transition: var(--transition-smooth);
  box-shadow: 0 0 6px var(--glow-cyan);
}

.mobile-toggle.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.mobile-toggle.open span:nth-child(2) {
  opacity: 0;
}
.mobile-toggle.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-menu {
  display: none;
  flex-direction: column;
  padding: 16px 40px 24px;
  background: rgba(3, 0, 20, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 240, 255, 0.06);
}

.mobile-menu.open {
  display: flex;
}

.mobile-link {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--text-secondary);
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: var(--transition-fast);
}

.mobile-link:hover {
  color: var(--neon-cyan);
  padding-left: 8px;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 20px;
  }

  .nav-links, .nav-cta {
    display: none;
  }

  .lang-toggle {
    display: none;
  }

  .mobile-toggle {
    display: flex;
  }
}
</style>

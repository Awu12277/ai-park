<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

function handleScroll() {
  scrolled.value = window.scrollY > 50
}

function scrollTo(href) {
  mobileOpen.value = false
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <nav class="navbar" :class="{ scrolled }">
    <div class="nav-container">
      <!-- Logo -->
      <a class="nav-logo" href="#home" @click.prevent="scrollTo('#home')">
        <span class="logo-bracket">[</span>
        <span class="logo-text">A</span>
        <span class="logo-bracket">]</span>
      </a>

      <!-- Desktop Links -->
      <ul class="nav-links">
        <li v-for="link in navLinks" :key="link.name">
          <a
            :href="link.href"
            class="nav-link"
            @click.prevent="scrollTo(link.href)"
          >
            {{ link.name }}
          </a>
        </li>
      </ul>

      <!-- CTA -->
      <a
        href="#contact"
        class="btn-neon btn-neon--outline nav-cta"
        @click.prevent="scrollTo('#contact')"
      >
        HIRE ME
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
        @click.prevent="scrollTo(link.href)"
      >
        {{ link.name }}
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
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 900;
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: var(--transition-smooth);
}

.nav-logo:hover {
  text-shadow: 0 0 20px var(--glow-cyan);
}

.logo-bracket {
  color: var(--neon-cyan);
  text-shadow: 0 0 15px var(--glow-cyan);
}

.logo-text {
  color: var(--text-primary);
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

  .mobile-toggle {
    display: flex;
  }
}
</style>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'

const { locale } = useI18n()

const isZh = ref(true)

function toggleLang() {
  isZh.value = !isZh.value
  locale.value = isZh.value ? 'zh' : 'en'
}
</script>

<template>
  <div class="app">
    <NavBar @toggle-lang="toggleLang" :is-zh="isZh" />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  </div>
</template>

<style scoped>
.app {
  position: relative;
  min-height: 100vh;
}
</style>

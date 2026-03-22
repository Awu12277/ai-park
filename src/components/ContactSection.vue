<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isVisible = ref(false)
const form = ref({ name: '', email: '', subject: '', message: '' })
const submitting = ref(false)
const submitted = ref(false)
const errors = ref({})

function validate() {
  errors.value = {}
  if (!form.value.name.trim()) errors.value.name = t('contact.form.nameRequired')
  if (!form.value.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email))
    errors.value.email = t('contact.form.emailRequired')
  if (!form.value.message.trim()) errors.value.message = t('contact.form.messageRequired')
  return Object.keys(errors.value).length === 0
}

function handleSubmit() {
  if (!validate()) return
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    submitted.value = true
    form.value = { name: '', email: '', subject: '', message: '' }
    setTimeout(() => { submitted.value = false }, 5000)
  }, 1500)
}

const socials = [
  { key: 'wechat', handle: 'dxw333dxw', icon: '⌥' },
  { key: 'github', handle: 'https://github.com/Awu12277', icon: '⌥' },
  { key: 'email', handle: '2497436726@qq.com', icon: '✉' },
  { key: 'location', handle: '上海市', icon: '✦' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) isVisible.value = true
    },
    { threshold: 0.1 }
  )
  const el = document.querySelector('#contact')
  if (el) observer.observe(el)
})
</script>

<template>
  <section class="section contact-section" id="contact">
    <div class="container">
      <div class="contact-grid" :class="{ visible: isVisible }">

        <!-- Left: Info -->
        <div class="contact-info">
          <h2 class="section-title">
            {{ t('contact.title') }} <span class="accent">{{ t('contact.subtitle') }}</span>
          </h2>
          <p class="contact-desc">
            {{ t('contact.desc') }}
          </p>

          <div class="socials">
            <a class="social-item" v-for="s in socials" :key="s.key" href="#">
              <span class="social-icon">{{ s.icon }}</span>
              <div>
                <span class="social-name">{{ t(`contact.socials.${s.key}`) }}</span>
                <span class="social-handle">{{ s.handle }}</span>
              </div>
              <svg class="social-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
          </div>

          <!-- Decorative terminal -->
          <div class="terminal-block">
            <div class="terminal-header">
              <span class="t-dot" style="background:#ff5f56"></span>
              <span class="t-dot" style="background:#ffbd2e"></span>
              <span class="t-dot" style="background:#27c93f"></span>
              <span class="t-title">{{ t('contact.terminal.title') }}</span>
            </div>
            <pre class="terminal-body"><code><span class="t-cmd">$</span> <span class="t-fn">send_message</span>(<span class="t-str">"hello"</span>)
<span class="t-out">{{ t('contact.terminal.response') }}</span></code></pre>
          </div>
        </div>

        <!-- Right: Form -->
        <div class="contact-form-wrapper">
          <form class="contact-form glass-card" @submit.prevent="handleSubmit">
            <div class="form-header">
              <span class="form-icon">⬡</span>
              <h3>{{ t('contact.form.header') }}</h3>
            </div>

            <!-- Success State -->
            <div v-if="submitted" class="success-state">
              <div class="success-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--neon-cyan)" stroke-width="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <p class="success-text">{{ t('contact.form.success') }}</p>
              <p class="success-sub">{{ t('contact.form.successSub') }}</p>
            </div>

            <template v-else>
              <div class="form-row">
                <div class="form-group" :class="{ error: errors.name }">
                  <label>{{ t('contact.form.name') }}</label>
                  <input
                    type="text"
                    v-model="form.name"
                    :placeholder="t('contact.form.namePlaceholder')"
                    autocomplete="off"
                  />
                  <span class="err-msg" v-if="errors.name">{{ errors.name }}</span>
                </div>
                <div class="form-group" :class="{ error: errors.email }">
                  <label>{{ t('contact.form.email') }}</label>
                  <input
                    type="email"
                    v-model="form.email"
                    :placeholder="t('contact.form.emailPlaceholder')"
                    autocomplete="off"
                  />
                  <span class="err-msg" v-if="errors.email">{{ errors.email }}</span>
                </div>
              </div>

              <div class="form-group">
                <label>{{ t('contact.form.subject') }}</label>
                <input
                  type="text"
                  v-model="form.subject"
                  :placeholder="t('contact.form.subjectPlaceholder')"
                  autocomplete="off"
                />
              </div>

              <div class="form-group" :class="{ error: errors.message }">
                <label>{{ t('contact.form.message') }}</label>
                <textarea
                  v-model="form.message"
                  :placeholder="t('contact.form.messagePlaceholder')"
                  rows="5"
                ></textarea>
                <span class="err-msg" v-if="errors.message">{{ errors.message }}</span>
              </div>

              <button
                type="submit"
                class="btn-neon btn-neon--filled submit-btn"
                :disabled="submitting"
              >
                <span v-if="!submitting">
                  {{ t('contact.form.submit') }}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                  </svg>
                </span>
                <span v-else class="loading">
                  <span class="dot"></span>
                  <span class="dot"></span>
                  <span class="dot"></span>
                </span>
              </button>
            </template>
          </form>
        </div>

      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <span class="logo-bracket">[</span>
            <span class="logo-text">DING.XUEWU</span>
            <span class="logo-bracket">]</span>
          </div>
          <p class="footer-copy">
            {{ t('contact.footer.copy') }}
          </p>
          <p class="footer-tech">{{ t('contact.footer.tech') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.contact-grid.visible {
  opacity: 1;
  transform: translateY(0);
}

.contact-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 40px;
}

.socials {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 40px;
}

.social-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 18px;
  background: var(--bg-glass);
  border: 1px solid rgba(0, 240, 255, 0.06);
  border-radius: 8px;
  text-decoration: none;
  transition: var(--transition-smooth);
  cursor: pointer;
}

.social-item:hover {
  border-color: rgba(0, 240, 255, 0.2);
  background: rgba(0, 240, 255, 0.03);
  transform: translateX(6px);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.05);
}

.social-icon {
  font-size: 1.2rem;
  color: var(--neon-cyan);
  width: 24px;
  text-align: center;
}

.social-name {
  display: block;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.05em;
}

.social-handle {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
}

.social-arrow {
  margin-left: auto;
  color: var(--text-muted);
  transition: var(--transition-fast);
}

.social-item:hover .social-arrow {
  color: var(--neon-cyan);
  transform: translate(2px, -2px);
}

/* Terminal */
.terminal-block {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 240, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.terminal-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(0, 240, 255, 0.06);
}

.t-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.t-title {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--text-muted);
  margin-left: 8px;
}

.terminal-body {
  padding: 16px;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  line-height: 1.8;
}

.t-cmd { color: var(--neon-cyan); }
.t-fn { color: var(--neon-purple); }
.t-str { color: var(--neon-green); }
.t-out { color: var(--text-muted); font-style: italic; }

/* Form */
.contact-form {
  padding: 36px;
}

.form-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.form-icon {
  font-size: 1.4rem;
  color: var(--neon-cyan);
  text-shadow: 0 0 10px var(--glow-cyan);
}

.form-header h3 {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--text-primary);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 240, 255, 0.1);
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text-primary);
  outline: none;
  transition: var(--transition-smooth);
  resize: none;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-muted);
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--neon-cyan);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.1);
}

.form-group.error input,
.form-group.error textarea {
  border-color: var(--neon-orange);
}

.err-msg {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--neon-orange);
  margin-top: 4px;
}

.submit-btn {
  width: 100%;
  justify-content: center;
  margin-top: 8px;
  font-size: 0.85rem;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.loading {
  display: flex;
  gap: 6px;
  align-items: center;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #000;
  animation: loadingDot 1.4s ease-in-out infinite;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes loadingDot {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

.success-state {
  text-align: center;
  padding: 40px 0;
}

.success-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid var(--neon-cyan);
  box-shadow: 0 0 30px var(--glow-cyan);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  animation: fadeInUp 0.5s ease;
}

.success-text {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--neon-cyan);
  text-shadow: 0 0 15px var(--glow-cyan);
  margin-bottom: 8px;
}

.success-sub {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* Footer */
.footer {
  margin-top: 100px;
  padding: 40px 0;
  border-top: 1px solid rgba(0, 240, 255, 0.06);
}

.footer-content {
  text-align: center;
}

.footer-logo {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}

.logo-bracket {
  color: var(--neon-cyan);
  text-shadow: 0 0 15px var(--glow-cyan);
}

.logo-text {
  color: var(--text-primary);
}

.footer-copy {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.footer-heart {
  color: var(--neon-magenta);
}

.footer-tech {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 50px;
  }
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .contact-form {
    padding: 24px;
  }
}
</style>

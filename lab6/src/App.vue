<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="app-container">
    <header class="header">
      <h1>Інтернет-каталог FORMA</h1>
      <nav class="site-nav" aria-label="Основна навігація">
        <RouterLink :to="{ name: 'products' }">Каталог</RouterLink>
        <RouterLink :to="{ name: 'about' }">Про застосунок</RouterLink>
      </nav>
    </header>

    <main id="page-content" class="main-content">
      <RouterView />
    </main>

    <footer class="footer">
      <p>Студентка: Щевелева Анна Андріївна | Група: 7.F2.25-2 | Спеціальність: Інженерія програмного забезпечення</p>
      <p>Середовище: Node.js 24 LTS, Vue 3, Vue Router 4.6.4, 2026</p>
    </footer>
  </div>
</template>

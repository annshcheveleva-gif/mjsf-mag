<script setup>
import MaterialCatalog from './components/MaterialCatalog.vue'
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Сучасні каркаси web-додатків</h1>
      <p class="app-subtitle">Лабораторна робота 2: Компоненти та реактивність</p>
      <div class="student-info">
        <p><strong>Студентка:</strong> Щевелева Анна</p>
        <p><strong>Група:</strong> 7.F2.25-2</p>
        <p><strong>Спеціальність:</strong> 121 Інженерія програмного забезпечення</p>
        <p><strong>Освітній рівень:</strong> Магістр</p>
        <p><strong>ЗВО:</strong> Запорізький національний університет</p>
      </div>
    </header>

    <main class="app-main">
      <MaterialCatalog />
    </main>
  </div>
</template>

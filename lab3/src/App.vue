<script setup>
import MaterialCatalog from './components/MaterialCatalog.vue'
</script>

<template>
  <div class="max-w-5xl mx-auto p-6 flex flex-col gap-6">
    <!-- Шапка із даними студента (необхідно для звітів) -->
    <header class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800 m-0 mb-1">Сучасні каркаси web-додатків</h1>
        <p class="text-slate-500 font-medium m-0">Лабораторна робота 3: Складені компоненти, Teleport і Transition</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-sm text-slate-600">
        <div><strong>Студентка:</strong> Щевелева Анна</div>
        <div><strong>Група:</strong> 7.F2.25-2</div>
        <div><strong>Спеціальність:</strong> 121 Інженерія програмного забезпечення</div>
        <div><strong>ЗВО:</strong> Запорізький національний університет</div>
      </div>
    </header>

    <!-- Основний каталог матеріалів -->
    <main>
      <MaterialCatalog />
    </main>
  </div>
</template>

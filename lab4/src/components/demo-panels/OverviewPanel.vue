<script setup>
import { ref } from 'vue'

const note = ref('')
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-xl font-bold text-slate-800">Панель огляду (Overview)</h3>
    <p class="text-slate-600">Ця панель містить локальне поле введення нотатки для перевірки збереження стану KeepAlive.</p>
    <div class="space-y-2">
      <label class="block text-sm font-semibold text-slate-700">Особиста нотатка:</label>
      <textarea
        v-model="note"
        rows="3"
        placeholder="Введіть довільний текст тут..."
        class="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
      ></textarea>
    </div>
  </div>
</template>

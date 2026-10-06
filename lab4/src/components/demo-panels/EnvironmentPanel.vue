<script setup>
import { ref } from 'vue'
import ModalDialog from '../ModalDialog.vue'

const isModalOpen = ref(false)
const clickCounter = ref(0)
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-xl font-bold text-slate-800">Середовище та діалог (Environment)</h3>
    <p class="text-slate-600">Відомості про середовище розробки та взаємодія з ModalDialog без втрати стану.</p>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <span class="block text-xs font-semibold text-slate-400 uppercase">Технології</span>
        <span class="text-slate-800 font-bold">Vue 3 SFC, Vite, Tailwind CSS</span>
      </div>
      <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <span class="block text-xs font-semibold text-slate-400 uppercase">Лічильник взаємодій</span>
        <div class="flex items-center justify-between mt-1">
          <span class="text-slate-800 font-bold">{{ clickCounter }} раз(ів)</span>
          <button
            @click="clickCounter++"
            class="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors"
          >
            Збільшити
          </button>
        </div>
      </div>
    </div>

    <div>
      <button
        @click="isModalOpen = true"
        class="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm"
      >
        Відкрити модальне вікно
      </button>
    </div>

    <ModalDialog :isOpen="isModalOpen" title="Демонстраційний діалог" @close="isModalOpen = false">
      <p class="text-slate-600">Це модальне вікно підключено з лабораторної роботи №3. Його закриття чи відкриття не скидає локальний стан панелі середовища.</p>
    </ModalDialog>
  </div>
</template>

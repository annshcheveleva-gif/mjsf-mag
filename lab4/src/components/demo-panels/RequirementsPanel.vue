<script setup>
import { ref } from 'vue'

const requirements = ref([
  { id: 1, text: 'Архітектура складеного компонента (Compound Component)', completed: true },
  { id: 2, text: 'Передавання контексту через Provide / Inject та Symbol', completed: true },
  { id: 3, text: 'Підтримка KeepAlive та динамічних компонентів', completed: false }
])

const completedCount = ref(2)

const updateCount = () => {
  completedCount.value = requirements.value.filter(r => r.completed).length
}
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-xl font-bold text-slate-800">Вимоги проекту (Requirements)</h3>
    <p class="text-slate-600">Інтерактивний список вимог із прапорцями та лічильником виконаних пунктів.</p>
    
    <div class="space-y-3">
      <label
        v-for="req in requirements"
        :key="req.id"
        class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors"
      >
        <input
          type="checkbox"
          v-model="req.completed"
          @change="updateCount"
          class="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
        />
        <span :class="{'line-through text-slate-400': req.completed}" class="text-slate-700 font-medium">
          {{ req.text }}
        </span>
      </label>
    </div>

    <div class="text-sm font-semibold text-slate-600 bg-blue-50 text-blue-700 p-3 rounded-xl border border-blue-100">
      Виконано пунктів: <span class="font-bold">{{ completedCount }}</span> з {{ requirements.length }}
    </div>
  </div>
</template>

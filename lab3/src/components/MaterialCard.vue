<script setup>
defineProps({
  material: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select', 'edit', 'delete'])
</script>

<template>
  <div 
    class="bg-white border rounded-xl p-5 flex flex-col justify-between gap-4 transition-all shadow-sm"
    :class="isSelected ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200'"
  >
    <div class="flex justify-between items-start">
      <div>
        <h3 class="font-bold text-lg text-slate-800 m-0">{{ material.title }}</h3>
        <p class="text-xs text-slate-500 uppercase tracking-wider mt-1">{{ material.category }}</p>
      </div>
      <span class="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
        {{ material.minutes }} хв
      </span>
    </div>

    <p class="text-sm text-slate-600 m-0 leading-relaxed">{{ material.description }}</p>

    <div class="flex items-center justify-between pt-3 border-t border-slate-100">
      <button 
        type="button"
        class="px-3.5 py-1.5 text-sm font-medium rounded-lg border transition-colors"
        :class="isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'"
        @click="$emit('select', material.id)"
      >
        {{ isSelected ? 'Обрано' : 'Обрати' }}
      </button>

      <div class="flex gap-2">
        <button 
          type="button" 
          class="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          @click="$emit('edit', material)"
        >
          Редагувати
        </button>
        <button 
          type="button" 
          class="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          @click="$emit('delete', material.id)"
        >
          Видалити
        </button>
      </div>
    </div>
  </div>
</template>

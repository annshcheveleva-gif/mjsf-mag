<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Діалогове вікно'
  }
})

defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 class="text-lg font-bold text-slate-800">{{ title }}</h3>
          <button
            @click="$emit('close')"
            class="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
          >
            ✕
          </button>
        </div>
        <div class="p-6">
          <slot />
        </div>
        <div class="flex justify-end px-6 py-4 bg-slate-50 border-t border-slate-100">
          <button
            @click="$emit('close')"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm"
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

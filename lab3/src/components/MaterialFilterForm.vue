<script setup>
defineProps({
  searchQuery: String,
  selectedCategory: String,
  categories: Array
})

defineEmits(['update:searchQuery', 'update:selectedCategory', 'reset'])
</script>

<template>
  <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-end">
    <div class="flex-1 min-w-[220px] flex flex-col gap-1.5">
      <label for="search" class="text-xs font-semibold text-slate-600">Пошук за назвою</label>
      <input 
        id="search"
        type="text" 
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        placeholder="Введіть назву..."
        class="px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
    </div>

    <div class="w-full sm:w-64 flex flex-col gap-1.5">
      <label for="category" class="text-xs font-semibold text-slate-600">Тема</label>
      <select 
        id="category"
        :value="selectedCategory"
        @change="$emit('update:selectedCategory', $event.target.value)"
        class="px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Усі теми</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <button 
      type="button"
      @click="$emit('reset')"
      class="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
    >
      Очистити
    </button>
  </div>
</template>

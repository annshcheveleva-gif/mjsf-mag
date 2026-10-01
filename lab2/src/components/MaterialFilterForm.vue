<script setup>
import { reactive } from 'vue'

const filterForm = reactive({
  query: '',
  topic: 'all'
})

const emit = defineEmits(['apply', 'clear'])

function submitFilters() {
  emit('apply', { ...filterForm })
}

function clearFilters() {
  filterForm.query = ''
  filterForm.topic = 'all'
  emit('clear')
}
</script>

<template>
  <form 
    class="filters" 
    @submit.prevent="submitFilters"
    @reset.prevent="clearFilters"
    @keydown.esc="clearFilters"
  >
    <div class="filters__field">
      <label for="search-query">Пошук за назвою</label>
      <input 
        id="search-query"
        v-model.trim="filterForm.query" 
        type="text" 
        placeholder="Введіть назву..."
      >
    </div>

    <div class="filters__field">
      <label for="topic-select">Тема</label>
      <select id="topic-select" v-model="filterForm.topic">
        <option value="all">Усі теми</option>
        <option value="vue">Vue</option>
        <option value="html">HTML</option>
      </select>
    </div>

    <div class="filters__actions">
      <button type="submit" class="button button--primary">Застосувати</button>
      <button type="reset" class="button button--secondary">Очистити</button>
    </div>
  </form>
</template>

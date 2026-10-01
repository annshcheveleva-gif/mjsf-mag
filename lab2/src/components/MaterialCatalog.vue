<script setup>
import { ref, reactive, computed } from 'vue'
import { materials } from '../data/materials'
import MaterialFilterForm from './MaterialFilterForm.vue'
import MaterialCard from './MaterialCard.vue'

const activeFilters = reactive({
  query: '',
  topic: 'all'
})

const selectedTitle = ref(materials[0]?.title ?? '')

function applyFilters(newFilters) {
  activeFilters.query = newFilters.query
  activeFilters.topic = newFilters.topic
}

function clearFilters() {
  activeFilters.query = ''
  activeFilters.topic = 'all'
}

const filteredMaterials = computed(() => {
  return materials.filter((material) => {
    const matchesQuery = material.title
      .toLowerCase()
      .includes(activeFilters.query.toLowerCase())
    const matchesTopic =
      activeFilters.topic === 'all' || material.topic === activeFilters.topic
    return matchesQuery && matchesTopic
  })
})

const totalMinutes = computed(() => {
  return filteredMaterials.value.reduce((sum, material) => sum + material.minutes, 0)
})
</script>

<template>
  <section class="catalog">
    <MaterialFilterForm @apply="applyFilters" @clear="clearFilters" />

    <div class="catalog__summary">
      <p>Знайдено: {{ filteredMaterials.length }} • Загальна тривалість: {{ totalMinutes }} хв</p>
      <p class="catalog__selected-info">Вибраний матеріал: <strong>{{ selectedTitle || 'Не вибрано' }}</strong></p>
    </div>

    <div v-if="filteredMaterials.length > 0" class="catalog__grid">
      <MaterialCard 
        v-for="material in filteredMaterials" 
        :key="material.id"
        :title="material.title"
        :topic="material.topic"
        :description="material.description"
        :minutes="material.minutes"
        :selected="material.title === selectedTitle"
        @select="selectedTitle = $event"
      />
    </div>

    <p v-else class="catalog__empty">
      За заданими умовами матеріалів немає.
    </p>
  </section>
</template>

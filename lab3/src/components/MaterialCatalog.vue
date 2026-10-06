<script setup>
import { ref, computed, nextTick } from 'vue'
import { materials as initialMaterials } from '../data/materials'
import MaterialFilterForm from './MaterialFilterForm.vue'
import MaterialCard from './MaterialCard.vue'
import ModalDialog from './ModalDialog.vue'

const items = ref(initialMaterials.map(m => ({ ...m })))
const selectedId = ref(items.value[0]?.id ?? null)

const searchQuery = ref('')
const selectedCategory = ref('')

const isOpen = ref(false)
const dialogMode = ref('edit') // 'edit' або 'delete'
const activeMaterialId = ref(null)

// Чернетка для редагування
const draft = ref({ title: '', minutes: '' })
const errorMessage = ref('')

// Шаблонні посилання для фокуса
const nameInputRef = ref(null)
const catalogHeadingRef = ref(null)

const categories = computed(() => [...new Set(initialMaterials.map(m => m.category))])

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase().trim())
    const matchesCategory = !selectedCategory.value || item.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const totalMinutes = computed(() => {
  return filteredItems.value.reduce((sum, item) => sum + Number(item.minutes), 0)
})

const selectedMaterial = computed(() => {
  return items.value.find(m => m.id === selectedId.value) || null
})

const handleSelect = (id) => {
  selectedId.value = id
}

const handleReset = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
}

// Відкриття модального вікна для редагування
const openEditModal = (material) => {
  dialogMode.value = 'edit'
  activeMaterialId.value = material.id
  draft.value = { title: material.title, minutes: material.minutes }
  errorMessage.value = ''
  isOpen.value = true
}

// Відкриття модального вікна для видалення
const openDeleteModal = (id) => {
  dialogMode.value = 'delete'
  activeMaterialId.value = id
  errorMessage.value = ''
  isOpen.value = true
}

const handleSaveEdit = () => {
  const trimmedTitle = draft.value.title.trim()
  const parsedMinutes = Number(draft.value.minutes)

  if (!trimmedTitle) {
    errorMessage.value = 'Назва не може бути порожньою.'
    return
  }
  if (!Number.isInteger(parsedMinutes) || parsedMinutes <= 0) {
    errorMessage.value = 'Тривалість має бути додатним цілим числом.'
    return
  }

  const target = items.value.find(m => m.id === activeMaterialId.value)
  if (target) {
    target.title = trimmedTitle
    target.minutes = parsedMinutes
  }
  isOpen.value = false
}

const handleConfirmDelete = () => {
  const index = items.value.findIndex(m => m.id === activeMaterialId.value)
  if (index !== -1) {
    items.value.splice(index, 1)
    if (selectedId.value === activeMaterialId.value) {
      selectedId.value = items.value[0]?.id ?? null
    }
  }
  isOpen.value = false
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <h2 ref="catalogHeadingRef" tabindex="-1" class="text-xl font-bold text-slate-800 m-0 outline-none">
      Каталог навчальних матеріалів
    </h2>

    <MaterialFilterForm 
      v-model:searchQuery="searchQuery"
      v-model:selectedCategory="selectedCategory"
      :categories="categories"
      @reset="handleReset"
    />

    <div class="flex justify-between items-center text-sm text-slate-600 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm">
      <span>Знайдено: <strong>{{ filteredItems.length }}</strong> • Загальна тривалість: <strong>{{ totalMinutes }} хв</strong></span>
      <span>Вибраний матеріал: <strong>{{ selectedMaterial ? selectedMaterial.title : 'Не вибрано' }}</strong></span>
    </div>

    <!-- Сітка карток -->
    <div v-if="filteredItems.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <MaterialCard 
        v-for="material in filteredItems"
        :key="material.id"
        :material="material"
        :is-selected="material.id === selectedId"
        @select="handleSelect"
        @edit="openEditModal"
        @delete="openDeleteModal"
      />
    </div>

    <div v-else class="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500">
      За вашим запитом матеріалів не знайдено.
    </div>

    <!-- Універсальне модальне вікно -->
    <ModalDialog 
      v-model="isOpen"
      :title="dialogMode === 'edit' ? 'Редагувати матеріал' : 'Підтвердження видалення'"
      :initial-focus="dialogMode === 'edit' ? nameInputRef : null"
      :fallback-focus="catalogHeadingRef"
    >
      <!-- Сценарій 1: Редагування -->
      <form v-if="dialogMode === 'edit'" id="material-edit-form" @submit.prevent="handleSaveEdit" class="flex flex-col gap-4">
        <div class="flex flex-col gap-1.5">
          <label for="mat-title" class="text-xs font-semibold text-slate-600">Назва матеріалу</label>
          <input 
            id="mat-title"
            ref="nameInputRef"
            type="text"
            v-model="draft.title"
            class="px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
            required
          >
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="mat-minutes" class="text-xs font-semibold text-slate-600">Тривалість (хв)</label>
          <input 
            id="mat-minutes"
            type="number"
            v-model="draft.minutes"
            class="px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
            min="1"
            required
          >
        </div>

        <p v-if="errorMessage" class="text-red-500 text-xs m-0">{{ errorMessage }}</p>
      </form>

      <!-- Сценарій 2: Видалення -->
      <div v-else class="flex flex-col gap-2">
        <p class="text-slate-600 m-0 leading-relaxed">
          Ви дійсно хочете видалити цей матеріал? Цю дію неможливо скасувати.
        </p>
      </div>

      <!-- Іменований слот footer -->
      <template #footer="{ close }">
        <button 
          type="button"
          class="px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
          @click="close"
        >
          Скасувати
        </button>

        <button 
          v-if="dialogMode === 'edit'"
          type="submit"
          form="material-edit-form"
          class="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
        >
          Зберегти
        </button>

        <button 
          v-else
          type="button"
          class="px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
          @click="handleConfirmDelete"
        >
          Видалити
        </button>
      </template>
    </ModalDialog>
  </div>
</template>

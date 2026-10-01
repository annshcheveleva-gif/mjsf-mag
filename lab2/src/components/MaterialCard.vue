<script setup>
defineProps({
  title: { type: String, required: true },
  topic: { type: String, required: true },
  description: { type: String, required: true },
  minutes: { type: Number, required: true },
  selected: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])
</script>

<template>
  <article 
    class="material-card" 
    :class="[`material-card--${topic}`, { 'material-card--selected': selected }]"
  >
    <header class="material-card__header">
      <h3 class="material-card__title">{{ title }}</h3>
      <span class="material-card__topic">{{ topic.toUpperCase() }}</span>
    </header>
    <p class="material-card__description">{{ description }}</p>
    <footer class="material-card__footer">
      <span class="material-card__minutes">{{ minutes }} хв</span>
      <button 
        type="button" 
        class="material-card__button"
        :aria-pressed="selected"
        @click="emit('select', title)"
      >
        {{ selected ? 'Обрано' : 'Обрати' }}
      </button>
    </footer>
  </article>
</template>

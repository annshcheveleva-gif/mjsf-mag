<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="search-form">
    <label for="search-input" class="search-form__label">Пошук товарів:</label>
    <input
      id="search-input"
      type="text"
      class="search-form__input"
      placeholder="Введіть назву товару..."
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

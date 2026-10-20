<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <nav class="breadcrumbs" aria-label="Навігаційний ланцюжок">
    <ol class="breadcrumbs__list">
      <li v-for="(item, index) in items" :key="item.to.name" class="breadcrumbs__item">
        <span v-if="index" class="breadcrumbs__separator" aria-hidden="true">/</span>
        <span v-if="index === items.length - 1" class="breadcrumbs__current" aria-current="page">{{ item.label }}</span>
        <RouterLink v-else class="breadcrumbs__link" :to="item.to">{{ item.label }}</RouterLink>
      </li>
    </ol>
  </nav>
</template>

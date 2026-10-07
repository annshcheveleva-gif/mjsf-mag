<script setup>
import { ref } from 'vue';
import { useIntersectionObserver } from '../composables/useIntersectionObserver.js';

const props = defineProps({
  loaded: { type: Number, required: true },
  total: { type: Number, required: true },
  isLoading: { type: Boolean, default: false },
  error: { type: [Error, null], default: null },
  hasMore: { type: Boolean, default: true }
});

const emit = defineEmits(['load-more', 'retry']);

const sentinelRef = ref(null);

useIntersectionObserver(sentinelRef, () => {
  if (!props.isLoading && !props.error && props.hasMore) {
    emit('load-more');
  }
}, {
  rootMargin: '280px 0px',
  threshold: 0.01
});
</script>

<template>
  <div class="catalog-load-more" ref="sentinelRef">
    <div v-if="isLoading" class="catalog-load-more__status">
      <span class="spinner"></span> Завантаження наступних товарів...
    </div>
    <div v-else-if="error" class="catalog-load-more__status catalog-load-more__status--error">
      <p>Не вдалося завантажити сторінку.</p>
      <button class="btn btn--small" @click="$emit('retry')">Повторити</button>
    </div>
    <div v-else-if="!hasMore && loaded > 0" class="catalog-load-more__status">
      <p>Усі товари завантажено ({{ loaded }} з {{ total }})</p>
    </div>
  </div>
</template>

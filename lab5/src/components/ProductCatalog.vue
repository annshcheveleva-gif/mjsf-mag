<script setup>
import ProductCard from './ProductCard.vue';

defineProps({
  products: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  error: {
    type: [Error, null],
    default: null
  }
});

defineEmits(['retry']);
</script>

<template>
  <section class="product-catalog">
    <div v-if="error" class="product-catalog__state product-catalog__state--error">
      <p>Сталася помилка завантаження: {{ error.message }}</p>
      <button class="btn" @click="$emit('retry')">Спробувати знову</button>
    </div>

    <div v-else-if="products.length === 0 && !isLoading" class="product-catalog__state product-catalog__state--empty">
      <p>Товарів не знайдено.</p>
    </div>

    <div v-else class="product-catalog__grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <div v-if="isLoading && products.length === 0" class="product-catalog__state product-catalog__state--loading">
      <p>Початкове завантаження каталогу...</p>
    </div>
  </section>
</template>

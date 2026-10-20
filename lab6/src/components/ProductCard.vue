<script setup>
import { useRoute } from 'vue-router';

defineProps({
  product: { type: Object, required: true }
});

const route = useRoute();
</script>

<template>
  <article class="product-card">
    <RouterLink
      :to="{ name: 'product-overview', params: { id: product.id }, query: route.query }"
      class="product-card__link"
    >
      <div class="product-card__image-wrapper">
        <img :src="product.thumbnail" :alt="product.title" class="product-card__image" loading="lazy" />
      </div>
      <div class="product-card__content">
        <h3 class="product-card__title">{{ product.title }}</h3>
        <p class="product-card__category">{{ product.category }}</p>
        <p class="product-card__price">${{ product.price }}</p>
      </div>
    </RouterLink>
  </article>
</template>

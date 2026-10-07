<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <article class="product-card">
    <div class="product-card__image-wrapper">
      <img :src="product.thumbnail" :alt="product.title" class="product-card__image" loading="lazy" />
    </div>
    <div class="product-card__content">
      <h3 class="product-card__title">{{ product.title }}</h3>
      <p class="product-card__category">{{ product.category }}</p>
      <p class="product-card__price">${{ product.price }}</p>
    </div>
  </article>
</template>

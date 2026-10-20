<script setup>
defineProps({ product: { type: Object, required: true } });
</script>
<template>
  <div class="product-reviews">
    <h3>Відгуки покупців</h3>
    <div v-if="!product.reviews || product.reviews.length === 0" class="no-reviews">
      <p>Для цього товару поки немає відгуків.</p>
    </div>
    <ul v-else class="reviews-list">
      <li v-for="(review, idx) in product.reviews" :key="idx" class="review-item">
        <div class="review-item__header">
          <strong>{{ review.reviewerName }}</strong>
          <span>⭐ {{ review.rating }}/5</span>
        </div>
        <p>{{ review.comment }}</p>
        <small>{{ new Date(review.date).toLocaleDateString() }}</small>
      </li>
    </ul>
    <RouterLink :to="{ name: 'products' }" class="back-link">← Повернутися до каталогу</RouterLink>
  </div>
</template>

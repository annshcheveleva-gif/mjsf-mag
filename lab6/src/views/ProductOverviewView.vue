<script setup>
defineProps({ product: { type: Object, required: true } });
</script>
<template>
  <div class="product-overview">
    <h3>Про товар</h3>
    <p>{{ product.description }}</p>
    <ul class="product-overview__specs">
      <li><strong>Бренд:</strong> {{ product.brand || 'N/A' }}</li>
      <li><strong>Категорія:</strong> {{ product.category }}</li>
      <li><strong>Гарантія:</strong> {{ product.warrantyInformation || 'Стандартна' }}</li>
    </ul>
    <RouterLink :to="{ name: 'products' }" class="back-link">← Повернутися до каталогу</RouterLink>
  </div>
</template>

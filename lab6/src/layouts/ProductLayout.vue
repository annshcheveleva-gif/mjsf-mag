<script setup>
import { computed } from 'vue';
import { useRoute, RouterLink, RouterView } from 'vue-router';
import { useFetch } from '../composables/useFetch.js';
import { useBreadcrumbs } from '../composables/useBreadcrumbs.js';
import Breadcrumbs from '../components/Breadcrumbs.vue';

const route = useRoute();
const validId = computed(() => /^[1-9]\d*$/.test(String(route.params.id)));

const url = computed(() => validId.value ? `https://dummyjson.com/products/${route.params.id}?delay=800` : null);
const { data: product, error, isLoading, refetch } = useFetch(url);

const isMissing = computed(() => !validId.value || error.value?.status === 404 || product.value === null);
const productTitle = computed(() => isMissing.value ? 'Товар не знайдено' : (product.value?.title || ''));
const breadcrumbs = useBreadcrumbs(productTitle);

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
</script>

<template>
  <div class="product-layout">
    <Breadcrumbs :items="breadcrumbs" />

    <div v-if="isLoading" class="state-box">Завантаження товару...</div>
    <div v-else-if="error && error.status !== 404" class="state-box state-box--error">
      <p>Помилка завантаження: {{ error.message }}</p>
      <button class="btn" @click="refetch">Спробувати знову</button>
    </div>
    <div v-else-if="isMissing" class="state-box">
      <h2>Товар не знайдено</h2>
      <p>Заданий товар не існує або був видалений.</p>
      <RouterLink :to="{ name: 'products' }" class="btn">Повернутися до каталогу</RouterLink>
    </div>

    <template v-else-if="product">
      <div class="product-layout__header-card">
        <div class="product-layout__gallery">
          <img :src="product.thumbnail" :alt="product.title" class="product-layout__main-img" />
        </div>
        <div class="product-layout__details">
          <h2>{{ product.title }}</h2>
          <p class="product-layout__price">{{ currencyFormatter.format(product.price) }}</p>
          <p class="product-layout__rating">⭐ {{ product.rating }} / 5</p>
          <p class="product-layout__stock">Наявність: {{ product.stock > 0 ? 'В наявності' : 'Немає' }}</p>

          <nav class="product-sections" aria-label="Розділи товару">
            <RouterLink :to="{ name: 'product-overview', params: { id: product.id }, query: route.query }">Огляд</RouterLink>
            <RouterLink :to="{ name: 'product-reviews', params: { id: product.id }, query: route.query }">Відгуки <span>({{ product.reviews?.length || 0 }})</span></RouterLink>
          </nav>
        </div>
      </div>

      <div class="product-layout__content">
        <RouterView v-slot="{ Component }">
          <component :is="Component" :product="product" />
        </RouterView>
      </div>
    </template>
  </div>
</template>

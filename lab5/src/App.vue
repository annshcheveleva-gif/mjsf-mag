<script setup>
import { ref, computed, watch } from 'vue';
import { createProductsUrl } from './api/products.js';
import { useFetch } from './composables/useFetch.js';
import { useDebouncedValue } from './composables/useDebouncedValue.js';

import ProductSearchForm from './components/ProductSearchForm.vue';
import ProductCatalog from './components/ProductCatalog.vue';
import CatalogLoadMore from './components/CatalogLoadMore.vue';

const query = ref('');
const skip = ref(0);
const products = ref([]);
const total = ref(0);

const debouncedQuery = useDebouncedValue(query, 400);

const requestUrl = computed(() => {
  return createProductsUrl(debouncedQuery.value, skip.value, 12, 1500);
});

const { data, error, isLoading, abort, refetch } = useFetch(requestUrl);

// Негайне скасування активного запиту при зміні сирого query
watch(query, () => {
  abort();
}, { flush: 'sync' });

// При зміні debouncedQuery скидаємо skip та очищаємо накопичені товари
watch(debouncedQuery, () => {
  skip.value = 0;
  products.value = [];
});

// Обробка отриманих даних та накопичення сторінок без повторення id
watch(data, (newData) => {
  if (!newData) return;
  
  total.value = newData.total || 0;
  const incomingProducts = newData.products || [];

  if (skip.value === 0) {
    products.value = incomingProducts;
  } else {
    const existingIds = new Set(products.value.map(p => p.id));
    const uniqueNew = incomingProducts.filter(p => !existingIds.has(p.id));
    products.value = [...products.value, ...uniqueNew];
  }
});

const hasMore = computed(() => {
  return products.value.length < total.value;
});

function loadMore() {
  if (!hasMore.value || isLoading.value) return;
  skip.value += 12;
}
</script>

<template>
  <div class="app-container">
    <header class="header">
      <h1>Інтернет-каталог товарів (DummyJSON)</h1>
      <ProductSearchForm v-model="query" />
    </header>

    <main class="main-content">
      <div class="catalog-info" v-if="total > 0">
        <p>Знайдено результатів: <strong>{{ total }}</strong> | Показано: <strong>{{ products.length }}</strong></p>
      </div>

      <ProductCatalog
        :products="products"
        :isLoading="isLoading && skip === 0"
        :error="error"
        @retry="refetch"
      />

      <CatalogLoadMore
        :loaded="products.length"
        :total="total"
        :isLoading="isLoading && skip > 0"
        :error="error"
        :hasMore="hasMore"
        @load-more="loadMore"
        @retry="refetch"
      />
    </main>

    <footer class="footer">
      <p>Студентка: Щевелева Анна Андріївна | Група: 7.F2.25-2 | Спеціальність: Інженерія програмного забезпечення</p>
      <p>Середовище: Node.js 24 LTS, Vue 3 (Composition API, script setup), Браузерна розробка</p>
    </footer>
  </div>
</template>

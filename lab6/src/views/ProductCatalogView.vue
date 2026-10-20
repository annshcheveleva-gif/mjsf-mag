<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFetch } from '../composables/useFetch.js';
import { useDebouncedValue } from '../composables/useDebouncedValue.js';
import { createProductsUrl } from '../api/products.js';

import ProductSearchForm from '../components/ProductSearchForm.vue';
import ProductCatalog from '../components/ProductCatalog.vue';
import CatalogLoadMore from '../components/CatalogLoadMore.vue';

const route = useRoute();
const router = useRouter();

const initialQuery = typeof route.query.q === 'string' ? route.query.q : '';
const query = ref(initialQuery);
const searchDirty = ref(false);
const restoringQuery = ref(false);

const skip = ref(0);
const products = ref([]);
const total = ref(0);

const debouncedInput = useDebouncedValue(() => ({ query: query.value }), 400);

const requestUrl = computed(() => {
  const activeQ = typeof route.query.q === 'string' ? route.query.q : '';
  return createProductsUrl(activeQ, skip.value, 12, 800);
});

const { data, error, isLoading, abort, refetch } = useFetch(requestUrl);

watch(query, () => {
  if (restoringQuery.value) return;
  searchDirty.value = true;
  abort();
}, { flush: 'sync' });

watch(debouncedInput, async (val) => {
  if (!searchDirty.value || val.query.trim() !== query.value.trim()) return;

  const targetQ = val.query.trim() || undefined;
  const currentRouteQ = route.query.q;

  if (targetQ === currentRouteQ) {
    refetch();
  } else {
    await router.replace({
      name: 'products',
      query: { ...route.query, q: targetQ }
    });
  }
  searchDirty.value = false;
});

const routeQuery = computed(() => (typeof route.query.q === 'string' ? route.query.q : ''));

watch(routeQuery, (value) => {
  restoringQuery.value = true;
  query.value = value;
  restoringQuery.value = false;
  searchDirty.value = false;
  skip.value = 0;
  products.value = [];
  total.value = 0;
}, { flush: 'sync' });

watch(data, (newData) => {
  if (!newData) return;
  total.value = newData.total || 0;
  const incoming = newData.products || [];

  if (skip.value === 0) {
    products.value = incoming;
  } else {
    const existingIds = new Set(products.value.map(p => p.id));
    const uniqueNew = incoming.filter(p => !existingIds.has(p.id));
    products.value = [...products.value, ...uniqueNew];
  }
});

const hasMore = computed(() => products.value.length < total.value);

function loadMore() {
  if (!hasMore.value || isLoading.value) return;
  skip.value += 12;
}
</script>

<template>
  <div class="product-catalog-view">
    <div class="catalog-header">
      <ProductSearchForm v-model="query" />
    </div>

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
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useBreadcrumbs } from '../composables/useBreadcrumbs.js';
import Breadcrumbs from '../components/Breadcrumbs.vue';

const breadcrumbs = useBreadcrumbs();
</script>

<template>
  <div class="not-found-view">
    <Breadcrumbs :items="breadcrumbs" />
    <h2>404 — Сторінку не знайдено</h2>
    <p>Шуканий ресурс не існує або адреса введена некоректно.</p>
    <RouterLink :to="{ name: 'products' }" class="btn">Повернутися до каталогу</RouterLink>
  </div>
</template>

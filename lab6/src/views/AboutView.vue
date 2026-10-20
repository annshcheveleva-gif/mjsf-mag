<script setup>
import { useBreadcrumbs } from '../composables/useBreadcrumbs.js';
import Breadcrumbs from '../components/Breadcrumbs.vue';

const breadcrumbs = useBreadcrumbs();
</script>

<template>
  <div class="about-view">
    <Breadcrumbs :items="breadcrumbs" />
    <h2>Про застосунок</h2>
    <p>Цей застосунок є інтернет-каталогом товарів FORMA, розробленим у межах лабораторних робіт з дисципліни «Сучасні каркаси web-додатків» .</p>
    <p>Використовує Vue 3, Composition API та Vue Router 4 для повноцінної клієнтської маршрутизації.</p>
  </div>
</template>

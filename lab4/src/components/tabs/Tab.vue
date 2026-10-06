<script setup>
import { inject, onMounted, onBeforeUnmount, computed } from 'vue'
import { tabsKey } from './tabsKey'

const props = defineProps({
  slug: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  panel: {
    type: [Object, Function],
    default: null
  },
  panelProps: {
    type: Object,
    default: () => ({})
  }
})

const context = inject(tabsKey)
if (!context) {
  throw new Error('Компонент Tab повинен використовуватися всередині Tabs')
}

const { activeSlug, idPrefix, registerTab, unregisterTab } = context

onMounted(() => {
  registerTab({
    slug: props.slug,
    title: props.title,
    disabled: props.disabled
  })
})

onBeforeUnmount(() => {
  unregisterTab(props.slug)
})

const isActive = computed(() => activeSlug.value === props.slug)
</script>

<template>
  <section
    v-show="isActive"
    :id="`${idPrefix}-panel-${slug}`"
    class="tabs-panel"
    role="tabpanel"
    :aria-labelledby="`${idPrefix}-tab-${slug}`"
    tabindex="0"
  >
    <KeepAlive>
      <slot v-if="isActive && $slots.default" :is-active="isActive" />
      <component v-else-if="isActive && panel" :is="panel" v-bind="panelProps" />
    </KeepAlive>
  </section>
</template>

<style scoped lang="scss">
.tabs-panel {
  @apply bg-white p-6 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20;
}
</style>

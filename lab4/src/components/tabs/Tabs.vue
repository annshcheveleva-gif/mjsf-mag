<script setup>
import { provide, ref, useId, computed, watch, onMounted, onUnmounted } from 'vue'
import { tabsKey } from './tabsKey'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'underline'
  },
  label: {
    type: String,
    default: 'Система вкладок'
  }
})

const emit = defineEmits(['update:modelValue'])

const idPrefix = useId()
const tabs = ref([])
const tablistRef = ref(null)

const registerTab = (tab) => {
  if (tabs.value.some(t => t.slug === tab.slug)) {
    throw new Error(`Дублювання slug вкладки: "${tab.slug}"`)
  }
  tabs.value.push(tab)
  if (!props.modelValue && tabs.value.length === 1) {
    emit('update:modelValue', tab.slug)
  }
}

const unregisterTab = (slug) => {
  const index = tabs.value.findIndex(t => t.slug === slug)
  if (index !== -1) {
    tabs.value.splice(index, 1)
    if (props.modelValue === slug && tabs.value.length > 0) {
      const nextTab = tabs.value.find(t => !t.disabled) || tabs.value[0]
      if (nextTab) {
        emit('update:modelValue', nextTab.slug)
      }
    }
  }
}

const setActiveTab = (slug) => {
  const target = tabs.value.find(t => t.slug === slug)
  if (target && !target.disabled) {
    emit('update:modelValue', slug)
  }
}

provide(tabsKey, {
  activeSlug: computed(() => props.modelValue),
  idPrefix,
  setActiveTab,
  registerTab,
  unregisterTab
})

const handleKeydown = (event) => {
  const enabledTabs = tabs.value.filter(t => !t.disabled)
  if (enabledTabs.length === 0) return

  const currentIndex = enabledTabs.findIndex(t => t.slug === props.modelValue)
  let newIndex = currentIndex

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault()
    newIndex = (currentIndex + 1) % enabledTabs.length
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault()
    newIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length
  } else if (event.key === 'Home') {
    event.preventDefault()
    newIndex = 0
  } else if (event.key === 'End') {
    event.preventDefault()
    newIndex = enabledTabs.length - 1
  } else {
    return
  }

  const targetTab = enabledTabs[newIndex]
  setActiveTab(targetTab.slug)

  setTimeout(() => {
    const btn = tablistRef.value?.querySelector(`[data-slug="${targetTab.slug}"]`)
    if (btn) btn.focus()
  }, 0)
}
</script>

<template>
  <div :class="['tabs', `tabs--${variant}`]">
    <div
      ref="tablistRef"
      role="tablist"
      :aria-label="label"
      class="tabs__list"
      @keydown="handleKeydown"
    >
      <button
        v-for="tab in tabs"
        :key="tab.slug"
        :id="`${idPrefix}-tab-${tab.slug}`"
        type="button"
        role="tab"
        :aria-selected="modelValue === tab.slug ? 'true' : 'false'"
        :aria-controls="`${idPrefix}-panel-${tab.slug}`"
        :tabindex="modelValue === tab.slug ? '0' : '-1'"
        :disabled="tab.disabled"
        :data-slug="tab.slug"
        :class="[
          'tabs__tab',
          { 'tabs__tab--active': modelValue === tab.slug },
          { 'opacity-50 cursor-not-allowed': tab.disabled }
        ]"
        @click="setActiveTab(tab.slug)"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="tabs__content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs {
  @display: flex;
  @flex-direction: column;
  width: 100%;

  &__list {
    display: flex;
    gap: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
    margin-bottom: 1rem;
    overflow-x: auto;
  }

  &__tab {
    padding: 0.75rem 1.25rem;
    font-weight: 600;
    font-size: 0.95rem;
    color: #64748b;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    transition: all 0.2s ease;
    white-space: nowrap;
    cursor: pointer;

    &:hover:not(:disabled) {
      color: #0f172a;
    }

    &:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
  }

  &--underline {
    .tabs__tab--active {
      color: #2563eb;
      border-bottom-color: #2563eb;
    }
  }

  &--pills {
    .tabs__list {
      border-bottom: none;
      background-color: #f1f5f9;
      padding: 0.35rem;
      border-radius: 0.75rem;
    }
    .tabs__tab {
      border-bottom: none;
      margin-bottom: 0;
      border-radius: 0.5rem;
      &--active {
        background-color: #ffffff;
        color: #2563eb;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }

  &--boxed {
    .tabs__list {
      border-bottom: 1px solid #cbd5e1;
    }
    .tabs__tab {
      border: 1px solid transparent;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      margin-bottom: -1px;
      &--active {
        background-color: #ffffff;
        border-color: #cbd5e1;
        border-bottom-color: #ffffff;
        color: #1e293b;
      }
    }
  }
}
</style>

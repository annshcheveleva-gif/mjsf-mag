<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  initialFocus: {
    type: Object,
    default: null
  },
  fallbackFocus: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const modalPanel = ref(null)
let previousActiveElement = null

const close = () => {
  emit('update:modelValue', false)
}

const handleBackdropClick = () => {
  close()
}

// Керування фокусом, inert та подій клавіатури
watch(() => props.modelValue, async (isOpen) => {
  if (isOpen) {
    previousActiveElement = document.activeElement
    document.body.style.overflow = 'hidden'
    const appEl = document.getElementById('app')
    if (appEl) appEl.setAttribute('inert', '')

    await nextTick()
    if (props.initialFocus && typeof props.initialFocus.focus === 'function') {
      props.initialFocus.focus()
    } else if (modalPanel.value) {
      modalPanel.value.focus()
    }
  } else {
    document.body.style.overflow = ''
    const appEl = document.getElementById('app')
    if (appEl) appEl.removeAttribute('inert')

    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus()
    } else if (props.fallbackFocus && typeof props.fallbackFocus.focus === 'function') {
      props.fallbackFocus.focus()
    }
  }
})

const handleKeydown = (e) => {
  if (!props.modelValue) return
  if (e.key === 'Escape') {
    close()
    return
  }
  // Доступність Tab всередині модального вікна
  if (e.key === 'Tab' && modalPanel.value) {
    const focusableEls = modalPanel.value.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusableEls.length === 0) return
    const firstEl = focusableEls[0]
    const lastEl = focusableEls[focusableEls.length - 1]

    if (e.shiftKey && document.activeElement === firstEl) {
      lastEl.focus()
      e.preventDefault()
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      firstEl.focus()
      e.preventDefault()
    }
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
  const appEl = document.getElementById('app')
  if (appEl) appEl.removeAttribute('inert')
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="modelValue" 
        class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 box-border"
        @click.self="handleBackdropClick"
      >
        <div 
          ref="modalPanel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabindex="-1"
          class="bg-white w-full max-w-screen-sm max-h-[calc(100dvh-2rem)] flex flex-col rounded-2xl shadow-2xl overflow-hidden box-border outline-none"
        >
          <!-- Шапка вікна -->
          <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
            <h3 id="modal-title" class="text-lg font-bold text-slate-800 m-0">{{ title }}</h3>
            <button 
              type="button" 
              aria-label="Закрити вікно"
              class="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 bg-transparent border-none cursor-pointer"
              @click="close"
            >
              ✕
            </button>
          </div>

          <!-- Вміст (слот) -->
          <div class="p-6 min-h-0 overflow-y-auto break-words flex flex-col gap-4">
            <slot :close="close" />
          </div>

          <!-- Нижні кнопки (іменований слот footer) -->
          <div class="px-6 py-4 border-t border-slate-100 shrink-0 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <slot name="footer" :close="close" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

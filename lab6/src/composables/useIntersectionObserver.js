import { onMounted, onUnmounted, watch, toValue } from 'vue';

export function useIntersectionObserver(target, callback, options = {}) {
  let observer = null;

  function cleanup() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const element = toValue(target);
    if (!element) return;

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          callback();
        }
      }
    }, options);

    observer.observe(element);
  });

  watch(() => toValue(target), (newEl, oldEl) => {
    if (observer) {
      if (oldEl) observer.unobserve(oldEl);
      if (newEl) observer.observe(newEl);
    }
  });

  onUnmounted(() => {
    cleanup();
  });
}

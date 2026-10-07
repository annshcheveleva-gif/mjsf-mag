import { ref, toValue, watchEffect, readonly } from 'vue';

export function useDebouncedValue(source, delay = 400) {
  const value = ref(toValue(source));

  watchEffect((onCleanup) => {
    const next = toValue(source);
    const timer = setTimeout(() => {
      value.value = next;
    }, delay);

    onCleanup(() => {
      clearTimeout(timer);
    });
  });

  return readonly(value);
}

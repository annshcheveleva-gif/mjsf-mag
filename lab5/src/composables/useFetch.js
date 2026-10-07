import { ref, watchEffect, toValue } from 'vue';

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(false);
  const trigger = ref(0);

  let currentController = null;

  watchEffect(async (onCleanup) => {
    // Читаємо url через toValue всередині ефекту для реєстрації реактивної залежності
    const currentUrl = toValue(url);
    // Зчитуємо trigger для підтримки refetch()
    _ = trigger.value;

    if (currentController) {
      currentController.abort();
    }

    currentController = new AbortController();
    const signal = currentController.signal;

    onCleanup(() => {
      currentController.abort();
    });

    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(currentUrl, { signal });
      if (!response.ok) {
        throw new Error(`Помилка HTTP: ${response.status}`);
      }
      const json = await response.json();
      data.value = json;
    } catch (err) {
      if (err.name !== 'AbortError') {
        error.value = err;
      }
    } finally {
      if (signal === currentController.signal) {
        isLoading.value = false;
      }
    }
  });

  function abort() {
    if (currentController) {
      currentController.abort();
    }
    isLoading.value = false;
  }

  function refetch() {
    trigger.value++;
  }

  return { data, error, isLoading, abort, refetch };
}

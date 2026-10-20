import { ref, watchEffect, toValue } from 'vue';

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(false);
  const trigger = ref(0);

  let currentController = null;

  watchEffect(async (onCleanup) => {
    const currentUrl = toValue(url);
    _ = trigger.value;

    if (currentController) {
      currentController.abort();
    }

    if (!currentUrl) {
      data.value = null;
      error.value = null;
      isLoading.value = false;
      return;
    }

    currentController = new AbortController();
    const signal = currentController.signal;

    onCleanup(() => {
      currentController.abort();
    });

    isLoading.value = true;
    error.value = null;
    data.value = null;

    try {
      const response = await fetch(currentUrl, { signal });
      if (!response.ok) {
        const err = new Error(`HTTP Error: ${response.status}`);
        err.status = response.status;
        throw err;
      }
      const json = await response.json();
      if (!signal.aborted) {
        data.value = json;
      }
    } catch (err) {
      if (err.name !== 'AbortError' && !signal.aborted) {
        error.value = err;
      }
    } finally {
      if (!signal.aborted) {
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

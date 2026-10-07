# Лабораторна робота №5. Використання Vue composable
* **Студентка:** Щевелева Анна Андріївна
* **Група:** 7.F2.25-2
* **Спеціальність:** Інженерія програмного забезпечення (ЗНУ)

## Таблиця розподілу відповідальності (Контракти модулів)

| Модуль | Входи | Виходи / Стани | Межа відповідальності |
| :--- | :--- | :--- | :--- |
| **App.vue** | Відсутні | `query`, `skip`, `products`, `total`, `hasMore`, `requestUrl` | Поєднання стану пошуку, сторінок, composables та компонентів сторінки. |
| **ProductSearchForm.vue** | `modelValue` (String) | Подія `update:modelValue` | Поле пошуку, доступний підпис і стан введення, але не виконує HTTP-запитів. |
| **ProductCatalog.vue** | `products`, `isLoading`, `error` | Подія `retry` | Список отриманих товарів і вибір між сіткою, станом завантаження, помилкою та порожнім станом. |
| **ProductCard.vue** | `product` (Object) | Відсутні | Представлення одного товару (картка). |
| **CatalogLoadMore.vue** | `loaded`, `total`, `isLoading`, `error`, `hasMore` | Події `load-more`, `retry` | Нижній маркер, стан наступної сторінки та події дозавантаження / повтору. |
| **useFetch.js** | `url` (Value/Ref/Getter) | `data`, `error`, `isLoading`, `abort`, `refetch` | Виконання HTTP-запиту, управління AbortController та асинхронним станом. |
| **useDebouncedValue.js** | `source`, `delay` (number) | Readonly `value` (ref) | Відкладене реактивне значення та безпечне очищення таймера. |
| **useIntersectionObserver.js** | `target`, `callback`, `options` | Відсутні | Підписка на перетин цільового елемента з viewport та очищення observer. |

## Схема потоку стану (Flow)
query (сирий рядок) 
  ├──> watch(..., { flush: 'sync' }) ──> abort() активного запиту (негайне скасування)
  └──> useDebouncedValue(query, 400) ──> debouncedQuery (відкладений рядок)
         └──> computed (requestUrl через URLSearchParams з q, limit=12, skip, delay=1500)
                └──> useFetch(requestUrl) ──> data, error, isLoading
                       └──> оновлення products (заміна або злиття унікальних id)

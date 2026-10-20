# Лабораторна робота №6. Робота з Vue Router
* **Студентка:** Щевелева Анна Андріївна
* **Група:** 7.F2.25-2
* **Спеціальність:** Інженерія програмного забезпечення

## Дерево маршрутів (Routes)
* `/` -> Редирект на `/products`
* `/products` (`ProductsLayout` -> `ProductCatalogView`) - Каталог товарів із пошуком та дозавантаженням.
* `/products/:id` (`ProductLayout` -> `ProductOverviewView`) - Оболонка товару та його огляд.
* `/products/:id/reviews` (`ProductLayout` -> `ProductReviewsView`) - Оболонка товару та відгуки покупців.
* `/about` (`AboutView`) — Інформаційна сторінка про застосунок.
* `/:pathMatch(.*)*` (`NotFoundView`) — Сторінка 404 (Сторінку не знайдено).

## Таблиця відповідальності модулів та метаданих крихт
| Шлях / Запис | Компонент | meta.breadcrumb | Відповідальність |
| :--- | :--- | :--- | :--- |
| `/products` | `ProductsLayout` | `{ label: 'Каталог', name: 'products' }` | Головний розділ каталогу та управління пошуком. |
| `/products/:id` | `ProductLayout` | `{ dynamic: 'product', name: 'product-overview' }` | Завантаження спільних даних товару за параметром `id`. |
| `reviews` | `ProductReviewsView` | `{ label: 'Відгуки', name: 'product-reviews' }` | Відображення відгуків всередині оболонки товару. |
| `/about` | `AboutView` | `{ label: 'Про застосунок', name: 'about' }` | Інформація про проєкт та середовище. |
| `/:pathMatch(.*)*` | `NotFoundView` | `{ label: 'Сторінку не знайдено', name: 'not-found' }` | Обробка невідомих адрес (404). |

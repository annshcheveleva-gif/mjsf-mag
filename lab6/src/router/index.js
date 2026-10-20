import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: { name: 'products' }
  },
  {
    path: '/products',
    component: () => import('../layouts/ProductsLayout.vue'),
    meta: { breadcrumb: { label: 'Каталог', name: 'products' } },
    children: [
      {
        path: '',
        name: 'products',
        component: () => import('../views/ProductCatalogView.vue')
      },
      {
        path: ':id',
        component: () => import('../layouts/ProductLayout.vue'),
        meta: { breadcrumb: { dynamic: 'product', name: 'product-overview' } },
        children: [
          {
            path: '',
            name: 'product-overview',
            component: () => import('../views/ProductOverviewView.vue')
          },
          {
            path: 'reviews',
            name: 'product-reviews',
            component: () => import('../views/ProductReviewsView.vue'),
            meta: { breadcrumb: { label: 'Відгуки', name: 'product-reviews' } }
          }
        ]
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { breadcrumb: { label: 'Про застосунок', name: 'about' } }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { breadcrumb: { label: 'Сторінку не знайдено', name: 'not-found' } }
  }
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.path !== from.path) return { top: 0 };
  }
});

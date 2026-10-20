import { computed, toValue } from 'vue';
import { useRoute } from 'vue-router';

export function createBreadcrumbItems(route, productTitle = '') {
  return route.matched.flatMap((record) => {
    const crumb = record.meta.breadcrumb;
    if (!crumb) return [];

    const isProduct = crumb.dynamic === 'product';
    const resolvedTitle = toValue(productTitle);

    return [{
      label: isProduct
        ? (resolvedTitle || `Товар №${route.params.id}`)
        : crumb.label,
      to: {
        name: crumb.name,
        params: (isProduct || crumb.name === 'product-reviews') ? { id: route.params.id } : {},
        query: route.query.q ? { q: route.query.q } : {}
      }
    }];
  });
}

export function useBreadcrumbs(productTitle = '') {
  const route = useRoute();
  return computed(() => createBreadcrumbItems(route, toValue(productTitle)));
}

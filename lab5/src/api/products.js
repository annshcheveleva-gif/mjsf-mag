export function createProductsUrl(query, skip = 0, limit = 12, delay = 1500) {
  const baseUrl = query && query.trim() !== '' 
    ? 'https://dummyjson.com/products/search' 
    : 'https://dummyjson.com/products';
  
  const params = new URLSearchParams();
  params.append('limit', limit);
  params.append('skip', skip);
  params.append('delay', delay);
  
  if (query && query.trim() !== '') {
    params.append('q', query.trim());
  }
  
  return `${baseUrl}?${params.toString()}`;
}

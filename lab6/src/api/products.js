export function createProductsUrl(query, skip = 0, limit = 12, delay = 800) {
  const trimmed = query ? query.trim() : '';
  const baseUrl = trimmed !== '' 
    ? 'https://dummyjson.com/products/search' 
    : 'https://dummyjson.com/products';
  
  const params = new URLSearchParams();
  params.append('limit', limit);
  params.append('skip', skip);
  params.append('delay', delay);
  
  if (trimmed !== '') {
    params.append('q', trimmed);
  }
  
  return `${baseUrl}?${params.toString()}`;
}

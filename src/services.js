
export const loadProducts = async () =>
  await fetch('/exchange-api/v1/public/asset-service/product/get-products')
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json());
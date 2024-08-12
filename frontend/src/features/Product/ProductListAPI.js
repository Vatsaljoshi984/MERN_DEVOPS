export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products`)
    const data = await response.json()
    resolve({ data });
  }
  );
}
export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/categories`)
    const data = await response.json()
    resolve({ data });
  }
  );
}
export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/brands`)
    const data = await response.json()
    resolve({ data });
  }
  );
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${id}`)
    const data = await response.json()
    resolve({ data });
  }
  );
}
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/`, {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(product),
    })
    const data = await response.json()
    resolve({ data });
  }
  );
}

export function updateRatingProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/rating/${update.id}`, {
      method: "PATCH",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(update),
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${update.id}`, {
      method: "PATCH",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(update),
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchProductsByFiltersAdmin({ search, filter, sort, pagination }) {
  let queryString = '';
  if (search !== "" && search) {
    queryString = `search=${search.search}&`
  }
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      for (const a in categoryValues) {
        queryString += `${key}=${categoryValues[a]}&`
      }
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`

  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;

  }


  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/admin?${queryString}`)
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count')
    resolve({ data: { products: data, totalItems: +totalItems } });
  }
  );
}
export function fetchProductsByFilters({ search, filter, sort, pagination }) {
  let queryString = '';

  if (search !== "" && search) {
    queryString = `search=${search.search}&`
  }
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      for (const a in categoryValues) {
        queryString += `${key}=${categoryValues[a]}&`
      }
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`

  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;

  }

  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products?${queryString}`)
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count')
    resolve({ data: { products: data, totalItems: +totalItems } });
  }
  );
} 
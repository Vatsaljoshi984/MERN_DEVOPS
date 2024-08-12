export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/orders`, {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(order),
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchAllOrders({sort, pagination }) {
  let queryString = '';
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;

  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`

  }
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/orders/admin?${queryString}`)
    const data = await response.json();
    const totalOrders = await response.headers.get('X-Total-Count')
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  }
  );
} 

export function updateOrder(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/orders/${update.id}`, {
      method: "PATCH",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(update),
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}
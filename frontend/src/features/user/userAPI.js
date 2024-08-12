export function fetchLoggedInUserOrders({pagination}) {
  let queryString = '';
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/orders?` + queryString)
    const data = await response.json()
    const totalOrders = await response.headers.get('X-Total-Count')
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  }
  );
}
export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/`)
    const data = await response.json()
    resolve({ data });
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/`, {
      method: "PATCH",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(update),
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}
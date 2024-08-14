export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart/`, {
      method: "post",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(item),
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart/`)
      const data = await response.json()
      resolve({ data });
    } catch (error) {
      console.log(error);
    }

  }
  );
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart/${update.id}`, {
      method: "PATCH",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(update),
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function deleteProductFromCart(productID) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart/${productID}`, {
      method: "DELETE",
      headers: { 'content-type': 'application/json' },
    })
    const data = await response.json()
    resolve({ data: { id: productID } })
  }
  );
}

export function resetCart() {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId();
    const products = await response.data;
    for (const product of products) {
      await deleteProductFromCart(product.id);
    }
    resolve({ status: "success" })
  }
  );
}
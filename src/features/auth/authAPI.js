export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/signup`, {
      method: "post",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userData),
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}
export function signOut() {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/logout`);
      if (response.ok) {
        resolve({ data: 'success' });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  }
  );
}

// export function loginUser(loginInfo) {
//   return new Promise(async (resolve, reject) => {
//     const email = loginInfo.email;
//     const password = loginInfo.password;
//     const response = await fetch('http://localhost:8080/users?email=' + email)
//     const data = await response.json()

//     if (data.length) {
//       if (password === data[0].password) {
//         resolve({ data: data[0] })
//       } else {
//         reject({ message: "Invalid Credentials" })
//       }

//     } else {
//       reject({ message: "Invalid Credentials" })
//     }
//   }
//   );
// } 

export function loginUser(loginInfo) {
  try {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        method: "post",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(loginInfo),
      })
      const data = await response.json()
      resolve({ data })

    }
    );
  } catch (error) {
    reject(error);
  }
}

export function checkUser() {
  const token = JSON.parse(localStorage.getItem("user"))
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/check`);
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }

  });
}

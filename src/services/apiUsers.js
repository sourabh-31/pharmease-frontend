import { API } from "../utils/constant";

export async function createUser(user) {
  try {
    const res = await fetch(`${API}/users/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      const errorMessage = await res.json();
      throw new Error(errorMessage?.message || "Failed to create user");
    }
    document.cookie = "isAuthenticated=true; path=/";
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUser() {
  try {
    const res = await fetch(`${API}/users/me`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Error fetching user");
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function loginUser(user) {
  try {
    const res = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      const errorMessage = await res.json();
      throw new Error(errorMessage?.message || "Failed to login user");
    }
    document.cookie = "isAuthenticated=true; path=/";
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function logoutUser() {
  try {
    const res = await fetch(`${API}/users/logout`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Error while logout");
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() - 1);
    const expires = expirationDate.toUTCString();
    document.cookie = `isAuthenticated=; expires=${expires}; path=/;`;
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateUser(newUserData) {
  try {
    const res = await fetch(`${API}/users/me/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newUserData),
    });

    if (!res.ok) {
      throw new Error("User could not be updated");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function forgotPassword(email) {
  try {
    const res = await fetch(`${API}/users/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
    if (!res.ok) {
      const errorMessage = await res.json();
      throw new Error(errorMessage?.message || "Failed to send reset link");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function resetPassword(token, password) {
  try {
    const res = await fetch(`${API}/users/resetPassword/${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password }),
    });
    if (!res.ok) {
      const errorMessage = await res.json();
      throw new Error(errorMessage?.message || "Failed to reset password");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

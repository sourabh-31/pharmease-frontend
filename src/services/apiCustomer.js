import { API } from "../utils/constant";

export async function getAllCustomer() {
  try {
    const res = await fetch(`${API}/customer/all`);
    if (!res.ok) throw new Error("Error fetching Customers");
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCustomer(id) {
  try {
    const res = await fetch(`${API}/customer/get/${id}`);
    if (!res.ok) throw new Error("Error fetching customer");
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createCustomer(customer) {
  try {
    const res = await fetch(`${API}/customer/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });

    if (!res.ok) {
      throw new Error("Customer could not be created");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateCustomer(customer, id) {
  try {
    const res = await fetch(`${API}/customer/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });

    if (!res.ok) {
      throw new Error("Customer could not be updated");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteCustomer(id) {
  try {
    const res = await fetch(`${API}/customer/delete/${id}`, {
      method: "Delete",
    });

    if (!res.ok) {
      throw new Error("Customer could not be Deleted");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

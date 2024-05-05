import { API } from "../utils/constant";

export async function createInvoice(invoice) {
  try {
    const res = await fetch(`${API}/invoice/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoice),
    });

    if (!res.ok) {
      throw new Error("Invoice could not be created");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAllInvoices() {
  try {
    const res = await fetch(`${API}/invoice/all`);
    if (!res.ok) throw new Error("Error fetching invoices");
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

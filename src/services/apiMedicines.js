import { API } from "../utils/constant";

export async function getAllMedicine() {
  try {
    const res = await fetch(`${API}/medicine/all`);
    if (!res.ok) throw new Error("Error fetching medicines");
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getExpiredMedicines() {
  try {
    const res = await fetch(`${API}/medicine/all/expired`);
    if (!res.ok) throw new Error("Error fetching expired medicines");
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getMedicine(id) {
  try {
    const res = await fetch(`${API}/medicine/get/${id}`);
    if (!res.ok) throw new Error("Error fetching medicine");
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getMedicinesByGroup(id) {
  try {
    const res = await fetch(`${API}/medicine/get/group/${id}`);
    if (!res.ok) throw new Error("Error fetching medicine");
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createMedicine(medicine) {
  try {
    const res = await fetch(`${API}/medicine/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medicine),
    });

    if (!res.ok) {
      throw new Error("Medicine could not be created");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateMedicine(medicine, id) {
  try {
    const res = await fetch(`${API}/medicine/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medicine),
    });

    if (!res.ok) {
      throw new Error("Medicine could not be updated");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteMedicine(id) {
  try {
    const res = await fetch(`${API}/medicine/delete/${id}`, {
      method: "Delete",
    });

    if (!res.ok) {
      throw new Error("Medicine could not be Deleted");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addMedicinesToGroup(values) {
  try {
    const res = await fetch(`${API}/medicine/add/group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      throw new Error("Medicine could not be added");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function subtractMedicineQuantity(queryValue) {
  try {
    const res = await fetch(`${API}/medicine/subtract/quantity`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryValue),
    });

    if (!res.ok) {
      throw new Error("Medicine could not be updated");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

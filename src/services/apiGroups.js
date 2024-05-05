import { API } from "../utils/constant";

export async function getAllGroups() {
  try {
    const res = await fetch(`${API}/groups/all`);
    if (!res.ok) throw new Error("Error fetching Groups");
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createGroup(group) {
  try {
    const res = await fetch(`${API}/groups/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    });

    if (!res.ok) {
      throw new Error("Group could not be created");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteGroup(id) {
  try {
    const res = await fetch(`${API}/groups/delete/${id}`, {
      method: "Delete",
    });

    if (!res.ok) {
      throw new Error("Group could not be Deleted");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getGroup(id) {
  try {
    const res = await fetch(`${API}/groups/get/${id}`);

    if (!res.ok) {
      throw new Error("Group could not be found");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// not used

export async function updateGroup(newGroupData, id) {
  try {
    const res = await fetch(`${API}/groups/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGroupData),
    });

    if (!res.ok) {
      throw new Error("Group could not be updated");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

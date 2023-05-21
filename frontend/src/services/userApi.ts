const API_URL = `${import.meta.env.VITE_BACKEND_URL}/users`;
const ACCESS_TOKEN = localStorage.getItem("accessToken");

export async function getUserById(id: number): Promise<User> {
  const response = await fetch(`${API_URL}/id/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("User not found");
  }

  return await response.json();
}

export async function getUserByUsername(username: string): Promise<User> {
  const response = await fetch(`${API_URL}/username/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("User not found");
  }

  return await response.json();
}

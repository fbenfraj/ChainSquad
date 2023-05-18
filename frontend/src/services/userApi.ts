const API_URL = `${import.meta.env.VITE_BACKEND_URL}/users`;

export async function getUser(id: number): Promise<User> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("User not found");
  }

  return await response.json();
}

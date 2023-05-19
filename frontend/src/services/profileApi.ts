const API_URL = `${import.meta.env.VITE_BACKEND_URL}/profile`;

export async function getProfile(): Promise<User> {
  const response = await fetch(`${API_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (!response.ok) {
    throw new Error("User not found");
  }

  return await response.json();
}

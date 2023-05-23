const API_URL = `${import.meta.env.VITE_BACKEND_URL}/invitations`;
const ACCESS_TOKEN = localStorage.getItem("accessToken");

export async function sendInvitation(
  squadId: number,
  userId: number
): Promise<void> {
  const data = {
    squadId,
    invitedId: userId,
  };

  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error sending invitation");
  }

  return await response.json();
}

export async function getInvitations(): Promise<Invitation[]> {
  const response = await fetch(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error getting invitations");
  }

  return await response.json();
}

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/invitations`;

export async function sendInvitation(
  squadId: number,
  userId: number
): Promise<Response> {
  const data = {
    squadId,
    invitedId: userId,
  };

  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error sending invitation");
  }

  return response;
}

export async function getInvitations(): Promise<Invitation[]> {
  const response = await fetch(`${API_URL}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error getting invitations");
  }

  return await response.json();
}

export async function updateInvitation(
  invitationCode: string,
  invitationAction: string
): Promise<Response> {
  const response = await fetch(`${API_URL}/${invitationAction}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({ invitationCode }),
  });

  if (!response.ok) {
    throw new Error("Error updating invitation");
  }

  return response;
}

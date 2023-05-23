const API_URL = `${import.meta.env.VITE_BACKEND_URL}/squads`;

export async function getSquad(squadId: number): Promise<Squad> {
  const response = await fetch(`${API_URL}/${squadId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Squad not found");
  }

  return await response.json();
}

export async function createSquad(
  squad: Partial<Squad>,
  userId: number
): Promise<Squad> {
  const data = {
    squadName: squad.squadName,
    createdBy: userId,
  };

  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error);
  }

  return responseData;
}

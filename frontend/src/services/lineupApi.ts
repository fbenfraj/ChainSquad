const API_URL = `${import.meta.env.VITE_BACKEND_URL}/lineups`;

export async function getLineup(lineupId: number): Promise<Lineup> {
  const response = await fetch(`${API_URL}/${lineupId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Lineup not found");
  }

  return await response.json();
}

export async function createLineup(
  lineup: Partial<Lineup>,
  squadId: number
): Promise<Lineup | undefined> {
  const userId = localStorage.getItem("userId");

  if (!userId) return;

  const data = {
    lineupName: lineup.lineupName,
    squadId: squadId,
    createdBy: parseInt(userId),
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

export async function addMembersToLineup(lineupId: number, members: Member[]) {
  const data = {
    users: members,
  };

  const response = await fetch(`${API_URL}/${lineupId}/add`, {
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

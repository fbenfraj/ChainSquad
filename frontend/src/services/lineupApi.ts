const API_URL = `${import.meta.env.VITE_BACKEND_URL}/lineups`;

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
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error);
  }

  return responseData;
}

export function addMembersToLineup(lineupId: number, members: Member[]) {
  console.log("addMembersToLineup:", lineupId, members);
}

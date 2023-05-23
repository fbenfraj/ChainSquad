import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getSquad } from "../../services/squadApi";
import { getUserByUsername } from "../../services/userApi";
import { sendInvitation } from "../../services/invitationApi";

export default function ViewSquadPage() {
  const { squadId } = useParams<{ squadId: string }>();
  const [squad, setSquad] = useState<Squad | null>(null);
  const [addedName, setAddedName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!squadId) return;

    const parsedSquadId = parseInt(squadId);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getSquad(parsedSquadId);
        setSquad(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [squadId]);

  const handleAddMember = async () => {
    try {
      const user = await getUserByUsername(addedName);

      if (!user || !squadId) return;

      const response = await sendInvitation(parseInt(squadId), user.userId);

      if (response.status === 200) {
        alert(`Invitation sent to ${user.displayName} !`);
        setAddedName("");
        setError("");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>squadName: {squad?.squadName}</h1>
      <h2>squadId: {squad?.squadId}</h2>
      <h3>Members:</h3>
      {squad?.members.map((member) => (
        <li key={member.userId}>{member.displayName}</li>
      ))}
      <label htmlFor="add">Add member</label>
      <input
        type="text"
        id="add"
        value={addedName}
        onChange={(event) => setAddedName(event.target.value)}
      />
      <button onClick={handleAddMember}>Add</button>
      {error && <p>{error}</p>}
      {squad?.lineups && squad?.lineups?.length > 0 ? (
        <div>
          <h3>Lineups:</h3>
          <ul>
            {squad.lineups.map((lineup) => (
              <Link
                key={lineup.lineupId}
                to={`/squads/${squadId}/lineups/${lineup.lineupId}`}
              >
                <li>{lineup.lineupName}</li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        // TODO: Remove this in the future as a squad will have at least the creator as a member
        <p>This squad does not have any lineups yet.</p>
      )}
      <Link to={`/squads/${squadId}/lineups/create`}>
        <button>Add lineup</button>
      </Link>
      <Link to={`/dashboard/${userId}`}>
        <button>Go back to Dashboard</button>
      </Link>
    </div>
  );
}

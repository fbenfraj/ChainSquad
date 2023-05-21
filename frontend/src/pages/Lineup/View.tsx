import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { addMembersToLineup, getLineup } from "../../services/lineupApi";
import { getUserByUsername } from "../../services/userApi";

export default function ViewLineupPage() {
  const { squadId, lineupId } = useParams<{
    squadId: string;
    lineupId: string;
  }>();
  const [lineup, setLineup] = useState<Lineup | null>(null);
  const [addedName, setAddedName] = useState("");
  const [addedRole, setAddedRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!lineupId) return;

    const parsedLineupId = parseInt(lineupId);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getLineup(parsedLineupId);
        setLineup(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [lineupId]);

  const handleAddMember = async () => {
    try {
      const user = await getUserByUsername(addedName);

      if (!user) return;

      const newMember = {
        userId: user.userId,
        username: user.username,
        role: addedRole,
      };

      if (!lineupId) return;

      await addMembersToLineup(parseInt(lineupId), [newMember]);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!lineup) {
    return <p>Lineup not found</p>;
  }

  return (
    <div>
      {lineup?.members && lineup?.members?.length > 0 ? (
        <div>
          <h1>lineupName: {lineup?.lineupName}</h1>
          <h2>lineupId: {lineupId}</h2>
          <h3>Members:</h3>
          <ul>
            {lineup.members.map((member) => (
              <li key={member.userId}>
                {member.username}, {member.role}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>This lineup does not have any member yet.</p>
      )}
      <label htmlFor="add">Add member</label>
      <input
        type="text"
        id="add"
        value={addedName}
        onChange={(event) => setAddedName(event.target.value)}
      />
      <select
        name="role"
        id="role"
        value={addedRole}
        onChange={(event) => setAddedRole(event.target.value)}
      >
        <option value="Manager">Manager</option>
        <option value="Coach">Coach</option>
        <option value="Player">Player</option>
        <option value="Other">Other</option>
      </select>
      <button onClick={handleAddMember}>Add</button>
      {error && <p>{error}</p>}
      <br />
      <Link to={`/squads/${squadId}`}>
        <button>Go back to Squad {squadId}</button>
      </Link>
    </div>
  );
}

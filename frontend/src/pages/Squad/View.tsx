import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getSquad } from "../../services/squadApi";

export default function ViewSquadPage() {
  const { squadId } = useParams<{ squadId: string }>();
  const [squad, setSquad] = useState<Squad | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {squad?.lineups && squad?.lineups?.length > 0 ? (
        <div>
          <h1>squadName: {squad?.squadName}</h1>
          <h2>squadId: {squad.squadId}</h2>
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
        <p>This squad does not have any lineup yet.</p>
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

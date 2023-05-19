import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getSquad } from "../../services/squadApi";

export default function ViewSquadPage() {
  const { squadId } = useParams<{ squadId: string }>();
  const [squad, setSquad] = useState<Squad | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      <p>Squad {squadId} lineups: </p>
      <h2>Lineups</h2>
      {squad?.lineups && squad?.lineups?.length > 0 ? (
        <div>
          <h2>My Squads</h2>
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
      <Link to={`/dashboard`}>
        <button>Go back to Dashboard</button>
      </Link>
    </div>
  );
}

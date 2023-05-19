import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getLineup } from "../../services/lineupApi";

export default function ViewLineupPage() {
  const { squadId, lineupId } = useParams<{
    squadId: string;
    lineupId: string;
  }>();
  const [lineup, setLineup] = useState<Lineup | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>Lineup {lineupId}</p>
      <p>Lineup Name: {lineup?.lineupName}</p>
      {lineup?.members && lineup?.members?.length > 0 ? (
        <div>
          <h2>My Squads</h2>
          <ul>
            {lineup.members.map((member) => (
              <li>{member.role}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>This lineup does not have any member yet.</p>
      )}
      <Link to={`/squads/${squadId}`}>
        <button>Go back to Squad {squadId}</button>
      </Link>
    </div>
  );
}

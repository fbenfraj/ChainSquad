import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ViewSquadPage() {
  const { squadId } = useParams<{ squadId: string }>();

  return (
    <div>
      <p>Squad {squadId} lineups: </p>
      <h2>Lineups</h2>
      <ul>
        <Link to={`/squads/${squadId}/lineups/1`}>
          <li>Lineup 1</li>
        </Link>
        <Link to={`/squads/${squadId}/lineups/2`}>
          <li>Lineup 2</li>
        </Link>
        <Link to={`/squads/${squadId}/lineups/3`}>
          <li>Lineup 3</li>
        </Link>
      </ul>
      <Link to={`/squads/${squadId}/lineups/create`}>
        <button>Add lineup</button>
      </Link>
      <Link to={`/dashboard`}>
        <button>Go back to Dashboard</button>
      </Link>
    </div>
  );
}

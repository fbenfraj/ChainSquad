import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ViewLineupPage() {
  const { squadId, lineupId } = useParams<{
    squadId: string;
    lineupId: string;
  }>();

  return (
    <div>
      <p>Lineup {lineupId}</p>
      <Link to={`/squads/${squadId}`}>
        <button>Go back to Squad {squadId}</button>
      </Link>
    </div>
  );
}

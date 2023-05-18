import { Link, useParams } from "react-router-dom";

export default function DashboardPage() {
  const { userId } = useParams<{ userId: string }>();

  return (
    <div>
      <h1>Welcome, Sybreed! &#40;id: {userId}&#41;</h1>
      <p>Here's your dashboard.</p>

      <h2>My Squads</h2>
      <ul>
        <Link to="/squads/1">
          <li>My Squad 1</li>
        </Link>
        <Link to="/squads/2">
          <li>My Squad 2</li>
        </Link>
        <Link to="/squads/3">
          <li>My Squad 3</li>
        </Link>
      </ul>
      <Link to="/squads/create">
        <button>Create Squad</button>
      </Link>
    </div>
  );
}

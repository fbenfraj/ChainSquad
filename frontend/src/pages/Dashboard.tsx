import { Link } from "react-router-dom";

type Props = {};

export default function DashboardPage({}: Props) {
  return (
    <div>
      <h1>Welcome, Sybreed!</h1>
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

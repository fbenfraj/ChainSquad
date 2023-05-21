import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfile } from "../services/profileApi";

export default function DashboardPage() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getProfile();

        setUser(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>
        Welcome, {user?.username} ! &#40;id: {userId}&#41;
      </h1>
      <p>Here's your dashboard.</p>
      {user?.squads && user?.squads?.length > 0 ? (
        <div>
          <h2>My Squads</h2>
          <ul>
            {user.squads.map((squad) => (
              <Link key={squad.squadId} to={`/squads/${squad.squadId}`}>
                <li>{squad.squadName}</li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <p>You don't have any squads yet.</p>
      )}
      <Link to="/squads/create">
        <button>Create Squad</button>
      </Link>
    </div>
  );
}

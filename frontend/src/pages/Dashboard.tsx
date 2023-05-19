import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../services/userApi";

export default function DashboardPage() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const parsedUserId = parseInt(userId);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getUser(parsedUserId);
        setUser(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

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

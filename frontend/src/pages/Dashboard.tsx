import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfile } from "../services/profileApi";
import { getInvitations } from "../services/invitationApi";

export default function DashboardPage() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedUser = await getProfile();
        const fetchedInvitations = await getInvitations();

        setUser(fetchedUser);
        setInvitations(fetchedInvitations);
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
        Welcome, {user?.displayName} ! &#40;id: {userId}&#41;
      </h1>
      <p>Here's your dashboard.</p>
      {invitations && invitations.length > 0 ? (
        <div>
          <h2>Invitations</h2>
          <ul>
            {invitations.map((invitation) => (
              <li key={invitation.invitationCode}>
                Invited to join Squad {invitation.squadId} (status:
                {invitation.status})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>You don't have any invitations.</p>
      )}
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

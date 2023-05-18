import { useNavigate } from "react-router-dom";
import { createSquad } from "../../services/squadApi";
import { useState } from "react";

export default function CreateSquadPage() {
  const [squadName, setSquadName] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    const squadData = {
      SquadName: squadName,
    };

    await createSquad(squadData, parseInt(userId));
    navigate(`/dashboard/${userId}`);
  };

  return (
    <div>
      <h1>Create Squad</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => setSquadName(e.target.value)}
          value={squadName}
        />
        <input type="submit" value="Create" disabled={!squadName} />
      </form>
    </div>
  );
}

import { useNavigate, useParams } from "react-router-dom";
import { createLineup } from "../../services/lineupApi";
import { useState } from "react";

export default function CreateLineupPage() {
  const { squadId } = useParams<{ squadId: string }>();
  const [lineupName, setLineupName] = useState("");
  const [lineupGame, setLineupGame] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!squadId) return;

    const lineupData = {
      lineupName,
      lineupGame,
    };

    await createLineup(lineupData, parseInt(squadId));
    navigate(`/squads/${squadId}`);
  };

  return (
    <div>
      <h1>Create Lineup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => setLineupName(e.target.value)}
          value={lineupName}
        />
        <select name="game" onChange={(e) => setLineupGame(e.target.value)}>
          <option value="CSGO">CSGO</option>
          <option value="VALORANT">VALORANT</option>
          <option value="DOTA2">DOTA2</option>
          <option value="LOL">LOL</option>
        </select>
        <input type="submit" value="Create" />
      </form>
    </div>
  );
}

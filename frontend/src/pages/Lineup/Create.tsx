import { useNavigate, useParams } from "react-router-dom";
import { createLineup } from "../../services/lineupApi";
import { useReducer } from "react";

const initialState = {
  name: "",
  game: "",
};

const reducer = (state: Lineup, action: CreateLineupAction) => {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    default:
      return state;
  }
};

export default function CreateLineupPage() {
  const [lineup, dispatch] = useReducer(reducer, initialState);
  const { squadId } = useParams<{ squadId: string }>();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    dispatch({
      type: "field",
      fieldName: e.target.name,
      payload: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createLineup(lineup);
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
          onChange={handleChange}
          value={lineup.name}
        />
        <select name="game" onChange={handleChange}>
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

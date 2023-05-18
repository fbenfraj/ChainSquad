import { useNavigate } from "react-router-dom";
import { createSquad } from "../../services/squadApi";
import { useReducer } from "react";

const initialState = {
  name: "",
};

const reducer = (state: Squad, action: CreateSquadAction) => {
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

export default function CreateSquadPage() {
  const [squad, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "field",
      fieldName: e.target.name,
      payload: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createSquad(squad);
    navigate("/dashboard/1");
  };

  return (
    <div>
      <h1>Create Squad</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={squad.name}
        />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
}

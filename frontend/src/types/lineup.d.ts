type Lineup = {
  name: string;
  game: string;
};

type CreateLineupAction = {
  type: "field";
  fieldName: string;
  payload: string;
};

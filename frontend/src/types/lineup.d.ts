type Lineup = {
  LineupID: number;
  LineupName: string;
  game: string;
};

type CreateLineupAction = {
  type: "field";
  fieldName: string;
  payload: string;
};

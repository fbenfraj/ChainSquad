type Lineup = {
  LineupID: number;
  LineupName: string;
  LineupGame: string;
};

type CreateLineupAction = {
  type: "field";
  fieldName: string;
  payload: string;
};

type Member = {
  userId: number;
  role: string;
};

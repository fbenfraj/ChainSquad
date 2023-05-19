type Lineup = {
  lineupId: number;
  lineupName: string;
  lineupGame: string;
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

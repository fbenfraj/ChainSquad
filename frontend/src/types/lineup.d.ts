type Lineup = {
  lineupId: number;
  lineupName: string;
  lineupGame: string;
  members: Member[];
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

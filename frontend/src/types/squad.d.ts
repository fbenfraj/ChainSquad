type Squad = {
  squadId: number;
  squadName: string;
  description: string;
  createdBy: number;
  lineups: Lineup[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

type CreateSquadAction = {
  type: "field";
  fieldName: string;
  payload: string;
};

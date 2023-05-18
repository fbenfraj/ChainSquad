type Squad = {
  SquadID: number;
  SquadName: string;
  Description: string;
  CreatedBy: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

type CreateSquadAction = {
  type: "field";
  fieldName: string;
  payload: string;
};

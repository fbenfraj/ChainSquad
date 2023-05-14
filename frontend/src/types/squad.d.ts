type Squad = {
  name: string;
};

type CreateSquadAction = {
  type: "field";
  fieldName: string;
  payload: string;
};

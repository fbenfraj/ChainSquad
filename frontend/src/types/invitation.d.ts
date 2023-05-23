type Invitation = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  invitationCode: string;
  squadId: number;
  invitedId: number;
  status: string;
  expiryDate: Date;
};

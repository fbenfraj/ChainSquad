type User = {
  UserID: number;
  Username: string;
  FullName: string;
  Email: string;
  WalletAddress: string;
  squads: Squad[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

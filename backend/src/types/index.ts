export enum Role {
  Manager = "Manager",
  Coach = "Coach",
  Player = "Player",
  Other = "Other",
}

export enum InvitationStatus {
  Pending = "Pending",
  Accepted = "Accepted",
  Declined = "Declined",
}

export interface User {
  userID: number;
  username: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role: Role;
  walletAddress: string;
}

export interface Squad {
  squadID: number;
  squadName: string;
  description: string;
  createdAt: Date;
  createdBy: number;
}

export interface Lineup {
  lineupID: number;
  lineupName: string;
  squadID: number;
  gameID: number;
  createdAt: Date;
  createdBy: number;
}

export interface UserSquad {
  userSquadID: number;
  userID: number;
  squadID: number;
}

export interface UserLineup {
  userLineupID: number;
  userID: number;
  lineupID: number;
}

export interface Game {
  gameID: number;
  gameName: string;
  description: string;
}

export interface Invitation {
  invitationID: number;
  squadID: number;
  invitedBy: number;
  email: string;
  createdAt: Date;
  status: InvitationStatus;
}

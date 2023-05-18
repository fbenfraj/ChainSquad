import Squad from "../models/squad.model";
import User from "../models/user.model";

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

export interface UserWithSquads extends User {
  squads?: Squad[];
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

import Lineup from "../models/lineup.model";
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

export interface SanitizedUser extends Omit<User, "passwordHash"> {}

export interface UserWithRole extends SanitizedUser {
  role: Role;
}

export interface LineupWithMembers extends Lineup {
  members?: UserWithRole[];
}

export interface UserSquad {
  userSquadId: number;
  userID: number;
  squadID: number;
}

export interface UserLineup {
  userLineupId: number;
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

export interface UserUpdateParams {
  username?: string;
  email?: string;
  walletAddress?: string;
}

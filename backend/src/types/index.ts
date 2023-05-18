import Lineup from "../models/lineup.model";
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

export interface SanitizedUser extends Omit<User, "PasswordHash"> {}

export interface UserWithSquads extends SanitizedUser {
  squads?: Squad[];
}

export interface UserWithRole extends SanitizedUser {
  role: Role;
}

export interface SquadWithLineups extends Squad {
  lineups?: Lineup[];
}

export interface LineupWithMembers extends Lineup {
  members?: UserWithRole[];
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

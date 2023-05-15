import {
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  HasMany,
} from "sequelize-typescript";
import { BaseModel } from "./base.model";
import { Squad } from "./squad.model";
import { UserSquad } from "./usersquad.model";
import { UserLineup } from "./userlineup.model";

@Table({
  tableName: "Users",
  timestamps: true,
})
export class User extends BaseModel {
  @PrimaryKey
  @AutoIncrement
  @Column
  UserID!: number;

  @Column
  Username!: string;

  @Column
  FullName: string | undefined;

  @Column
  Email: string | undefined;

  @Column
  PasswordHash: string | undefined;

  @Column
  WalletAddress: string | undefined;

  @HasMany(() => Squad, "CreatedBy")
  Squads: Squad[] | undefined;

  @HasMany(() => UserSquad, "UserID")
  UserSquads: UserSquad[] | undefined;

  @HasMany(() => UserLineup, "UserID")
  UserLineups: UserLineup[] | undefined;
}

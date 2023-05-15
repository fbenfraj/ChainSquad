import {
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  HasMany,
  DataType,
  Unique,
} from "sequelize-typescript";
import BaseModel from "./base.model";
import Squad from "./squad.model";
import UserSquad from "./usersquad.model";
import UserLineup from "./userlineup.model";

@Table({
  tableName: "Users",
  timestamps: true,
})
export default class User extends BaseModel {
  @PrimaryKey
  @AutoIncrement
  @Column
  UserID!: number;

  @Unique
  @Column(DataType.STRING)
  Username!: string;

  @Column(DataType.STRING)
  FullName: string | undefined;

  @Unique
  @Column(DataType.STRING)
  Email: string | undefined;

  @Column(DataType.STRING)
  PasswordHash: string | undefined;

  @Column(DataType.STRING)
  WalletAddress: string | undefined;

  @HasMany(() => Squad, "CreatedBy")
  Squads: Squad[] | undefined;

  @HasMany(() => UserSquad, "UserID")
  UserSquads: UserSquad[] | undefined;

  @HasMany(() => UserLineup, "UserID")
  UserLineups: UserLineup[] | undefined;
}

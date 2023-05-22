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
  userId!: number;

  @Unique
  @Column(DataType.STRING)
  username!: string;

  @Column(DataType.STRING)
  displayName!: string;

  @Unique
  @Column(DataType.STRING)
  email: string | undefined;

  @Column(DataType.STRING)
  passwordHash: string | undefined;

  @Column(DataType.STRING)
  walletAddress: string | undefined;

  @HasMany(() => Squad, "createdBy")
  squads: Squad[] | undefined;

  @HasMany(() => UserSquad, "userId")
  userSquads: UserSquad[] | undefined;

  @HasMany(() => UserLineup, "userId")
  userLineups: UserLineup[] | undefined;
}

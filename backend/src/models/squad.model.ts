import {
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
  HasMany,
  DataType,
} from "sequelize-typescript";
import BaseModel from "./base.model";
import User from "./user.model";
import Lineup from "./lineup.model";
import UserSquad from "./usersquad.model";

@Table({
  tableName: "Squads",
  timestamps: true,
})
export default class Squad extends BaseModel {
  @PrimaryKey
  @AutoIncrement
  @Column
  SquadID!: number;

  @Column(DataType.STRING)
  SquadName!: string;

  @Column(DataType.TEXT)
  Description: string | undefined;

  @ForeignKey(() => User)
  @Column
  CreatedBy!: number;

  @BelongsTo(() => User)
  User!: User;

  @HasMany(() => Lineup, "SquadID")
  Lineups: Lineup[] | undefined;

  @HasMany(() => UserSquad, "SquadID")
  UserSquads: UserSquad[] | undefined;
}
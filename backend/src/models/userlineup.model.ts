import {
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { BaseModel } from "./base.model";
import { User } from "./user.model";
import { Lineup } from "./lineup.model";
import { Role } from "../types";

@Table({
  tableName: "UserLineups",
  timestamps: true,
})
export class UserLineup extends BaseModel {
  @ForeignKey(() => User)
  @Column
  UserID!: number;

  @ForeignKey(() => Lineup)
  @Column
  LineupID!: number;

  @Column(DataType.ENUM("Player", "Coach"))
  Role!: Role;

  @BelongsTo(() => User)
  User!: User;

  @BelongsTo(() => Lineup)
  Lineup!: Lineup;
}

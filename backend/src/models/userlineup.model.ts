import {
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import BaseModel from "./base.model";
import User from "./user.model";
import Lineup from "./lineup.model";
import { Role } from "../types";

@Table({
  tableName: "UserLineups",
  timestamps: true,
})
export default class UserLineup extends BaseModel {
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Lineup)
  @Column
  lineupId!: number;

  @Column(DataType.ENUM("Manager", "Player", "Coach", "Other"))
  role!: Role;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Lineup)
  lineup!: Lineup;
}

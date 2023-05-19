import {
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import BaseModel from "./base.model";
import User from "./user.model";
import Squad from "./squad.model";
import { Role } from "../types";

@Table({
  tableName: "UserSquads",
  timestamps: true,
})
export default class UserSquad extends BaseModel {
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Squad)
  @Column
  squadId!: number;

  @Column(DataType.ENUM("Manager", "Coach", "Player", "Other"))
  role!: Role;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Squad)
  squad!: Squad;
}

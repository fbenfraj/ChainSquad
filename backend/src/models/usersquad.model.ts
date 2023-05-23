import { Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import BaseModel from "./base.model";
import User from "./user.model";
import Squad from "./squad.model";

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

  @Column
  isLeader!: boolean;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Squad)
  squad!: Squad;
}

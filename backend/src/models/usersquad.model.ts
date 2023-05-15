import {
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { BaseModel } from "./base.model";
import { User } from "./user.model";
import { Squad } from "./squad.model";
import { Role } from "../types";

@Table({
  tableName: "UserSquads",
  timestamps: true,
})
export class UserSquad extends BaseModel {
  @ForeignKey(() => User)
  @Column
  UserID!: number;

  @ForeignKey(() => Squad)
  @Column
  SquadID!: number;

  @Column(DataType.ENUM("Manager", "Coach", "Player", "Other"))
  Role!: Role;

  @BelongsTo(() => User)
  User!: User;

  @BelongsTo(() => Squad)
  Squad!: Squad;
}

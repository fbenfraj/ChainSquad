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
  squadId!: number;

  @Column(DataType.STRING)
  squadName!: string;

  @Column(DataType.TEXT)
  description: string | undefined;

  @ForeignKey(() => User)
  @Column
  createdBy!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Lineup, "squadId")
  lineups: Lineup[] | undefined;

  @HasMany(() => UserSquad, "squadId")
  userSquads: UserSquad[] | undefined;
}

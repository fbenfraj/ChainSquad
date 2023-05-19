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
import Squad from "./squad.model";
import UserLineup from "./userlineup.model";

@Table({
  tableName: "Lineups",
  timestamps: true,
})
export default class Lineup extends BaseModel {
  @PrimaryKey
  @AutoIncrement
  @Column
  LineupID!: number;

  @Column(DataType.STRING)
  LineupName!: string;

  @Column(DataType.STRING)
  LineupGame!: string;

  @ForeignKey(() => Squad)
  @Column
  SquadID!: number;

  @ForeignKey(() => User)
  @Column
  CreatedBy!: number;

  @BelongsTo(() => Squad)
  Squad!: Squad;

  @BelongsTo(() => User)
  User!: User;

  @HasMany(() => UserLineup, "LineupID")
  UserLineups: UserLineup[] | undefined;
}

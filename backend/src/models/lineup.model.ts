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
  lineupId!: number;

  @Column(DataType.STRING)
  lineupName!: string;

  @Column(DataType.STRING)
  lineupGame!: string;

  @ForeignKey(() => Squad)
  @Column
  squadId!: number;

  @ForeignKey(() => User)
  @Column
  createdBy!: number;

  @BelongsTo(() => Squad)
  squad!: Squad;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => UserLineup, "lineupId")
  userLineups: UserLineup[] | undefined;
}

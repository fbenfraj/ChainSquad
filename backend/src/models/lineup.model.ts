import {
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import { BaseModel } from "./base.model";
import { User } from "./user.model";
import { Squad } from "./squad.model";
import { UserLineup } from "./userlineup.model";

@Table({
  tableName: "Lineups",
  timestamps: true,
})
export class Lineup extends BaseModel {
  @PrimaryKey
  @AutoIncrement
  @Column
  LineupID!: number;

  @Column
  LineupName!: string;

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

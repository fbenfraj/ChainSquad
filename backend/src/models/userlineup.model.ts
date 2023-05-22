import {
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
  BeforeCreate,
} from "sequelize-typescript";
import BaseModel from "./base.model";
import User from "./user.model";
import Lineup from "./lineup.model";
import UserSquad from "./usersquad.model";
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

  @BeforeCreate
  static async checkUserInSquad(instance: UserLineup) {
    const lineup = await Lineup.findByPk(instance.lineupId);
    const squadId = lineup?.squadId;
    const userInSquad = await UserSquad.findOne({
      where: { userId: instance.userId, squadId: squadId },
    });

    if (!userInSquad) {
      throw new Error(
        "A user can be in a lineup only if they are also in the squad"
      );
    }
  }
}

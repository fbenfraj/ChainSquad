import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Default,
  BeforeCreate,
} from "sequelize-typescript";
import BaseModel from "./base.model";
import User from "./user.model";
import Squad from "./squad.model";
import { v4 as uuid } from "uuid";

export enum InvitationStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
  EXPIRED = "expired",
}

@Table({
  tableName: "Invitations",
  timestamps: true,
})
export default class Invitation extends BaseModel {
  @Column({ type: DataType.UUID })
  invitationCode: string | undefined;

  @ForeignKey(() => Squad)
  @Column({ type: DataType.INTEGER })
  squadId: number | undefined;

  @BelongsTo(() => Squad)
  squad: Squad | undefined;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  invitedId: number | undefined;

  @BelongsTo(() => User, "invitedId")
  invited: User | undefined;

  @Default(InvitationStatus.PENDING)
  @Column(DataType.ENUM("pending", "accepted", "declined", "expired"))
  status: InvitationStatus | undefined;

  @Column(DataType.DATE)
  expiryDate: Date | undefined;

  @BeforeCreate
  static async createInvitationCode(instance: Invitation) {
    instance.invitationCode = uuid();
  }

  @BeforeCreate
  static async setExpiryDate(instance: Invitation) {
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000; // in milliseconds
    instance.expiryDate = new Date(Date.now() + SEVEN_DAYS);
  }
}

import UserLineup from "../models/userlineup.model";
import { Role } from "../types";

export async function seedLineupMembers() {
  const lineupMembers: Partial<UserLineup>[] = [
    {
      userId: 1,
      lineupId: 1,
      role: Role.Coach,
    },
    {
      userId: 2,
      lineupId: 1,
      role: Role.Player,
    },
    {
      userId: 3,
      lineupId: 2,
      role: Role.Player,
    },
    {
      userId: 4,
      lineupId: 1,
      role: Role.Player,
    },
  ];

  for (let i = 0; i < lineupMembers.length; i++) {
    const existingLineupMember = await UserLineup.findOne({
      where: {
        userId: lineupMembers[i].userId,
        lineupId: lineupMembers[i].lineupId,
      },
    });

    if (!existingLineupMember) {
      await UserLineup.create({
        userId: lineupMembers[i].userId,
        lineupId: lineupMembers[i].lineupId,
        role: lineupMembers[i].role,
      });
    }
  }
}

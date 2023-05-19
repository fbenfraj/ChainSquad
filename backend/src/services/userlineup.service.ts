import User from "../models/user.model";
import UserLineup from "../models/userlineup.model";
import { UserWithRole } from "../types";
import { IdSchema } from "../validations/general.validation";
import { UserWithRoleSchema } from "../validations/user.validation";

class UserLineupService {
  async addMembersToLineup(
    lineupId: number,
    users: UserWithRole[]
  ): Promise<UserLineup[]> {
    const validLineupId = IdSchema.parse(lineupId);
    const validUsers = UserWithRoleSchema.parse(users);

    const userLineups = validUsers.map((user) => {
      return {
        userId: user.userId,
        lineupId: validLineupId,
        role: user.role,
      };
    });

    return UserLineup.bulkCreate(userLineups);
  }

  async getLineupMembers(lineupId: number): Promise<UserWithRole[]> {
    const userLineups = await UserLineup.findAll({
      where: { lineupId },
      include: [User],
      attributes: { exclude: ["passwordHash"] },
    });

    const users = userLineups.map((userLineup) => ({
      ...userLineup.user.get(),
      role: userLineup.role,
    }));

    return users;
  }
}

export default new UserLineupService();

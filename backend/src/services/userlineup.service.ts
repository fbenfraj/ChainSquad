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
        UserID: user.userId,
        LineupID: validLineupId,
        Role: user.role,
      };
    });

    return UserLineup.bulkCreate(userLineups);
  }

  async getLineupMembers(lineupId: number): Promise<UserWithRole[]> {
    const userLineups = await UserLineup.findAll({
      where: { LineupID: lineupId },
      include: [User],
      attributes: { exclude: ["PasswordHash"] },
    });

    const users = userLineups.map((userLineup) => ({
      ...userLineup.User.get(),
      role: userLineup.Role,
    }));

    return users;
  }
}

export default new UserLineupService();

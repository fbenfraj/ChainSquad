import User from "../models/user.model";
import UserSquad from "../models/usersquad.model";
import { SanitizedUser } from "../types";

class UserSquadService {
  async getSquadMembers(squadId: number): Promise<SanitizedUser[]> {
    const userSquads = await UserSquad.findAll({
      where: { squadId },
      include: [User],
      attributes: { exclude: ["passwordHash"] },
    });

    const users = userSquads.map((userSquad) => ({
      ...userSquad.user.get(),
    }));

    return users;
  }
}

export default new UserSquadService();

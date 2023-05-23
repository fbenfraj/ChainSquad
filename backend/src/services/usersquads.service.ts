import User from "../models/user.model";
import UserSquad from "../models/usersquad.model";
import { SanitizedUser } from "../types";
import usersService from "./users.service";

class UserSquadService {
  async getSquadMembers(squadId: number): Promise<SanitizedUser[]> {
    const userSquads = await UserSquad.findAll({
      where: { squadId },
      include: [User],
    });

    const users: User[] = userSquads.map((userSquad) => ({
      ...userSquad.user.get(),
    }));

    const sanitizedMembers = users.map((member) =>
      usersService.sanitizeUser(member)
    );

    return sanitizedMembers;
  }
}

export default new UserSquadService();

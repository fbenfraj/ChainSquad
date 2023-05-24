import User from "../models/user.model";
import UserSquad from "../models/usersquad.model";
import { SanitizedUser } from "../types";
import usersService from "./users.service";

class UserSquadService {
  async getSquadMembers(
    squadId: number
  ): Promise<(SanitizedUser & { isLeader: boolean })[]> {
    const userSquads = await UserSquad.findAll({
      where: { squadId },
      include: [User],
    });

    const usersWithLeadershipStatus: (User & { isLeader: boolean })[] =
      userSquads.map((userSquad) => ({
        ...userSquad.user.get(),
        isLeader: userSquad.isLeader,
      }));

    const sanitizedMembers = usersWithLeadershipStatus.map((member) => ({
      ...usersService.sanitizeUser(member),
      isLeader: member.isLeader,
    }));

    return sanitizedMembers;
  }
}

export default new UserSquadService();

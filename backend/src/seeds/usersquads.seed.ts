import UserSquad from "../models/usersquad.model";

export async function seedSquadUsers() {
  const userSquads: Partial<UserSquad>[] = [
    {
      userId: 1,
      squadId: 1,
    },
    {
      userId: 2,
      squadId: 1,
    },
    {
      userId: 3,
      squadId: 1,
    },
    {
      userId: 4,
      squadId: 1,
    },
  ];

  for (let i = 0; i < userSquads.length; i++) {
    const existingUserSquad = await UserSquad.findOne({
      where: {
        userId: userSquads[i].userId,
        squadId: userSquads[i].squadId,
      },
    });

    if (!existingUserSquad) {
      await UserSquad.create({
        userId: userSquads[i].userId,
        squadId: userSquads[i].squadId,
      });
    }
  }
}

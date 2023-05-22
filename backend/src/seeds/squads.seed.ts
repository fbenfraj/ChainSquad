import Squad from "../models/squad.model";

export async function seedSquads() {
  const squads: Partial<Squad>[] = [
    {
      squadName: "Gorilla Slap eSports",
      createdBy: 1,
    },
    {
      squadName: "Team Liquid",
      createdBy: 1,
    },
    {
      squadName: "Team Solo Mid",
      createdBy: 1,
    },
    {
      squadName: "Cloud 9",
      createdBy: 2,
    },
    {
      squadName: "Team Envy",
      createdBy: 2,
    },
  ];

  for (let i = 0; i < squads.length; i++) {
    const existingSquad = await Squad.findOne({
      where: { squadName: squads[i].squadName },
    });

    if (!existingSquad) {
      await Squad.create({
        squadName: squads[i].squadName,
        createdBy: squads[i].createdBy,
      });
    }
  }
}

import Lineup from "../models/lineup.model";

export async function seedLineups() {
  const lineups: Partial<Lineup>[] = [
    {
      lineupName: "League of Legends Team",
      createdBy: 1,
      squadId: 1,
    },
    {
      lineupName: "CS:GO Team",
      createdBy: 1,
      squadId: 1,
    },
    {
      lineupName: "Valorant Team",
      createdBy: 1,
      squadId: 1,
    },
    {
      lineupName: "League of Legends Team",
      createdBy: 1,
      squadId: 2,
    },
  ];

  for (let i = 0; i < lineups.length; i++) {
    const existingLineup = await Lineup.findOne({
      where: { lineupName: lineups[i].lineupName },
    });

    if (!existingLineup) {
      await Lineup.create({
        lineupName: lineups[i].lineupName,
        createdBy: lineups[i].createdBy,
        squadId: lineups[i].squadId,
      });
    }
  }
}

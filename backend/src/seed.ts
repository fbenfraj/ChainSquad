import bcrypt from "bcrypt";
import { sequelize } from "./database";
import User from "./models/user.model";
import Squad from "./models/squad.model";
import Lineup from "./models/lineup.model";
import UserLineup from "./models/userlineup.model";
import { Role } from "./types";

sequelize.sync().then(async () => {
  await seed();
});

async function seed() {
  await seedUsers();
  await seedSquads();
  await seedLineups();
  await seedLineupMembers();
}

async function seedUsers() {
  const users: string[] = [
    "sybreed",
    "minkey",
    "flame",
    "stealth",
    "rhydon",
    "foxie",
    "thomas",
    "mistafluffy",
  ];

  for (let i = 0; i < users.length; i++) {
    const existingUser = await User.findOne({
      where: { username: users[i] },
    });

    if (!existingUser) {
      await User.create({
        username: users[i],
        email: `${users[i]}@gmail.com`,
        passwordHash: bcrypt.hashSync("password", 10),
      });
    }
  }
}

async function seedSquads() {
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

async function seedLineups() {
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

async function seedLineupMembers() {
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
      lineupId: 2,
      role: Role.Other,
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

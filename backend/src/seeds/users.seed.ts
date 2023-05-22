import User from "../models/user.model";
import bcrypt from "bcrypt";

export async function seedUsers() {
  const users: string[] = [
    "Sybreed",
    "Minkey",
    "Flame",
    "Stealth",
    "Rhydon",
    "Foxie",
    "Thomas",
    "Mistafluffy",
  ];

  for (let i = 0; i < users.length; i++) {
    const normalizedUsername = users[i].toLowerCase();

    const existingUser = await User.findOne({
      where: { username: normalizedUsername },
    });

    if (!existingUser) {
      await User.create({
        username: normalizedUsername,
        displayName: users[i],
        email: `${normalizedUsername}@gmail.com`,
        passwordHash: bcrypt.hashSync("password", 10),
      });
    }
  }
}

import User from "../models/user.model";
import bcrypt from "bcrypt";

export async function seedUsers() {
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

import { sequelize } from "./database";
import { seedUsers } from "./seeds/users.seed";
import { seedSquads } from "./seeds/squads.seed";
import { seedLineups } from "./seeds/lineups.seed";
import { seedSquadUsers } from "./seeds/usersquads.seed";
import { seedLineupMembers } from "./seeds/userlineups.seed";

sequelize
  .sync({
    force: process.env.NODE_ENV === "development",
  })
  .then(async () => {
    await seedUsers();
    await seedSquads();
    await seedSquadUsers();
    await seedLineups();
    await seedLineupMembers();
  });

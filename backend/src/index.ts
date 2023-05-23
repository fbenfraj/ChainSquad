import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./database";
import authenticationRoutes from "./controllers/authentication.controller";
import usersRoutes from "./controllers/users.controller";
import profileRoutes from "./controllers/profile.controller";
import squadsRoutes from "./controllers/squads.controller";
import lineupsRoutes from "./controllers/lineups.controller";
import invitationsRoutes from "./controllers/invitations.controller";
import { handleError } from "./errors";

dotenv.config();

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(cors());

app.use("/auth", authenticationRoutes);
app.use("/users", usersRoutes);
app.use("/profile", profileRoutes);
app.use("/squads", squadsRoutes);
app.use("/lineups", lineupsRoutes);
app.use("/invitations", invitationsRoutes);

app.use(handleError);

sequelize
  .sync()
  .then(() =>
    app.listen(port, () => {
      console.log(`ChainSquad server is running on port ${port}!`);
    })
  )
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

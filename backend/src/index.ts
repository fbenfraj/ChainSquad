import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./database";
import authenticationRoutes from "./controllers/authentication.controller";
import usersRoutes from "./controllers/users.controller";

dotenv.config();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use("/auth", authenticationRoutes);
app.use("/users", usersRoutes);

sequelize.sync().then(() =>
  app.listen(port, () => {
    console.log(`ChainSquad server is running on port ${port}!`);
  })
);

import express from "express";
import { sequelize } from "./database";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

sequelize.sync().then(() =>
  app.listen(port, () => {
    console.log(`ChainSquad server is running on port ${port}!`);
  })
);

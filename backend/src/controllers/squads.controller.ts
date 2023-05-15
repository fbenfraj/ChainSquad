import express, { Request, Response } from "express";
import SquadService from "../services/squads.service";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { squadName, description, createdBy } = req.body;

  const newSquad = await SquadService.createSquad(
    squadName,
    description,
    createdBy
  );

  res.json(newSquad);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const squad = await SquadService.getSquadById(parseInt(id));

  if (!squad) {
    res.status(404).json({ error: "Squad not found" });
    return;
  }

  res.json(squad);
});

router.get("/", async (req: Request, res: Response) => {
  const squads = await SquadService.getAllSquads();

  res.json(squads);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { squadName, description } = req.body;

  const updatedSquad = await SquadService.updateSquad(parseInt(id), {
    squadName,
    description,
  });

  if (!updatedSquad) {
    res.status(404).json({ error: "Squad not found" });
    return;
  }

  res.json(updatedSquad);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const wasDeleted = await SquadService.deleteSquad(parseInt(id));

  if (!wasDeleted) {
    res.status(404).json({ error: "Squad not found" });
    return;
  }

  res.json({ message: "Squad deleted successfully" });
});

export default router;

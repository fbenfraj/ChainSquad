import express, { Request, Response } from "express";
import LineupService from "../services/lineups.service";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { lineupName, squadId, createdBy } = req.body;
  const newLineup = await LineupService.createLineup(
    lineupName,
    squadId,
    createdBy
  );

  res.json(newLineup);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const lineup = await LineupService.getLineupById(parseInt(id));

  if (!lineup) {
    res.status(404).json({ error: "Lineup not found" });
    return;
  }

  res.json(lineup);
});

router.get("/", async (req: Request, res: Response) => {
  const lineups = await LineupService.getAllLineups();

  res.json(lineups);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { lineupName, squadId } = req.body;

  const updatedLineup = await LineupService.updateLineup(parseInt(id), {
    lineupName,
    squadId,
  });

  if (!updatedLineup) {
    res.status(404).json({ error: "Lineup not found" });
    return;
  }

  res.json(updatedLineup);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const wasDeleted = await LineupService.deleteLineup(parseInt(id));

  if (!wasDeleted) {
    res.status(404).json({ error: "Lineup not found" });
    return;
  }

  res.json({ message: "Lineup deleted successfully" });
});

export default router;

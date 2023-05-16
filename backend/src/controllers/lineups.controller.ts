import express, { Request, Response } from "express";
import LineupService from "../services/lineups.service";
import { z } from "zod";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { lineupName, squadId, createdBy } = req.body;

    const newLineup = await LineupService.createLineup(
      lineupName,
      squadId,
      createdBy
    );

    res.json(newLineup);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((e) => e.message).join(", ");

      res.status(400).send(errorMessage);
    } else {
      res.status(500).send((error as Error).toString());
    }
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const lineup = await LineupService.getLineupById(parseInt(id));

    if (!lineup) {
      res.status(404).json({ error: "Lineup not found" });
      return;
    }

    res.json(lineup);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((e) => e.message).join(", ");
      res.status(400).send(errorMessage);
    } else {
      res.status(500).send((error as Error).toString());
    }
  }
});

router.get("/", async (req: Request, res: Response) => {
  const lineups = await LineupService.getAllLineups();

  res.json(lineups);
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((e) => e.message).join(", ");
      res.status(400).send(errorMessage);
    } else {
      res.status(500).send((error as Error).toString());
    }
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const wasDeleted = await LineupService.deleteLineup(parseInt(id));

    if (!wasDeleted) {
      res.status(404).json({ error: "Lineup not found" });
      return;
    }

    res.json({ message: "Lineup deleted successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((e) => e.message).join(", ");
      res.status(400).send(errorMessage);
    } else {
      res.status(500).send((error as Error).toString());
    }
  }
});

router.get("/squad/:squadId", async (req: Request, res: Response) => {
  try {
    const { squadId } = req.params;

    const lineups = await LineupService.getLineupsBySquad(parseInt(squadId));

    if (!lineups || lineups.length === 0) {
      res.status(404).json({ error: "No lineups found for the given squad" });
      return;
    }

    res.json(lineups);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((e) => e.message).join(", ");
      res.status(400).send(errorMessage);
    } else {
      res.status(500).send((error as Error).toString());
    }
  }
});

export default router;

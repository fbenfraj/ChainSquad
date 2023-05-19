import express, { NextFunction, Request, Response } from "express";
import LineupService from "../services/lineups.service";
import userlineupService from "../services/userlineup.service";
import { authenticateToken } from "../auth";

const router = express.Router();

router.post("/", authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lineupName, squadId, createdBy } = req.body;

    const newLineup = await LineupService.createLineup(
      lineupName,
      squadId,
      createdBy
    );

    res.json(newLineup);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const lineup = await LineupService.getLineupById(parseInt(id));

    if (!lineup) {
      res.status(404).json({ error: "Lineup not found" });
      return;
    }

    res.json(lineup);
  } catch (error) {
    next(error);
  }
});

router.get("/", authenticateToken, async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const lineups = await LineupService.getAllLineups();

    res.json(lineups);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
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
    next(error);
  }
});

router.delete(
  "/:id", authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const wasDeleted = await LineupService.deleteLineup(parseInt(id));

      if (!wasDeleted) {
        res.status(404).json({ error: "Lineup not found" });
        return;
      }

      res.json({ message: "Lineup deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/squad/:squadId", authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { squadId } = req.params;

      const lineups = await LineupService.getLineupsBySquad(parseInt(squadId));

      if (!lineups || lineups.length === 0) {
        res.status(404).json({ error: "No lineups found for the given squad" });
        return;
      }

      res.json(lineups);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:lineupId/add", authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lineupId } = req.params;
      const { users } = req.body;

      const lineup = await userlineupService.addMembersToLineup(
        parseInt(lineupId),
        users
      );

      if (!lineup) {
        res.status(404).json({ error: "Lineup not found" });
        return;
      }

      res.json(lineup);
    } catch (error) {
      next(error);
    }
  }
);

export default router;

import express, { NextFunction, Request, Response } from "express";
import SquadService from "../services/squads.service";
import { authenticateToken } from "../auth";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { squadName, description, createdBy } = req.body;

      const newSquad = await SquadService.createSquad(
        squadName,
        description,
        createdBy
      );

      res.json(newSquad);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const squad = await SquadService.getSquadById(parseInt(id));

      if (!squad) {
        res.status(404).json({ error: "Squad not found" });
        return;
      }

      res.json(squad);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/",
  authenticateToken,
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const squads = await SquadService.getAllSquads();

      res.json(squads);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const wasDeleted = await SquadService.deleteSquad(parseInt(id));

      if (!wasDeleted) {
        res.status(404).json({ error: "Squad not found" });
        return;
      }

      res.json({ message: "Squad deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/user/:userId",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;

      const squads = await SquadService.getSquadsByUser(parseInt(userId));

      if (!squads || squads.length === 0) {
        res.status(404).json({ error: "No squads found for the given user" });
        return;
      }

      res.json(squads);
    } catch (error) {
      next(error);
    }
  }
);

export default router;

import express, { Request, Response } from "express";
import SquadService from "../services/squads.service";
import { z } from "zod";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { squadName, description, createdBy } = req.body;

    const newSquad = await SquadService.createSquad(
      squadName,
      description,
      createdBy
    );

    res.json(newSquad);
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

    const squad = await SquadService.getSquadById(parseInt(id));

    if (!squad) {
      res.status(404).json({ error: "Squad not found" });
      return;
    }

    res.json(squad);
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
  const squads = await SquadService.getAllSquads();

  res.json(squads);
});

router.put("/:id", async (req: Request, res: Response) => {
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

    const wasDeleted = await SquadService.deleteSquad(parseInt(id));

    if (!wasDeleted) {
      res.status(404).json({ error: "Squad not found" });
      return;
    }

    res.json({ message: "Squad deleted successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((e) => e.message).join(", ");
      res.status(400).send(errorMessage);
    } else {
      res.status(500).send((error as Error).toString());
    }
  }
});

router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const squads = await SquadService.getSquadsByUser(parseInt(userId));

    if (!squads || squads.length === 0) {
      res.status(404).json({ error: "No squads found for the given user" });
      return;
    }

    res.json(squads);
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

import express, { Request, Response } from "express";
import UserService from "../services/users.service";
import { z } from "zod";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await UserService.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    res.status(500).send((error as Error).toString());
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send((error as Error).toString());
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const { fullName } = req.body;
    const user = await UserService.updateUser(userId, fullName);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    res.status(500).send((error as Error).toString());
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    await UserService.deleteUser(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    res.status(500).send((error as Error).toString());
  }
});

export default router;

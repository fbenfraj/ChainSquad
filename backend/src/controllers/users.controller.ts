import express, { Request, Response } from "express";
import UserService from "../services/users.service";

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
    res.status(500).send((error as Error).toString());
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    await UserService.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send((error as Error).toString());
  }
});

export default router;

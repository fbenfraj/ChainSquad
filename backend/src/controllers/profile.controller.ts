import { authenticateToken } from "../auth";
import express, { Request, Response } from "express";
import usersService from "../services/users.service";

const router = express.Router();

router.get("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;
    const user = await usersService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

export default router;

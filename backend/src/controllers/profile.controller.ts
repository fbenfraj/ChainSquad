import { authenticateToken } from "../auth";
import express, { NextFunction, Request, Response } from "express";
import usersService from "../services/users.service";

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;
      const user = await usersService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.user.userId);
      const user = await usersService.updateUser(userId, req.body);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

export default router;

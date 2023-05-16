import express, { Request, Response } from "express";
import AuthenticationService from "../services/authentication.service";
import { z } from "zod";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, fullName, email, password } = req.body;
    const newUser = await AuthenticationService.signUp(
      username,
      fullName,
      email,
      password
    );
    res.json(newUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    res.status(500).json({ error: (error as Error).toString() });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const tokens = await AuthenticationService.signIn(username, password);
    res.json(tokens);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    if (
      (error as Error).message === "No such user found" ||
      (error as Error).message === "Invalid password"
    ) {
      return res.status(401).json({ error: (error as Error).toString() });
    }
    res.status(500).json({ error: (error as Error).toString() });
  }
});

router.post("/refresh", async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const newAccessToken =
      AuthenticationService.refreshAccessToken(refreshToken);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(error.errors[0].message);
    }
    if ((error as Error).message === "Invalid refresh token") {
      return res.status(401).json({ error: (error as Error).toString() });
    }
    res.status(500).json({ error: (error as Error).toString() });
  }
});

export default router;

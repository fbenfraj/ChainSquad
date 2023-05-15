import express, { Request, Response } from "express";
import AuthenticationService from "../services/authentication.service";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, fullName, email, password, walletAddress } = req.body;
    const newUser = await AuthenticationService.signUp(
      username,
      fullName,
      email,
      password,
      walletAddress
    );
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: (error as Error).toString() });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const tokens = await AuthenticationService.signIn(username, password);
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: (error as Error).toString() });
  }
});

router.post("/refresh", async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const newAccessToken =
      AuthenticationService.refreshAccessToken(refreshToken);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ error: (error as Error).toString() });
  }
});

export default router;

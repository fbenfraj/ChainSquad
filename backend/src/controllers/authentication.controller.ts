import express, { NextFunction, Request, Response } from "express";
import AuthenticationService from "../services/authentication.service";

const router = express.Router();

router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
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
      next(error);
    }
  }
);

router.post(
  "/signin",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const tokens = await AuthenticationService.signIn(username, password);
      res.json(tokens);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/refresh",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      const newAccessToken =
        AuthenticationService.refreshAccessToken(refreshToken);
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

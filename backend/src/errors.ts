import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export function handleError(
  err: Error | z.ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof z.ZodError) {
    return res.status(400).json({ error: fromZodError(err) });
  }
  switch (err.message) {
    case "Invalid credentials.":
      return res.status(401).json({ error: err.message });
    case "Username or email already exists":
    case "Invalid refresh token":
      return res.status(409).json({ error: err.message });
    case "User not found":
    case "Squad not found":
    case "No squads found for the given user":
    case "Lineup not found":
    case "No lineups found for the given squad":
      return res.status(404).json({ error: err.message });
    default:
      return res.status(500).json({ error: "An unexpected error occurred." });
  }
}

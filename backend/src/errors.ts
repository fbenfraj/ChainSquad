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
    return res.status(400).json({
      error: fromZodError(err).message,
    });
  }

  if (
    err instanceof Error &&
    err.name === "SequelizeForeignKeyConstraintError"
  ) {
    return res.status(409).json({ error: "Foreign entity does not exist" });
  }

  switch (err.message) {
    case "Invalid credentials":
    case "User not authorized to accept this invitation":
    case "Invitation is not for this squad":
      return res.status(401).json({ error: err.message });

    case "Username or email already exists":
    case "Invalid refresh token":
    case "Invitee is already in the squad":
    case "Invitee has already been invited to the squad":
      return res.status(409).json({ error: err.message });

    case "User not found":
    case "No users found":
    case "Squad not found":
    case "Lineup not found":
    case "Invitation not found":
    case "No squads found for the given user":
    case "No lineups found for the given squad":
    case "No members found for the given lineup":
    case "Failed to update invitation":
      return res.status(404).json({ error: err.message });

    default:
      console.error(`An unexpected error occured: ${err.message}`);
      return res.status(500).json({ error: "An unexpected error occurred." });
  }
}

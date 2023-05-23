import express, { NextFunction, Request, Response } from "express";
import { authenticateToken } from "../auth";
import invitationsService from "../services/invitations.service";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { invitedId, squadId } = req.body;
      const invitation = await invitationsService.createInvitation(
        invitedId,
        squadId
      );
      res.json(invitation);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:invitationCode",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { invitationCode } = req.params;
      const updateFields = req.body;
      const invitation = await invitationsService.updateInvitation(
        invitationCode,
        updateFields
      );
      if (invitation) {
        res.json(invitation);
      } else {
        res.status(404).send("Invitation not found");
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/user/:userId",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const invitations = await invitationsService.getInvitationsByUser(
        parseInt(userId)
      );
      if (invitations && invitations.length > 0) {
        res.json(invitations);
      } else {
        res.status(404).send("No invitations found for the user");
      }
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:invitationCode",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { invitationCode } = req.params;
      const deleted = await invitationsService.deleteInvitation(invitationCode);
      if (deleted) {
        res.status(204).send("Invitation deleted");
      } else {
        res.status(404).send("Invitation not found");
      }
    } catch (error) {
      next(error);
    }
  }
);

export default router;

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

router.post(
  "/accept",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { invitationCode } = req.body;
      const userId = req.user.userId;
      const invitation = await invitationsService.acceptInvitation(
        invitationCode,
        userId
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

router.post(
  "/decline",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { invitationCode } = req.body;
      const userId = req.user.userId;
      const invitation = await invitationsService.declineInvitation(
        invitationCode,
        userId
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

router.get("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;
    const invitations = await invitationsService.getInvitations(userId);

    return res.json(invitations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

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

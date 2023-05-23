import Invitation, { InvitationStatus } from "../models/invitation.model";
import {
  InvitationValidationSchema,
  InvitationUpdateSchema,
} from "../validations/invitation.validation";
import { IdSchema } from "../validations/general.validation";
import UserSquad from "../models/usersquad.model";

class InvitationService {
  async createInvitation(
    invitedId: number,
    squadId: number
  ): Promise<Invitation> {
    try {
      InvitationValidationSchema.parse({
        invitedId,
        squadId,
      });

      const inviteeInSquad = await UserSquad.findOne({
        where: { userId: invitedId, squadId },
      });

      if (inviteeInSquad) {
        throw new Error("Invitee is already in the squad");
      }

      const invitation = new Invitation({
        invitedId,
        squadId,
      });

      await invitation.save();

      return invitation;
    } catch (error) {
      throw error;
    }
  }

  async updateInvitation(
    invitationCode: string,
    updateFields: { status?: InvitationStatus }
  ): Promise<Invitation | null> {
    try {
      const validInvitationCode = IdSchema.parse(invitationCode);
      InvitationUpdateSchema.parse(updateFields);

      const invitation = await Invitation.findOne({
        where: { invitationCode: validInvitationCode },
      });

      if (!invitation) {
        return null;
      }

      if (updateFields.status) {
        invitation.status = updateFields.status;
      }

      await invitation.save();

      return invitation;
    } catch (error) {
      throw error;
    }
  }

  async getInvitations(userId: number): Promise<Invitation[]> {
    try {
      const validUserId = IdSchema.parse(userId);
      const invitations = await Invitation.findAll({
        where: { invitedId: validUserId },
      });

      return invitations;
    } catch (error) {
      throw error;
    }
  }

  async getInvitationsBySquad(squadId: number): Promise<Invitation[]> {
    try {
      const validSquadId = IdSchema.parse(squadId);
      const invitations = await Invitation.findAll({
        where: { squadId: validSquadId },
      });

      return invitations;
    } catch (error) {
      throw error;
    }
  }

  async deleteInvitation(invitationCode: string): Promise<boolean> {
    try {
      const validInvitationCode = IdSchema.parse(invitationCode);
      const invitation = await Invitation.findOne({
        where: { invitationCode: validInvitationCode },
      });

      if (!invitation) {
        return false;
      }

      await invitation.destroy();

      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default new InvitationService();

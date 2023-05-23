import Invitation, { InvitationStatus } from "../models/invitation.model";
import {
  InvitationValidationSchema,
  InvitationUpdateSchema,
} from "../validations/invitation.validation";
import { IdSchema } from "../validations/general.validation";
import UserSquad from "../models/usersquad.model";

class InvitationService {
  async createInvitation(
    inviterId: number,
    inviteeId: number,
    squadId: number
  ): Promise<Invitation> {
    try {
      InvitationValidationSchema.parse({
        inviterId,
        inviteeId,
        squadId,
      });

      const inviterInSquad = await UserSquad.findOne({
        where: { userId: inviterId, squadId: squadId },
      });

      if (!inviterInSquad) {
        throw new Error("Inviter is not in the squad");
      }

      const inviteeInSquad = await UserSquad.findOne({
        where: { userId: inviteeId, squadId: squadId },
      });

      if (inviteeInSquad) {
        throw new Error("Invitee is already in the squad");
      }

      const invitation = new Invitation({
        inviterId,
        inviteeId,
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

  async getInvitationsByUser(userId: number): Promise<Invitation[]> {
    try {
      const validUserId = IdSchema.parse(userId);
      const invitations = await Invitation.findAll({
        where: { inviteeId: validUserId },
      });

      return invitations;
    } catch (error) {
      throw error;
    }
  }
}

export default new InvitationService();

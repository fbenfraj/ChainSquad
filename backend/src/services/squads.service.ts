import { z } from "zod";
import Squad from "../models/squad.model";
import {
  SquadValidationSchema,
  UpdateSquadValidationSchema,
} from "../validations/squad.validation";
import { IdSchema } from "../validations/general.validation";
import lineupsService from "./lineups.service";
import usersquadsService from "./usersquads.service";
import invitationsService from "./invitations.service";

class SquadService {
  async createSquad(
    squadName: string,
    description: string,
    createdBy: number
  ): Promise<Squad> {
    try {
      SquadValidationSchema.parse({
        squadName,
        description,
        createdBy,
      });

      const squad = new Squad({
        squadName: squadName,
        description,
        createdBy,
      });

      await squad.save();

      return squad;
    } catch (error) {
      throw error;
    }
  }

  async getSquadById(squadId: number): Promise<Squad> {
    try {
      const validSquadId = IdSchema.parse(squadId);
      const squad = await Squad.findByPk(validSquadId);
      const lineups = await lineupsService.getLineupsBySquad(validSquadId);
      const members = await usersquadsService.getSquadMembers(validSquadId);
      const invitations = await invitationsService.getInvitationsBySquad(
        validSquadId
      );

      return {
        ...squad?.get(),
        lineups,
        members,
        invitations,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((e) => e.message).join(", ");
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  async getAllSquads(): Promise<Squad[]> {
    const squads = await Squad.findAll();
    return squads;
  }

  async updateSquad(
    id: number,
    updateFields: { squadName?: string; description?: string }
  ): Promise<Squad | null> {
    try {
      const squadId = IdSchema.parse(id);
      UpdateSquadValidationSchema.parse(updateFields);

      const squad = await Squad.findOne({ where: { squadId } });

      if (!squad) {
        return null;
      }

      if (updateFields.squadName) {
        squad.squadName = updateFields.squadName;
      }

      if (updateFields.description) {
        squad.description = updateFields.description;
      }

      await squad.save();

      return squad;
    } catch (error) {
      throw error;
    }
  }

  async deleteSquad(id: number): Promise<boolean> {
    try {
      const squadId = IdSchema.parse(id);
      const squad = await Squad.findOne({ where: { SquadID: squadId } });

      if (!squad) {
        return false;
      }

      await squad.destroy();

      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((e) => e.message).join(", ");
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  async getSquadsByUser(userId: number): Promise<Squad[]> {
    try {
      const validUserId = IdSchema.parse(userId);
      const squads = await Squad.findAll({ where: { createdBy: validUserId } });

      return squads;
    } catch (error) {
      throw error;
    }
  }
}

export default new SquadService();

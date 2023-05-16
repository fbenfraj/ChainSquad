import { z } from "zod";
import Squad from "../models/squad.model";
import { formatAndThrowZodError } from "../utils/validation";
import {
  SquadValidationSchema,
  UpdateSquadValidationSchema,
} from "../validations/squad.validation";

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
        SquadName: squadName,
        Description: description,
        CreatedBy: createdBy,
      });

      await squad.save();

      return squad;
    } catch (error) {
      if (error instanceof z.ZodError) {
        formatAndThrowZodError(error);
      }
      throw error;
    }
  }

  async getSquadById(id: number): Promise<Squad | null> {
    const squad = await Squad.findOne({ where: { SquadID: id } });
    return squad;
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
      UpdateSquadValidationSchema.parse(updateFields);

      const squad = await Squad.findOne({ where: { SquadID: id } });

      if (!squad) {
        return null;
      }

      if (updateFields.squadName) {
        squad.SquadName = updateFields.squadName;
      }

      if (updateFields.description) {
        squad.Description = updateFields.description;
      }

      await squad.save();

      return squad;
    } catch (error) {
      if (error instanceof z.ZodError) {
        formatAndThrowZodError(error);
      }
      throw error;
    }
  }

  async deleteSquad(id: number): Promise<boolean> {
    const squad = await Squad.findOne({ where: { SquadID: id } });

    if (!squad) {
      return false;
    }

    await squad.destroy();

    return true;
  }
}

export default new SquadService();

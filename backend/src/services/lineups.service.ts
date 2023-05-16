import { z } from "zod";
import Lineup from "../models/lineup.model";
import { formatAndThrowZodError } from "../utils/validation";
import {
  LineupValidationSchema,
  UpdateLineupSchema,
} from "../validations/lineup.validation";

class LineupService {
  async createLineup(
    lineupName: string,
    squadId: number,
    createdBy: number
  ): Promise<Lineup> {
    try {
      LineupValidationSchema.parse({
        lineupName,
        squadId,
        createdBy,
      });

      const lineup = new Lineup({
        LineupName: lineupName,
        SquadID: squadId,
        CreatedBy: createdBy,
      });

      await lineup.save();

      return lineup;
    } catch (error) {
      if (error instanceof z.ZodError) {
        formatAndThrowZodError(error);
      }
      throw error;
    }
  }

  async getLineupById(id: number): Promise<Lineup | null> {
    const lineup = await Lineup.findOne({ where: { LineupID: id } });
    return lineup;
  }

  async getAllLineups(): Promise<Lineup[]> {
    const lineups = await Lineup.findAll();
    return lineups;
  }

  async updateLineup(
    id: number,
    updateFields: { lineupName?: string; squadId?: number }
  ): Promise<Lineup | null> {
    try {
      UpdateLineupSchema.parse(updateFields);

      const lineup = await Lineup.findOne({ where: { LineupID: id } });

      if (!lineup) {
        return null;
      }

      if (updateFields.lineupName) {
        lineup.LineupName = updateFields.lineupName;
      }

      if (updateFields.squadId) {
        lineup.SquadID = updateFields.squadId;
      }

      await lineup.save();

      return lineup;
    } catch (error) {
      if (error instanceof z.ZodError) {
        formatAndThrowZodError(error);
      }
      throw error;
    }
  }

  async deleteLineup(id: number): Promise<boolean> {
    const lineup = await Lineup.findOne({ where: { LineupID: id } });

    if (!lineup) {
      return false;
    }

    await lineup.destroy();

    return true;
  }
}

export default new LineupService();

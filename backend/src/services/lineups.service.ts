import { z } from "zod";
import Lineup from "../models/lineup.model";
import { formatAndThrowZodError } from "../utils/validation";
import {
  LineupValidationSchema,
  UpdateLineupSchema,
} from "../validations/lineup.validation";
import { NumeralIdSchema } from "../validations/general.validation";

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
    try {
      const { id: lineupId } = NumeralIdSchema.parse({ id });
      const lineup = await Lineup.findOne({ where: { LineupID: lineupId } });

      return lineup;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((e) => e.message).join(", ");
        throw new Error(errorMessage);
      }
      throw error;
    }
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
      const { id: lineupId } = NumeralIdSchema.parse({ id });
      UpdateLineupSchema.parse(updateFields);

      const lineup = await Lineup.findOne({ where: { LineupID: lineupId } });

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
    try {
      const { id: lineupId } = NumeralIdSchema.parse({ id });
      const lineup = await Lineup.findOne({ where: { LineupID: lineupId } });

      if (!lineup) {
        return false;
      }

      await lineup.destroy();

      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((e) => e.message).join(", ");
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  async getLineupsBySquad(squadId: number): Promise<Lineup[]> {
    try {
      const { id: squadIdValidated } = NumeralIdSchema.parse({ id: squadId });

      const lineups = await Lineup.findAll({
        where: { SquadID: squadIdValidated },
      });

      return lineups;
    } catch (error) {
      if (error instanceof z.ZodError) {
        formatAndThrowZodError(error);
      }
      throw error;
    }
  }
}

export default new LineupService();

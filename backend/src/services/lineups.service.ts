import { z } from "zod";
import Lineup from "../models/lineup.model";
import {
  LineupValidationSchema,
  UpdateLineupSchema,
} from "../validations/lineup.validation";
import { IdSchema } from "../validations/general.validation";
import userlineupService from "./userlineup.service";
import { LineupWithMembers } from "../types";

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
      throw error;
    }
  }

  async getLineupById(id: number): Promise<LineupWithMembers | null> {
    try {
      const lineupId = IdSchema.parse(id);
      const lineup = await Lineup.findOne({ where: { LineupID: lineupId } });
      const members = await userlineupService.getLineupMembers(lineupId);

      return { ...lineup?.get(), members };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((e) => e.message).join(", ");
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  async getAllLineups(): Promise<Lineup[]> {
    try {
      const lineups = await Lineup.findAll();
      return lineups;
    } catch (error) {
      throw error;
    }
  }

  async updateLineup(
    id: number,
    updateFields: { lineupName?: string; squadId?: number }
  ): Promise<Lineup | null> {
    try {
      const lineupId = IdSchema.parse(id);
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
      throw error;
    }
  }

  async deleteLineup(id: number): Promise<boolean> {
    try {
      const lineupId = IdSchema.parse(id);
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
      const validSquadId = IdSchema.parse(squadId);

      const lineups = await Lineup.findAll({
        where: { SquadID: validSquadId },
      });

      return lineups;
    } catch (error) {
      throw error;
    }
  }
}

export default new LineupService();

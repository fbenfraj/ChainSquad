import {
  LineupValidationSchema,
  UpdateLineupSchema,
} from "../../src/validations/lineup.validation";

describe("Lineup validation schemas", () => {
  describe("LineupValidationSchema", () => {
    it("should validate correct lineup data", () => {
      const lineupData = {
        lineupName: "Test Lineup",
        squadId: 1,
        createdBy: 2,
      };

      expect(() => LineupValidationSchema.parse(lineupData)).not.toThrow();
    });

    it("should not validate incorrect lineup data", () => {
      const incorrectLineupData = {
        lineupName: "",
        squadId: -1,
        createdBy: -2,
      };

      expect(() => LineupValidationSchema.parse(incorrectLineupData)).toThrow();
    });
  });

  describe("UpdateLineupSchema", () => {
    it("should validate correct lineup update data", () => {
      const lineupUpdateData = {
        lineupName: "Updated Lineup",
        squadId: 2,
      };

      expect(() => UpdateLineupSchema.parse(lineupUpdateData)).not.toThrow();
    });

    it("should not validate incorrect lineup update data", () => {
      const incorrectLineupUpdateData = {
        lineupName: "",
        squadId: -2,
      };

      expect(() =>
        UpdateLineupSchema.parse(incorrectLineupUpdateData)
      ).toThrow();
    });
  });
});

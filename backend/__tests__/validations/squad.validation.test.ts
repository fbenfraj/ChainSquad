import {
  SquadValidationSchema,
  UpdateSquadValidationSchema,
} from "../../src/validations/squad.validation";

describe("Squad validation schemas", () => {
  describe("SquadValidationSchema", () => {
    it("should validate correct squad data", () => {
      const squadData = {
        squadName: "Test Squad",
        description: "This is a test squad",
        createdBy: 1,
      };

      expect(() => SquadValidationSchema.parse(squadData)).not.toThrow();
    });

    it("should not validate incorrect squad data", () => {
      const incorrectSquadData = {
        squadName: "",
        createdBy: -1,
      };

      expect(() => SquadValidationSchema.parse(incorrectSquadData)).toThrow();
    });
  });

  describe("UpdateSquadValidationSchema", () => {
    it("should validate correct squad update data", () => {
      const squadUpdateData = {
        squadName: "Updated Squad",
        description: "Updated description",
      };

      expect(() =>
        UpdateSquadValidationSchema.parse(squadUpdateData)
      ).not.toThrow();
    });

    it("should not validate incorrect squad update data", () => {
      const incorrectSquadUpdateData = {
        squadName: "",
        description: "",
      };

      expect(() =>
        UpdateSquadValidationSchema.parse(incorrectSquadUpdateData)
      ).toThrow();
    });
  });
});

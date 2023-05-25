import {
  InvitationValidationSchema,
  InvitationUpdateSchema,
} from "../../src/validations/invitation.validation";
import { InvitationStatus } from "../../src/models/invitation.model";

describe("Invitation validation schemas", () => {
  describe("InvitationValidationSchema", () => {
    it("should validate correct invitation data", () => {
      const invitationData = {
        squadId: 1,
        invitedId: 2,
      };

      expect(() =>
        InvitationValidationSchema.parse(invitationData)
      ).not.toThrow();
    });

    it("should not validate incorrect invitation data", () => {
      const incorrectInvitationData = {
        squadId: -1,
        invitedId: -2,
      };

      expect(() =>
        InvitationValidationSchema.parse(incorrectInvitationData)
      ).toThrow();
    });
  });

  describe("InvitationUpdateSchema", () => {
    it("should validate correct invitation update data", () => {
      const invitationUpdateData = {
        squadId: 1,
        invitedId: 2,
        status: InvitationStatus.PENDING,
      };

      expect(() =>
        InvitationUpdateSchema.parse(invitationUpdateData)
      ).not.toThrow();
    });

    it("should not validate incorrect invitation update data", () => {
      const incorrectInvitationUpdateData = {
        squadId: -1,
        invitedId: -2,
        status: "WRONG_STATUS",
      };

      expect(() =>
        InvitationUpdateSchema.parse(incorrectInvitationUpdateData)
      ).toThrow();
    });
  });
});

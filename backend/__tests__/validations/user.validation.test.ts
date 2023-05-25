import {
  UserValidationSchema,
  UpdateUserValidationSchema,
  UserWithRoleSchema,
} from "../../src/validations/user.validation";

describe("User validation schemas", () => {
  describe("UserValidationSchema", () => {
    it("should validate correct user data", () => {
      const userData = {
        username: "Test User",
        email: "test@example.com",
        password: "Password123",
      };

      expect(() => UserValidationSchema.parse(userData)).not.toThrow();
    });

    it("should not validate incorrect user data", () => {
      const incorrectUserData = {
        username: "",
        email: "notanemail",
        password: "short",
      };

      expect(() => UserValidationSchema.parse(incorrectUserData)).toThrow();
    });
  });

  describe("UpdateUserValidationSchema", () => {
    it("should validate correct user update data", () => {
      const userUpdateData = {
        userId: 1,
        username: "Updated User",
        email: "updated@example.com",
        walletAddress: "0x1234567890abcdef",
      };

      expect(() =>
        UpdateUserValidationSchema.parse(userUpdateData)
      ).not.toThrow();
    });

    it("should not validate incorrect user update data", () => {
      const incorrectUserUpdateData = {
        userId: -1,
        username: "",
        email: "notanemail",
      };

      expect(() =>
        UpdateUserValidationSchema.parse(incorrectUserUpdateData)
      ).toThrow();
    });
  });

  describe("UserWithRoleSchema", () => {
    it("should validate correct user with role data", () => {
      const userWithRoleData = [
        {
          userId: 1,
          role: "Player",
        },
        {
          userId: 2,
          role: "Manager",
        },
      ];

      expect(() => UserWithRoleSchema.parse(userWithRoleData)).not.toThrow();
    });

    it("should not validate incorrect user with role data", () => {
      const incorrectUserWithRoleData = [
        {
          userId: -1,
          role: "Invalid Role",
        },
      ];

      expect(() =>
        UserWithRoleSchema.parse(incorrectUserWithRoleData)
      ).toThrow();
    });
  });
});

import {
  SignInValidationSchema,
  RefreshTokenValidationSchema,
} from "../../src/validations/authentication.validation";

describe("Authentication validation schemas", () => {
  describe("SignInValidationSchema", () => {
    it("should validate correct sign in data", () => {
      const signInData = {
        username: "testuser",
        password: "securePassword123!",
      };

      expect(() => SignInValidationSchema.parse(signInData)).not.toThrow();
    });

    it("should not validate incorrect sign in data", () => {
      const incorrectSignInData = {
        username: "t",
        password: "123",
      };

      expect(() => SignInValidationSchema.parse(incorrectSignInData)).toThrow();
    });
  });

  describe("RefreshTokenValidationSchema", () => {
    it("should validate correct refresh token data", () => {
      const refreshTokenData = {
        refreshToken: "refreshToken",
      };

      expect(() =>
        RefreshTokenValidationSchema.parse(refreshTokenData)
      ).not.toThrow();
    });

    it("should not validate incorrect refresh token data", () => {
      const incorrectRefreshTokenData = {
        refreshToken: "",
      };

      expect(() =>
        RefreshTokenValidationSchema.parse(incorrectRefreshTokenData)
      ).toThrow();
    });
  });
});

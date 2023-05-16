import { z } from "zod";
import User from "../models/user.model";
import { formatAndThrowZodError } from "../utils/validation";
import { UpdateUserValidationSchema } from "../validations/user.validation";
import { NumeralIdSchema } from "../validations/general.validation";

class UserService {
  async getUserById(userId: number): Promise<User | null> {
    try {
      const { id } = NumeralIdSchema.parse({ id: userId });
      return await User.findByPk(id);
    } catch (error) {
      if (error instanceof z.ZodError) {
        formatAndThrowZodError(error);
      }
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    return await User.findAll();
  }

  async updateUser(
    userId: number,
    fullName: string | undefined
  ): Promise<User | null> {
    try {
      UpdateUserValidationSchema.parse({
        userId,
        fullName,
      });

      const user = await this.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      if (fullName) user.FullName = fullName;

      await user.save();

      return user;
    } catch (error) {
      if (error instanceof z.ZodError) {
        formatAndThrowZodError(error);
      }
      throw error;
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      const { id } = NumeralIdSchema.parse({ id: userId });

      const user = await this.getUserById(id);
      if (!user) {
        throw new Error("User not found");
      }

      await user.destroy();
    } catch (error) {
      if (error instanceof z.ZodError) {
        formatAndThrowZodError(error);
      }
      throw error;
    }
  }
}

export default new UserService();

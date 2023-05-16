import { z } from "zod";
import User from "../models/user.model";
import { formatAndThrowZodError } from "../utils/validation";
import { UpdateUserValidationSchema } from "../validations/user.validation";

class UserService {
  async getUserById(userId: number): Promise<User | null> {
    return await User.findByPk(userId);
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
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    await user.destroy();
  }
}

export default new UserService();

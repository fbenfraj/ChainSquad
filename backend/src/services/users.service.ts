import User from "../models/user.model";
import { UpdateUserValidationSchema } from "../validations/user.validation";
import { IdSchema } from "../validations/general.validation";
import squadsService from "./squads.service";

class UserService {
  async getUserById(userId: number): Promise<Partial<User>> {
    try {
      const id = IdSchema.parse(userId);
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error("User not found");
      }

      const squads = await squadsService.getSquadsByUser(id);

      return {
        ...this.sanitizeUser(user),
        squads,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(): Promise<Partial<User>[]> {
    try {
      const users = await User.findAll();

      if (!users) {
        throw new Error("No users found");
      }

      return users.map((user) => this.sanitizeUser(user));
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: number): Promise<Partial<User> | null> {
    try {
      UpdateUserValidationSchema.parse({
        userId,
      });

      const user = await this.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      await user.save?.();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      const id = IdSchema.parse(userId);
      const user = await this.getUserById(id);

      if (!user) {
        throw new Error("User not found");
      }

      await user.destroy?.();
    } catch (error) {
      throw error;
    }
  }

  sanitizeUser(user: User): Partial<User> {
    const sanitizedUser = user.toJSON() as User;
    delete sanitizedUser.passwordHash;
    return sanitizedUser;
  }
}

export default new UserService();

import User from "../models/user.model";
import { UpdateUserValidationSchema } from "../validations/user.validation";
import { IdSchema } from "../validations/general.validation";

class UserService {
  async getUserById(userId: number): Promise<User | null> {
    try {
      const id = IdSchema.parse(userId);
      return await User.findByPk(id);
    } catch (error) {
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

      await user.destroy();
    } catch (error) {
      throw error;
    }
  }

  sanitizeUser(user: User): Partial<User> {
    const sanitizedUser = user.toJSON() as User;
    delete sanitizedUser.PasswordHash;
    return sanitizedUser;
  }
}

export default new UserService();

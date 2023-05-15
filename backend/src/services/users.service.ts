import User from "../models/user.model";

class UserService {
  async getUserById(userId: number): Promise<User | null> {
    return await User.findByPk(userId);
  }

  async getAllUsers(): Promise<User[]> {
    return await User.findAll();
  }

  async updateUser(
    userId: number,
    fullName: string | undefined,
    walletAddress: string | undefined
  ): Promise<User | null> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.FullName = fullName;
    user.WalletAddress = walletAddress;

    await user.save();

    return user;
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

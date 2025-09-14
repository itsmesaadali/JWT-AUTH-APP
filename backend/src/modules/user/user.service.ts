import { NotFoundException } from "../../common/utils/catch-errors";
import UserModel from "../../database/models/user.model";

export class UserService {
  public async getUserById(userId: string) {
    const user = await UserModel.findById(userId).select("-password -refreshToken");
    
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  public async updateUser(userId: string, updateData: any) {
    // Remove fields that shouldn't be updated
    const { password, refreshToken, email, ...safeUpdateData } = updateData;
    
    const user = await UserModel.findByIdAndUpdate(
      userId,
      safeUpdateData,
      { new: true, runValidators: true }
    ).select("-password -refreshToken");
    
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  public async getAllUsers() {
    const users = await UserModel.find().select("-password -refreshToken");
    return users;
  }
}
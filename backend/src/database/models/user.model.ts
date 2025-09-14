import mongoose, { Document, Schema } from "mongoose";
import { compareValue, hashValue } from "../../common/utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../common/utils/jwt";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(value: string): Promise<boolean>;
  createAccessToken(): string;
  createRefreshToken(): string;
  toSafeObject(): any; // Add this method
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashValue(this.password);
  }
  next();
});

userSchema.methods.comparePassword = async function (value: string) {
  return compareValue(value, this.password);
};

userSchema.methods.createAccessToken = function () {
  return generateAccessToken({
    _id: this._id,
    email: this.email,
    name: this.name,
  });
};

userSchema.methods.createRefreshToken = function () {
  return generateRefreshToken({
    _id: this._id,
  });
};

// Add this method to the schema
userSchema.methods.toSafeObject = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.refreshToken;
  return userObject;
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;

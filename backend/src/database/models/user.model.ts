import mongoose, { Document, Schema } from 'mongoose';
import { compareValue, hashValue } from '../../common/utils/bcrypt';
import { generateAccessToken, generateRefreshToken } from '../../common/utils/jwt';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string; // Changed to optional
  avatar: string;
  refreshToken: string;
  authProvider: 'local' | 'google';
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(value: string): Promise<boolean>;
  createAccessToken(): string;
  createRefreshToken(): string;
  toSafeObject(): any;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: function () {
        return this.authProvider === 'local';
      },
    },
    avatar: { type: String },
    refreshToken: { type: String },
    authProvider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
      required: true,
    },
    googleId: { type: String, sparse: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.authProvider === 'local' && this.password) {
    this.password = await hashValue(this.password);
  }
  next();
});

userSchema.methods.comparePassword = async function (value: string) {
  if (this.authProvider !== 'local') {
    throw new Error('Password comparison only available for local authentication');
  }
  if (!this.password) {
    throw new Error('No password set for this user');
  }
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

userSchema.methods.toSafeObject = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.refreshToken;
  delete userObject.authProvider;
  delete userObject.googleId;
  return userObject;
};

const UserModel = mongoose.model<UserDocument>('User', userSchema);
export default UserModel;
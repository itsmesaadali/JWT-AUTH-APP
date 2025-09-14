import { UserDocument } from "../../database/models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}
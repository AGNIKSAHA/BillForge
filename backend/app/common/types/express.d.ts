import { IUserDocument } from "../../modules/user/user.model.js";

declare global {
  namespace Express {
    interface User extends IUserDocument {}

    interface Request {
      user?: IUserDocument;
    }
  }
}

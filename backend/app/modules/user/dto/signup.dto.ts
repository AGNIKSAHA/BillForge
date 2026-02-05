import { UserRole } from "../user.types.js";

export interface SignupDTO {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

import { Types } from "mongoose";

export interface IClient {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  userId: Types.ObjectId;
}

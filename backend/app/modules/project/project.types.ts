import { Types } from "mongoose";

export interface IProject {
  name: string;
  description?: string;

  hourlyRate: number;

  userId: Types.ObjectId;
  clientId: Types.ObjectId;
}

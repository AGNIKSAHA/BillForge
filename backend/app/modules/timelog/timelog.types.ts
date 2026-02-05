import { Types } from "mongoose";

export interface ITimeLog {
  userId: Types.ObjectId;
  projectId: Types.ObjectId;

  startTime: Date;
  endTime?: Date;

  duration: number; // stored in hours
}

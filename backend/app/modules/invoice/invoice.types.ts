import { Types } from "mongoose";

export interface IInvoice {
  userId: Types.ObjectId;
  clientId: Types.ObjectId;
  projectId: Types.ObjectId;

  totalHours: number;
  hourlyRate: number;
  totalAmount: number;

  status: "pending" | "paid";

  issuedAt: Date;
}

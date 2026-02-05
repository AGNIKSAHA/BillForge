import mongoose, { Schema, Document } from "mongoose";
import { IInvoice } from "./invoice.types.js";

export interface IInvoiceDocument extends IInvoice, Document {}

const invoiceSchema = new Schema<IInvoiceDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },

    totalHours: { type: Number, required: true },
    hourlyRate: { type: Number, required: true },
    totalAmount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending"
    },

    issuedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model<IInvoiceDocument>("Invoice", invoiceSchema);

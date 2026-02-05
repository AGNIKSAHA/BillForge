import { Types } from "mongoose";
import Invoice from "./invoice.model.js";
import Project from "../project/project.model.js";
import Client from "../client/client.model.js";
import TimeLog from "../timelog/timelog.model.js";

import { sendMail } from "../../common/utils/mail.js";
import PDFDocument from "pdfkit";
import { Buffer } from "buffer";

export const createInvoiceService = async (
  userId: Types.ObjectId,
  projectId: string
) => {
  /* Fetch Project */
  const project = await Project.findOne({
    _id: projectId,
    userId
  });

  if (!project) throw new Error("Project not found");

  /* Fetch Client */
  const client = await Client.findById(project.clientId);
  if (!client) throw new Error("Client not found");

  /* Calculate Total Hours */
  const logs = await TimeLog.find({
    projectId: project._id,
    userId
  });

  const totalHours = logs.reduce(
    (sum, log) => sum + log.duration,
    0
  );

  const totalAmount = totalHours * project.hourlyRate;

  /* Create Invoice */
  const invoice = await Invoice.create({
    userId,
    clientId: client._id,
    projectId: project._id,
    totalHours,
    hourlyRate: project.hourlyRate,
    totalAmount
  });

  /* Generate PDF */
  const pdfBuffer = await generateInvoicePDF(invoice, client.name);

  /* Send Email */
  await sendMail(
    client.email,
    "Invoice Generated",
    `<p>Your invoice is attached.</p>`
  );

  return invoice;
};

/* -------- PDF Generator -------- */

const generateInvoicePDF = (
  invoice: any,
  clientName: string
): Promise<Buffer> => {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const buffers: Uint8Array[] = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    doc.fontSize(20).text("Invoice", { align: "center" });
    doc.moveDown();

    doc.text(`Client: ${clientName}`);
    doc.text(`Hours: ${invoice.totalHours}`);
    doc.text(`Rate: ${invoice.hourlyRate}`);
    doc.text(`Total: ${invoice.totalAmount}`);

    doc.end();
  });
};

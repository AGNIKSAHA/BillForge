import { Request, Response } from "express";
import { catchAsync } from "../../common/middlewares/catch.middleware.js";
import { createInvoiceService } from "./invoice.service.js";
import { sendResponse } from "../../common/utils/response.js";
import { getStringParam } from "../../common/utils/request.js";



export const createInvoice = catchAsync(
  async (req: Request, res: Response): Promise<void> => {

    if (!req.user) {
      throw new Error("Unauthorized");
    }

    const projectId = getStringParam(
      req.body.projectId,
      "Project ID"
    );

    const invoice = await createInvoiceService(
      req.user._id,
      projectId
    );

    sendResponse(res, 201, {
      success: true,
      data: invoice
    });
  }
);

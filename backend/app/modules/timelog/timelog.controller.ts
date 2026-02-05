import { Request, Response } from "express";
import { catchAsync } from "../../common/middlewares/catch.middleware.js";

import {
  startTimerService,
  stopTimerService,
  getTimeLogsService
} from "./timelog.service.js";

import { sendResponse } from "../../common/utils/response.js";
import { getStringParam } from "../../common/utils/request.js";


export const startTimer = catchAsync(
  async (req: Request, res: Response) => {

    if (!req.user) throw new Error("Unauthorized");

    const projectId = getStringParam(
      req.body.projectId,
      "Project ID"
    );

    const log = await startTimerService(
      req.user._id,
      projectId
    );

    sendResponse(res, 201, {
      success: true,
      data: log
    });
  }
);



export const stopTimer = catchAsync(
  async (req: Request, res: Response) => {

    if (!req.user) throw new Error("Unauthorized");

    const timelogId = getStringParam(
      req.body.timelogId,
      "Timelog ID"
    );

    const log = await stopTimerService(
      req.user._id,
      timelogId
    );

    sendResponse(res, 200, {
      success: true,
      data: log
    });
  }
);



export const getTimeLogs = catchAsync(
  async (req: Request, res: Response) => {

    if (!req.user) throw new Error("Unauthorized");

    const projectId = getStringParam(
      req.params.projectId,
      "Project ID"
    );

    const logs = await getTimeLogsService(
      req.user._id,
      projectId
    );

    sendResponse(res, 200, {
      success: true,
      data: logs
    });
  }
);

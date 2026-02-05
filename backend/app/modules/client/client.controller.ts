import { Request, Response } from "express";
import { catchAsync } from "../../common/middlewares/catch.middleware.js";

import {
  createClientService,
  getClientsService,
  updateClientService,
  deleteClientService
} from "./client.service.js";

import { sendResponse } from "../../common/utils/response.js";
import { getStringParam } from "../../common/utils/request.js";


export const createClient = catchAsync(
  async (req: Request, res: Response) => {

    if (!req.user) throw new Error("Unauthorized");

    const client = await createClientService(
      req.user._id,
      req.body
    );

    sendResponse(res, 201, {
      success: true,
      data: client
    });
  }
);



export const getClients = catchAsync(
  async (req: Request, res: Response) => {

    if (!req.user) throw new Error("Unauthorized");

    const clients = await getClientsService(
      req.user._id
    );

    sendResponse(res, 200, {
      success: true,
      data: clients
    });
  }
);


export const updateClient = catchAsync(
  async (req: Request, res: Response) => {

    if (!req.user) throw new Error("Unauthorized");

    const clientId = getStringParam(
      req.params.id,
      "Client ID"
    );

    const client = await updateClientService(
      req.user._id,
      clientId,
      req.body
    );

    sendResponse(res, 200, {
      success: true,
      data: client
    });
  }
);



export const deleteClient = catchAsync(
  async (req: Request, res: Response) => {

    if (!req.user) throw new Error("Unauthorized");

    const clientId = getStringParam(
      req.params.id,
      "Client ID"
    );

    await deleteClientService(
      req.user._id,
      clientId
    );

    sendResponse(res, 200, {
      success: true,
      message: "Client deleted"
    });
  }
);

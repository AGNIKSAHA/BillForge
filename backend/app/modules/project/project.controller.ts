import { Request, Response } from "express";
import { catchAsync } from "../../common/middlewares/catch.middleware.js";

import {
  createProjectService,
  getProjectsService,
  updateProjectService,
  deleteProjectService
} from "./project.service.js";

import { sendResponse } from "../../common/utils/response.js";
import { getStringParam } from "../../common/utils/request.js";



export const createProject = catchAsync(
  async (req: Request, res: Response) => {

    if (!req.user) throw new Error("Unauthorized");

    const project = await createProjectService(
      req.user._id,
      req.body
    );

    sendResponse(res, 201, {
      success: true,
      data: project
    });
  }
);



export const getProjects = catchAsync(
  async (req: Request, res: Response) => {

    if (!req.user) throw new Error("Unauthorized");

    const projects = await getProjectsService(
      req.user._id
    );

    sendResponse(res, 200, {
      success: true,
      data: projects
    });
  }
);



export const updateProject = catchAsync(
  async (req: Request, res: Response) => {

    if (!req.user) throw new Error("Unauthorized");

    const projectId = getStringParam(
      req.params.id,
      "Project ID"
    );

    const project = await updateProjectService(
      req.user._id,
      projectId,
      req.body
    );

    sendResponse(res, 200, {
      success: true,
      data: project
    });
  }
);


export const deleteProject = catchAsync(
  async (req: Request, res: Response) => {

    if (!req.user) throw new Error("Unauthorized");

    const projectId = getStringParam(
      req.params.id,
      "Project ID"
    );

    await deleteProjectService(
      req.user._id,
      projectId
    );

    sendResponse(res, 200, {
      success: true,
      message: "Project deleted"
    });
  }
);

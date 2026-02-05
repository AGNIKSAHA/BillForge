import { Types } from "mongoose";
import Project from "./project.model.js";
import Client from "../client/client.model.js";
import { CreateProjectDTO } from "./dto/createProject.dto.js";
import { UpdateProjectDTO } from "./dto/updateProject.dto.js";

export const createProjectService = async (
  userId: Types.ObjectId,
  payload: CreateProjectDTO
) => {
  console.log(payload.clientId);
  const client = await Client.findOne({
    _id: payload.clientId,
    userId
  });
  
  if (!client) throw new Error("Client not found");

  return Project.create({
    ...payload,
    userId
  });
};


export const getProjectsService = async (
  userId: Types.ObjectId
) => {
  return Project.find({ userId }).populate("clientId");
};


export const updateProjectService = async (
  userId: Types.ObjectId,
  projectId: string,
  payload: UpdateProjectDTO
) => {
  const project = await Project.findOneAndUpdate(
    { _id: projectId, userId },
    payload,
    { new: true }
  );

  if (!project) throw new Error("Project not found");

  return project;
};


export const deleteProjectService = async (
  userId: Types.ObjectId,
  projectId: string
) => {
  const project = await Project.findOneAndDelete({
    _id: projectId,
    userId
  });

  if (!project) throw new Error("Project not found");
};

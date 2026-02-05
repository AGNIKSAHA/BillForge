import { Types } from "mongoose";
import TimeLog from "./timelog.model.js";
import Project from "../project/project.model.js";


export const startTimerService = async (
  userId: Types.ObjectId,
  projectId: string
) => {
  const project = await Project.findOne({
    _id: projectId,
    userId
  });

  if (!project) throw new Error("Project not found");

  return TimeLog.create({
    userId,
    projectId,
    startTime: new Date()
  });
};


export const stopTimerService = async (
  userId: Types.ObjectId,
  timelogId: string
) => {
  const log = await TimeLog.findOne({
    _id: timelogId,
    userId
  });

  if (!log) throw new Error("Time log not found");

  if (log.endTime) throw new Error("Timer already stopped");

  const endTime = new Date();

  const duration =
    (endTime.getTime() - log.startTime.getTime()) /
    (1000 * 60 * 60);

  log.endTime = endTime;
  log.duration = Number(duration.toFixed(2));

  await log.save();

  return log;
};


export const getTimeLogsService = async (
  userId: Types.ObjectId,
  projectId: string
) => {
  return TimeLog.find({ userId, projectId }).sort({
    createdAt: -1
  });
};

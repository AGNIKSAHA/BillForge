import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";


export type AsyncHandler<
  P extends ParamsDictionary = ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery extends ParsedQs = ParsedQs
> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction
) => Promise<void>;



export const catchAsync =
  <
    P extends ParamsDictionary = ParamsDictionary,
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery extends ParsedQs = ParsedQs
  >(fn: AsyncHandler<P, ResBody, ReqBody, ReqQuery>) =>
  (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ): void => {

    void fn(req, res, next).catch(next);
  };

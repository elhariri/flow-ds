import { Request, Response } from "express";
import { ControllerResponse } from "./Helpers/Response.types";

export type ExpressControllerResponse<TSuccessfulResponse, TFailedResponse> =
  Response<ControllerResponse<TSuccessfulResponse, TFailedResponse>>;

export type ExpressController<TSuccessfulResponse, TFailedResponse> = (
  req: Request,
  res: Response
) => Promise<ExpressControllerResponse<TSuccessfulResponse, TFailedResponse>>;

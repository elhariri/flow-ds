import { Request, Response as ExpressResponse, Response } from "express";
import { ControllerResponse } from "./Helpers/Response.types";

export type ExpressControllerResponse<TSuccessfulResponse, TFailedResponse> =
  Response<ControllerResponse<TSuccessfulResponse, TFailedResponse>>;

export type ExpressController<TSuccessfulResponse, TFailedResponse> = (
  req: Request,
  res: ExpressResponse
) => Promise<ExpressControllerResponse<TSuccessfulResponse, TFailedResponse>>;

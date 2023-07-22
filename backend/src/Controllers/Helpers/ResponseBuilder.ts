import { Response as ExpressResponse } from "express";

import {
  FailedResponse,
  ControllerResponse,
  SuccessfulResponse,
} from "./Response.types";
import ApplicationError from "../../Helpers/ApplicationError";

export function SuccessfulResponseBuilder<TData>(
  data: TData
): SuccessfulResponse<TData> {
  return {
    success: true,
    data,
  };
}

export function FailedResponseBuilder<TData>(
  data: TData
): FailedResponse<TData> {
  return {
    success: false,
    error: data,
  };
}

export async function ExpressResponseBuilder<TData>(
  response: ExpressResponse<ControllerResponse<TData, string>>,
  controller: () => Promise<TData>,
  errorMsg?: string
): Promise<ExpressResponse<ControllerResponse<TData, string>>> {
  try {
    return response
      .status(200)
      .json(SuccessfulResponseBuilder(await controller()));
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error);

    if (error instanceof ApplicationError) {
      return response
        .status(error.status)
        .json(FailedResponseBuilder(error.message));
    }

    return response
      .status(500)
      .json(
        FailedResponseBuilder(
          JSON.stringify(`Oops an error occured: ${errorMsg}`)
        )
      );
  }
}

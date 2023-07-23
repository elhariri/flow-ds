import { Response as ExpressResponse } from "express";

import {
  FailedResponse,
  ControllerResponse,
  SuccessfulResponse,
} from "./Response.types";
import ApplicationError from "../../Application/Helpers/ApplicationError/ApplicationError";

export function SuccessfulResponseBuilder<TResponse>(
  result: TResponse
): SuccessfulResponse<TResponse> {
  return {
    success: true,
    result,
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
    const result = await controller();

    return response.status(200).json(SuccessfulResponseBuilder(result));
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
          JSON.stringify(`Oops an error occured ${errorMsg}`)
        )
      );
  }
}

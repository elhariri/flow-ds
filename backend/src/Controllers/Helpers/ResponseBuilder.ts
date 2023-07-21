import { FailedResponse, Response, SuccessfulResponse } from "./Response.types";

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

export async function ResponseBuilder<TData>(
  controller: () => Promise<TData>,
  errorMsg?: string
): Promise<Response<TData, string>> {
  try {
    return SuccessfulResponseBuilder(await controller());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return FailedResponseBuilder(
      JSON.stringify(`Oops an error occured: ${errorMsg}`)
    );
  }
}

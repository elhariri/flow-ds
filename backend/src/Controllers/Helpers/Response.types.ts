export type SuccessfulResponse<TResponseData> = {
  success: true;
  result: TResponseData;
};

export type FailedResponse<TError> = {
  success: false;
  error: TError;
};

export type ControllerResponse<TSuccessData, TError> =
  | SuccessfulResponse<TSuccessData>
  | FailedResponse<TError>;

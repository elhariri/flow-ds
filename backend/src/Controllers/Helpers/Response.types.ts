export type SuccessfulResponse<TResponseData> = {
  success: true;
  data: TResponseData;
};

export type FailedResponse<TError> = {
  success: false;
  error: TError;
};

export type Response<TSuccessData, TError> =
  | SuccessfulResponse<TSuccessData>
  | FailedResponse<TError>;

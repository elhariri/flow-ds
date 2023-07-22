class ApplicationError extends Error implements Error {
  public name: string = "ApplicationError";

  public status: number;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
  }
}

export default ApplicationError;

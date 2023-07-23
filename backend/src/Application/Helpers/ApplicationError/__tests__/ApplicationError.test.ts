import ApplicationError from "../ApplicationError";

describe("ApplicationError", () => {
  it("should create an instance with the correct properties", () => {
    const status = 404;
    const message = "Not Found";

    const error = new ApplicationError(status, message);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ApplicationError);
    expect(error.name).toBe("ApplicationError");
    expect(error.message).toBe(message);
    expect(error.status).toBe(status);
  });

  it("should inherit the Error properties and methods", () => {
    const status = 500;
    const message = "Internal Server Error";

    const error = new ApplicationError(status, message);

    expect(error.toString()).toBe("ApplicationError: Internal Server Error");
    expect(error.stack).toBeDefined();
  });
});

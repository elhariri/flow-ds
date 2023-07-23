/**
 * Custom application-specific error class that extends the built-in Error class.
 *
 * @class
 * @extends Error
 * @implements {Error}
 */
class ApplicationError extends Error implements Error {
  /**
   * The name of the error class.
   * @type {string}
   */
  public name: string = "ApplicationError";

  /**
   * The HTTP status code associated with the error.
   * @type {number}
   */
  public status: number;

  /**
   * Create a new ApplicationError instance.
   *
   * @constructor
   * @param {number} status - The HTTP status code associated with the error.
   * @param {string} message - The error message.
   */
  constructor(status: number, message: string) {
    // Call the parent class constructor (Error) with the error message.
    super(message);

    /**
     * The HTTP status code associated with the error.
     * @type {number}
     */
    this.status = status;
  }
}

export default ApplicationError;

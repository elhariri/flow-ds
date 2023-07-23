/**
 * A simple timer utility class to measure elapsed time between start and stop events.
 *
 * @class
 */
class Timer {
  /**
   * The timestamp representing the start time of the timer in nanoseconds.
   * @private
   * @type {bigint}
   */
  private startTime: bigint = process.hrtime.bigint();

  /**
   * The timestamp representing the end time of the timer in nanoseconds.
   * @private
   * @type {bigint}
   */
  private endTime: bigint = process.hrtime.bigint();

  /**
   * Start the timer by capturing the current timestamp as the start time.
   *
   * @public
   * @returns {void}
   */
  public start(): void {
    this.startTime = process.hrtime.bigint();
  }

  /**
   * Stop the timer by capturing the current timestamp as the end time.
   *
   * @public
   * @returns {void}
   */
  public stop(): void {
    this.endTime = process.hrtime.bigint();
  }

  /**
   * Calculate the elapsed time between the start and stop events.
   *
   * @public
   * @returns {{
   *   minutes: number;
   *   seconds: number;
   *   milliseconds: number;
   * }} The elapsed time in minutes, seconds, and milliseconds.
   */
  public getElapsedTime(): {
    minutes: number;
    seconds: number;
    milliseconds: number;
  } {
    const elapsedTime = Number(this.endTime - this.startTime) / 1e6; // Convert to milliseconds

    const elapsedSeconds = Math.floor(elapsedTime / 1000);

    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    const milliseconds = Math.ceil(elapsedTime % 1000);

    return { minutes, seconds, milliseconds };
  }
}

export default Timer;

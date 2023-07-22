class Timer {
  private startTime: bigint = process.hrtime.bigint();

  private endTime: bigint = process.hrtime.bigint();

  public start(): void {
    this.startTime = process.hrtime.bigint();
  }

  public stop(): void {
    this.endTime = process.hrtime.bigint();
  }

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

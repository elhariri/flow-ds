class Timer {
  private startTime: bigint = process.hrtime.bigint();

  private endTime: bigint = process.hrtime.bigint();

  public start(): void {
    this.startTime = process.hrtime.bigint();
  }

  public stop(): void {
    this.endTime = process.hrtime.bigint();
  }

  public getElapsedTime(): { minutes: number; seconds: number } {
    const elapsedTime = Number(this.endTime - this.startTime) / 1e9; // Convert to seconds

    const minutes = Math.floor(elapsedTime / 60);
    const seconds = Math.round(elapsedTime % 60);

    return { minutes, seconds };
  }
}

export default Timer;

import Timer from "../Timer";

it("should return the elapsed time in minutes and seconds", () => {
  const timer = new Timer();
  const startTime = process.hrtime.bigint();
  const endTime = startTime + BigInt(90) * BigInt(1e9); // 1 minute and 30 seconds

  jest
    .spyOn(process.hrtime, "bigint")
    .mockReturnValueOnce(startTime)
    .mockReturnValueOnce(endTime);

  timer.start();
  timer.stop();

  const elapsedTime = timer.getElapsedTime();
  expect(elapsedTime).toEqual({ minutes: 1, seconds: 30, milliseconds: 0 });
});

import { ExecutionTime } from "../../App.types";

export default function ExecutionTimeView({
  loading,
  time,
}: {
  loading: boolean;
  time?: ExecutionTime;
}) {
  return (
    <div className="flex mt-6 font-medium">
      Temps total d&apos;exécution :{" "}
      {loading ? (
        <div
          data-testid="execution-time-loader"
          className="h-4 ml-2 bg-zinc-100 my-auto rounded-full w-40 animate-pulse "
        />
      ) : (
        <strong>
          {time?.minutes} minutes, {time?.seconds} secondes et{" "}
          {time?.milliseconds} millisecondes
        </strong>
      )}
    </div>
  );
}

ExecutionTimeView.defaultProps = {
  time: {
    minutes: 0,
    seconds: 0,
  },
};

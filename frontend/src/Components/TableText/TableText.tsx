import { ServerSuccessfullResponseBody } from "../../App.types";

import Profit from "./Profit";

export default function TableText({
  loading,
  response,
}: {
  loading: boolean;
  response: ServerSuccessfullResponseBody | null;
}) {
  return (
    <div className="flex flex-col md:flex-row mb-6 md:mb-4">
      <div className="my-auto font-bold text-sm md:text-lg">
        List des achats et ventes quotidien d&apos;Erwan:
      </div>
      <div className="flex md:ml-auto font-bold text-sm md:text-xl">
        <span className="my-auto">Profit:</span>
        <Profit loading={loading} profit={response?.profit || 0} />
      </div>
    </div>
  );
}

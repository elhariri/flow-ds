import { ServerSuccessfullResponseBody } from "../../App.types";
import formatPrice from "../../Helpers/formatPrice";

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
        {!loading && response !== null ? (
          <span className="text-emerald-500 bg-emerald-50 ml-1 h-fit border border-emerald-200 rounded px-2">
            + {formatPrice(response.profit)} €
          </span>
        ) : (
          <div
            data-testid="profit-loader"
            className="h-4 ml-2 bg-zinc-100 my-auto rounded-full w-40 animate-pulse "
          />
        )}
      </div>
    </div>
  );
}

import formatPrice from "../../Helpers/formatPrice";

export default function Profit({
  loading,
  profit,
}: {
  loading: boolean;
  profit: number;
}) {
  if (loading) {
    return (
      <div
        data-testid="profit-loader"
        className="h-4 ml-2 bg-zinc-100 my-auto rounded-full w-40 animate-pulse "
      />
    );
  }

  if (profit === 0) {
    return (
      <span className="text-gray-500 bg-gray-50 ml-1 h-fit border border-gray-200 rounded px-2">
        {formatPrice(profit)} €
      </span>
    );
  }

  return (
    <span className="text-emerald-500 bg-emerald-50 ml-1 h-fit border border-emerald-200 rounded px-2">
      + {formatPrice(profit)} €
    </span>
  );
}

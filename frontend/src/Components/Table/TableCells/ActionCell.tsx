import { TransactionType } from "../../../App.types";

export default function ActionCell({ action }: { action: TransactionType }) {
  return (
    <td>
      <div className="flex">
        <div
          style={{
            backgroundColor: action === "ACHAT" ? "#ecfdf5" : "#fef2f2",
            color: action === "ACHAT" ? "#10b981" : "#ef4444",
            borderWidth: 1,
            borderColor: action === "ACHAT" ? "#a7f3d0" : "#fecaca",
          }}
          className="rounded-full m-auto md:px-3 md:py-1 w-fit h-fit font-semibold text-[0.75rem]"
        >
          <span className="hidden md:inline-block mx-auto">{action}</span>
          <div className="inline-block md:hidden px-1 text-lg">
            {action === "ACHAT" ? "+" : "-"}
          </div>
        </div>
      </div>
    </td>
  );
}

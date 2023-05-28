import { TransactionType } from "../../../App.types";

export default function ActionCell({ action }: { action: TransactionType }) {
  return (
    <td>
      <span
        style={{
          backgroundColor: action === "ACHAT" ? "#ecfdf5" : "#fef2f2",
          color: action === "ACHAT" ? "#10b981" : "#ef4444",
          borderWidth: 1,
          borderColor: action === "ACHAT" ? "#a7f3d0" : "#fecaca",
        }}
        className="rounded-full md:px-3 md:py-1 font-semibold text-[0.75rem]"
      >
        <span className="hidden md:inline-block">{action}</span>
        <span className="md:hidden p-2 bg-transparent text-lg">
          {action === "ACHAT" ? "+" : "-"}
        </span>
      </span>
    </td>
  );
}

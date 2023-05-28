import { Transaction } from "../../App.types";
import TableBodyLoadingAnimation from "./TableBodyLoadingAnimation";
import TransactionTableBody from "./TransactionTableBody";

export default function TransactionsTable({
  loading,
  transactions,
}: {
  loading: boolean;
  transactions: Transaction[];
}) {
  return (
    <div className="overflow-y-scroll border border-gray-200 rounded-xl h-fit max-h-full">
      <table className="w-full md:table-fixed h-fit">
        <thead className="capitalize">
          <tr className="bg-gray-100 border-b text-gray-500">
            <th>Date</th>
            <th>Action</th>
            <th>Name</th>
            <th>Prix unitaire</th>
            <th>Nombre d&apos;actions</th>
            <th className="hidden md:table-cell">Total</th>
            <th>Portefeuille</th>
          </tr>
        </thead>

        {loading && <TableBodyLoadingAnimation />}
        {!loading && <TransactionTableBody transactions={transactions} />}
      </table>
    </div>
  );
}

import { Transaction } from "../App.types";
import TableBodyLoadingAnimation from "./TableBodyLoadingAnimation";

export default function TransactionsTable({
  loading,
  transactions,
}: {
  loading: boolean;
  transactions: Transaction[];
}) {
  return (
    <div className="overflow-y-scroll border border-gray-200 rounded-xl h-fit max-h-full">
      <table className="w-full table-fixed h-fit">
        <thead className="capitalize">
          <tr className="bg-gray-100 border-b text-gray-500">
            <th>Date</th>
            <th>Action</th>
            <th>Name</th>
            <th>Prix unitaire</th>
            <th>Nombre d&apos;actions</th>
            <th>Total</th>
            <th>Portefeuille</th>
          </tr>
        </thead>

        {loading && <TableBodyLoadingAnimation />}
        {!loading && (
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.name + transaction.date}
                className="text-center border-b leading-[1] cursor-pointer hover:bg-gray-50"
              >
                <td className="font-semibold">{transaction.date}</td>
                <td>
                  <span
                    style={{
                      backgroundColor:
                        transaction.action === "ACHAT" ? "#ecfdf5" : "#fef2f2",
                      color:
                        transaction.action === "ACHAT" ? "#10b981" : "#ef4444",
                      borderWidth: 1,
                      borderColor:
                        transaction.action === "ACHAT" ? "#a7f3d0" : "#fecaca",
                    }}
                    className="rounded px-2 py-1 font-semibold text-[0.7rem]"
                  >
                    {transaction.action}
                  </span>
                </td>
                <td>
                  <img
                    className="h-4 m-auto"
                    src={`${transaction.name}.webp`}
                    alt={transaction.name}
                  />
                </td>
                <td>{transaction.unit_price} €</td>
                <td>{transaction.num_shares}</td>
                <td>{transaction.total} €</td>
                <td>
                  <strong>{transaction.portfolio_amount}</strong> €
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

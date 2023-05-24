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
    <table>
      <thead>
        <tr>
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
      {!loading &&
        transactions.map((transaction) => (
          <tbody key={transaction.name + transaction.date}>
            {transaction.name}
          </tbody>
        ))}
    </table>
  );
}

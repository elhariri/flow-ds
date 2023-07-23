import { Transaction } from "../../App.types";
import formatPrice from "../../Helpers/formatPrice";
import ActionCell from "./TableCells/ActionCell";
import DateCell from "./TableCells/DateCell";
import StockImgCell from "./TableCells/StockImgCell";

export default function TransactionTableBody({
  transactions,
}: {
  transactions: Transaction[];
}) {
  if (transactions.length === 0) {
    return (
      <tbody>
        <tr className="text-center border-b h-fit leading-[1] mx-auto py-8 cursor-pointer hover:bg-gray-50">
          <td colSpan={6} className="py-8">
            No transaction possible
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {transactions.map((transaction) => (
        <tr
          key={transaction.company + transaction.date}
          className="text-center border-b leading-[1] cursor-pointer hover:bg-gray-50"
        >
          <DateCell date={transaction.date} />
          <ActionCell action={transaction.action} />
          <StockImgCell stock={transaction.company} />
          <td>{transaction.unitPrice} €</td>
          <td>{formatPrice(transaction.numShares)}</td>
          <td className="hidden md:table-cell">
            {formatPrice(transaction.total)} €
          </td>
          <td>
            <strong>{formatPrice(transaction.portfolioAmount)}</strong> €
          </td>
        </tr>
      ))}
    </tbody>
  );
}

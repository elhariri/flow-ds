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
  return (
    <tbody>
      {transactions.map((transaction) => (
        <tr
          key={transaction.name + transaction.date}
          className="text-center border-b leading-[1] cursor-pointer hover:bg-gray-50"
        >
          <DateCell date={transaction.date} />
          <ActionCell action={transaction.action} />
          <StockImgCell stock={transaction.name} />
          <td>{transaction.unit_price} €</td>
          <td>{transaction.num_shares}</td>
          <td className="hidden md:table-cell">
            {formatPrice(transaction.total)} €
          </td>
          <td>
            <strong>{formatPrice(transaction.portfolio_amount)}</strong> €
          </td>
        </tr>
      ))}
    </tbody>
  );
}

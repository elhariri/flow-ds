import { TransactionCompany } from "../../../App.types";

export default function StockImgCell({ stock }: { stock: TransactionCompany }) {
  return (
    <td>
      {/* <img
        className="hidden md:block h-5 m-auto"
        src={`${stock}.webp`}
        alt={stock}
      />

      <img
        className="md:hidden h-5 m-auto"
        src={`${stock}_PHONE.webp`}
        alt={stock}
      /> */}
      {stock}
    </td>
  );
}

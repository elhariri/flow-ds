import { CompanyOption } from "../../App.types";

import DropDown from "../DropDown/DropDown";

export default function CompaniesList({
  loading,
  companies,
  fetchTransactions,
}: {
  loading: boolean;
  companies: CompanyOption[];
  fetchTransactions: (company: string) => Promise<void>;
}) {
  if (loading) {
    return (
      <div className="h-4 my-auto bg-zinc-100/30 rounded-full w-32 animate-pulse mx-2" />
    );
  }

  return (
    <DropDown
      options={
        companies.length > 1
          ? [...companies, { name: "toutes actions", value: "all" }]
          : companies || []
      }
      onSelect={fetchTransactions}
    />
  );
}

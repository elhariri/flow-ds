import { ServerSuccessfullResponseBody } from "../../App.types";

import ExecutionTime from "../ExecutionTime/ExecutionTime";
import TransactionsTable from "../Table/TransactionsTable";
import TableText from "../TableText/TableText";

export default function Body({
  isLoading,
  result,
}: {
  isLoading: boolean;
  result: ServerSuccessfullResponseBody | null;
}) {
  return (
    <div className="flex-1 px-4 md:px-32 flex overflow-hidden text-black">
      <div className="flex-1 flex flex-col my-6 md:my-12">
        <TableText loading={isLoading} response={result} />
        <div className="flex-1 overflow-hidden relative">
          <TransactionsTable
            loading={isLoading}
            transactions={result === null ? [] : result.transactions}
          />
        </div>

        <ExecutionTime time={result?.executionTime} loading={isLoading} />
      </div>
    </div>
  );
}

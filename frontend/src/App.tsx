import ExecutionTime from "./Components/ExecutionTime/ExecutionTime";
import TransactionsTable from "./Components/Table/TransactionsTable";
import TableText from "./Components/TableText/TableText";

import useGetTransactions from "./Hooks/useGetTransactions";

function App() {
  const { loading, error, response } = useGetTransactions();

  if (error !== null) {
    return (
      <div className="flex flex-1 m-8 rounded-2xl bg-red-50 text-red-500">
        <div className="m-auto">Oops something bad happened!!</div>
      </div>
    );
  }

  return (
    <>
      <header className="flex bg-blue-950 text-white h-16 px-4 md:px-32 border-b border-b-zinc-100 text-xl md:text-3xl">
        <span className="my-auto">
          Meilleur moment pour acheter ou pour vendre
        </span>
      </header>
      <div className="flex-1 px-4 md:px-32 flex overflow-hidden text-black">
        <div className="flex-1 flex flex-col my-6 md:my-12">
          <TableText loading={loading} response={response} />
          <div className="flex-1 overflow-hidden relative">
            <TransactionsTable
              loading={loading}
              transactions={response === null ? [] : response.transactions}
            />
          </div>

          <ExecutionTime time={response?.executionTime} loading={loading} />
        </div>
      </div>
    </>
  );
}

export default App;

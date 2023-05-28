import ExecutionTime from "./Components/ExecutionTime/ExecutionTime";
import TransactionsTable from "./Components/Table/TransactionsTable";
import formatPrice from "./Helpers/formatPrice";
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
        <div className="flex-1 flex flex-col my-12">
          <div className="flex flex-col md:flex-row mb-4">
            <div className="my-auto font-bold text-sm md:text-lg">
              List des achats et ventes quotidien d&apos;Erwan:
            </div>
            <div className="flex md:ml-auto font-bold text-sm md:text-xl">
              <span className="my-auto">Profit:</span>
              {!loading && response !== null ? (
                <span className="text-emerald-500 bg-emerald-50 ml-1 h-fit border border-emerald-200 rounded px-2">
                  + {formatPrice(response.profit)} €
                </span>
              ) : (
                <div
                  data-testid="execution-time-loader"
                  className="h-4 ml-2 bg-zinc-100 my-auto rounded-full w-40 animate-pulse "
                />
              )}
            </div>
          </div>
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

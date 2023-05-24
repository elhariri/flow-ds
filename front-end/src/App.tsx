import TransactionsTable from "./Components/TransactionsTable";
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
      <header className="flex h-16 px-10 border-b border-b-zinc-100 text-2xl">
        <span className="my-auto">
          Meilleur moment pour acheter ou pour vendre
        </span>
      </header>
      <div className="flex-1 px-10 flex overflow-hidden">
        <div className="flex-1 flex flex-col my-10">
          <div className="mb-4 font-medium text-sm">
            List des achats et ventes quotidien d&apos;Erwan
          </div>

          <div className="flex-1 overflow-y-scroll">
            <TransactionsTable
              loading={loading}
              transactions={response === null ? [] : response.body.transactions}
            />
          </div>

          <div className="mt-4 font-medium text-sm">
            Temps total d&apos;exécution :{" "}
            {loading ? (
              <div
                data-testid="execution-time-loader"
                className="h-2 bg-zinc-200 rounded-full w-20 animate-pulse "
              />
            ) : (
              "01 minutes et 36 secondes"
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

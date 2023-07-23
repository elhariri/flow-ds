import { useEffect } from "react";
import Body from "./Components/Body/Body";
import CompaniesList from "./Components/CompaniesList/CompaniesList";
import useGetCompaniesList from "./Hooks/useGetCompaniesList";
import useGetTransactions from "./Hooks/useGetTransactions";

function App() {
  const { loading, error, response: companies } = useGetCompaniesList();
  const {
    fetchTransactions,
    loading: transactionsLoading,
    response: optimalProfit,
  } = useGetTransactions();

  useEffect(() => {
    if (loading || !companies) return;
    fetchTransactions(companies[0].value);
  }, [companies, fetchTransactions, loading]);

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
        <span className="my-auto mr-auto">
          Meilleur moment pour acheter ou pour vendre
        </span>
        <CompaniesList
          loading={loading}
          fetchTransactions={fetchTransactions}
          companies={companies || []}
        />
      </header>

      {!loading && companies && companies.length === 0 && (
        <span className="m-auto">No company found!</span>
      )}

      {!loading && companies && companies.length > 0 && (
        <Body
          isLoading={loading || transactionsLoading}
          result={optimalProfit}
        />
      )}
    </>
  );
}

export default App;

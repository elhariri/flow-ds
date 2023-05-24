function App() {
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
            <table>test</table>
          </div>

          <div className="mt-4 font-medium text-sm">
            Temps total d&apos;exécution : 01 minutes et 36 secondes
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

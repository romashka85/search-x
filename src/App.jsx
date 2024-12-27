import SearchBar from "./components/SearchBar";
import SearchProvider from "./context/SearchContext";
import "./styles.css";
import ResultList from "./components/ResultList";

const App = () => {
  return (
    <SearchProvider>
      <div className="wrapper">
        <section>
          <h1>Search X</h1>
          <SearchBar />
        </section>
      </div>
      <ResultList />
    </SearchProvider>
  );
};

export default App;

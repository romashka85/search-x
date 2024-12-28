import SearchBar from "./components/SearchBar";
import SearchProvider, { SearchContext } from "./context/SearchContext";
import "./styles.css";
import ResultList from "./components/ResultList";
import SearchXLogo from "./components/logo";
import { useContext } from "react";

const App = () => {
  return (
    <SearchProvider>
      <Search  />
    </SearchProvider>
  );
};

const Search  = () => {
  const { isSearchOpen } = useContext(SearchContext);
  console.log("isSearchOpen", isSearchOpen);
  return (
   
      <div className={!isSearchOpen ? "wrapper" : "result-wrapper"}>
        <SearchXLogo />
        <SearchBar />
        <ResultList />
      </div>
   
  );
};

export default App;

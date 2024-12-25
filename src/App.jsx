import { useEffect, useState } from "react";
import { fakeDB } from "./data/fakeDB";
import SearchBar from "./components/SearchBar";
import SearchProvider from "./context/SearchContext";
import "./styles.css";
import ResultList from "./components/ResultList";

const App = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const numOfResults = 10;

  useEffect(() => {
    if (searchQuery) {
      setSearchItems(
        fakeDB
          .filter((option) =>
            option.title.toLowerCase().startsWith(searchQuery.toLowerCase())
          )
          .slice(0, numOfResults)
      );
    } else {
      setSearchItems([]);
    }
  }, [searchQuery, searchHistory]);

  const addToSearchHistory = (item) => {
    setSearchHistory((prevState) => {
      const newSearch = [
        item,
        ...prevState.filter((search) => search !== item),
      ];
      if (newSearch.length > 10) {
        newSearch.pop();
      }
      return newSearch;
    });
  };

  const removeSearchHistory = (item) => {
    setSearchHistory((prevState) =>
      prevState.filter((search) => search !== item)
    );
  };
  console.log(searchHistory);

  return (
    <SearchProvider>
      <div className="wrapper">
        <section>
          <h1>Select a State</h1>
          <SearchBar
            search={searchQuery}
            setSearch={setSearchQuery}
            options={searchItems}
            getLastSearch={addToSearchHistory}
            searchHistory={searchHistory}
            removeSearchHistory={removeSearchHistory}
          />
        </section>
      </div>
      <ResultList search={searchQuery} />
    </SearchProvider>
  );
};

export default App;

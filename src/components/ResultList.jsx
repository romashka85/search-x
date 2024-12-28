import { useState, useEffect, useContext } from "react";
import { fakeDB } from "../data/fakeDB";
import { SearchContext } from "../context/SearchContext";

const ResultList = () => {
  const { searchQuery, isSearchOpen } = useContext(SearchContext);
  const [results, setResults] = useState([]);
  const [searchTime, setSearchTime] = useState(0);

  useEffect(() => {
    if (searchQuery) {
      const startTime = performance.now();
      const filteredResults = fakeDB.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const endTime = performance.now();
      setResults(filteredResults);
      setSearchTime((endTime - startTime).toFixed(2));
    }
  }, [searchQuery]);

  return (
    <>
      {isSearchOpen && (
        <div className="results-list">
          {results.length > 0 && (
            <p>
              {results.length} results found in {searchTime} ms
            </p>
          )}
          {results.map((result, index) => (
            <div key={index}>
              <a href={result.url} target="_blank">
                {result.title}
              </a>
              <p>{result.description}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ResultList;

import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { fakeDB } from "../data/fakeDB";
import { SearchContext } from "../context/SearchContext";

const ResultList = () => {
  const { searchQuery } = useContext(SearchContext);
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
    <div className="results-list">
      <p>
        {results.length} results found in {searchTime} ms
      </p>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <a href={result.url} target="_blank">
              {result.title}
            </a>
            <p>{result.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
ResultList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ResultList;

import { useContext, useCallback, useState, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import "./module.css";
import PropTypes from "prop-types";

const SearchBar = ({
  options,
  getLastSearch,
  search,
  setSearch,
  searchHistory,
  removeSearchHistory,
}) => {
  // const {
  //   searchHistory,
  //   autoCompleteItems,
  //   setAutoCompleteItems,
  //   addSearchHistory,
  //   removeSearchHistory,
  // } = useContext(SearchContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    setSearch(newQuery);
    setIsDropdownOpen(true);
    setHighlightedIndex(-1);
  }; 

  const handleOptionClick = useCallback(
    (item) => {
      const itemTitle = typeof item === "string" ? item : item.title;
      setSearch(itemTitle);
      getLastSearch(itemTitle);
      setIsDropdownOpen(false);
      console.log("REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
    },
    [getLastSearch, setSearch]
  );
  

  const handleKeyDown = useCallback(
    (e) => {
      const combinedItems = options.length > 0 ? options : searchHistory; // Handle both options and searchHistory
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex === combinedItems.length - 1 ? 0 : prevIndex + 1
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex <= 0 ? combinedItems.length - 1 : prevIndex - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightedIndex >= 0 && combinedItems[highlightedIndex]) {
          handleOptionClick(combinedItems[highlightedIndex]);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsDropdownOpen(false);
      }
    },
    [handleOptionClick, highlightedIndex, options, searchHistory]
  );
  

  useEffect(() => {
    if (isDropdownOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen, highlightedIndex, options, handleKeyDown]);

  const handleClear = () => {
    setSearch("");
    setIsDropdownOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="search..."
          onClick={() => setIsDropdownOpen(true)}
          onFocus={() => setIsDropdownOpen(true)}
        />
        {search && (
          <button className="clear-button" onClick={handleClear}>
            X
          </button>
        )}
      </div>
      {isDropdownOpen && (
        <ul className="dropdown-list">
          {options.length > 0
            ? options.map((option, index) => (
              <div key={index} className="dropdown-item-container">
                  <li
                    className={`${
                      searchHistory.includes(option.title)
                        ? "dropdown-item resent-search"
                        : "dropdown-item"
                    } ${index === highlightedIndex ? "highlighted" : ""}`}
                    onClick={() => handleOptionClick(option)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {option.title}
                  </li>
                  {searchHistory.includes(option.title) && (
                    <button onClick={() => removeSearchHistory(option.title)}>
                      Remove
                    </button>
                  )}
                </div>
              ))
            : searchHistory.length > 0
            ? searchHistory.map((item, index) => (
                <div key={index} className="dropdown-item-container">
                  <li
                    className={`dropdown-item resent-search ${
                      index === highlightedIndex ? "highlighted" : ""
                    }`}
                    onClick={() => handleOptionClick(item)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {item}
                  </li>
                  <button onClick={() => removeSearchHistory(item)}>
                    Remove
                  </button>
                </div>
              ))
            : null}
        </ul>
      )}
    </div>
  );
};
SearchBar.propTypes = {
  options: PropTypes.array.isRequired,
  getLastSearch: PropTypes.func,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  searchHistory: PropTypes.array.isRequired,
  removeSearchHistory: PropTypes.func.isRequired,
};

export default SearchBar;

import { useContext, useCallback, useState, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import "./module.css";
import PropTypes from "prop-types";

const SearchBar = () => {
  const {
    searchItems,
    addToSearchHistory,
    searchQuery,
    setSearchQuery,
    searchHistory,
    removeSearchHistory,
  } = useContext(SearchContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleEnterKey = (e) => {
    const combinedItems = searchItems.length > 0 ? searchItems : searchHistory;

    if (highlightedIndex >= 0 && combinedItems[highlightedIndex]) {
      handleOptionClick(combinedItems[highlightedIndex]);
    } else {
      addToSearchHistory(e.target.value); // Fallback to the current search input
    }

    // Close the dropdown only after updating the state
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 0);
  };

  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    setIsDropdownOpen(true);
    setHighlightedIndex(-1);
  };

  const handleOptionClick = useCallback(
    (item) => {
      const itemTitle = typeof item === "string" ? item : item.title;
      setSearchQuery(itemTitle);
      addToSearchHistory(itemTitle);
      setIsDropdownOpen(false);
    },
    [addToSearchHistory, setSearchQuery]
  );

  const handleKeyDown = useCallback(
    (e) => {
      const combinedItems =
        searchItems.length > 0 ? searchItems : searchHistory; // Handle both options and searchHistory
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
    [handleOptionClick, highlightedIndex, searchItems, searchHistory]
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
  }, [isDropdownOpen, highlightedIndex, searchItems, handleKeyDown]);

  const handleClear = () => {
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="search..."
          onClick={() => setIsDropdownOpen(true)}
          onFocus={() => setIsDropdownOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEnterKey(e);
            }
          }}
        />
        {searchQuery && (
          <button className="clear-button" onClick={handleClear}>
            X
          </button>
        )}
      </div>
      {isDropdownOpen && (
        <ul className="dropdown-list">
          {searchItems.length > 0
            ? searchItems.map((option, index) => (
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
  searchItems: PropTypes.array.isRequired,
  addToSearchHistory: PropTypes.func,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  searchHistory: PropTypes.array.isRequired,
  removeSearchHistory: PropTypes.func.isRequired,
};

export default SearchBar;

import { useContext, useCallback, useState, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { GoClock } from "react-icons/go";
import { useClickOutside } from "react-click-outside-hook";
import "../styles.css";
import RemoveButton from "./RemoveButton";

const SearchBar = () => {
  const {
    searchItems,
    addToSearchHistory,
    searchQuery,
    setSearchQuery,
    searchHistory,
    removeSearchHistory,
    setIsSearchOpen,
  } = useContext(SearchContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Use the click outside hook
  const [ref, hasClickedOutside] = useClickOutside();
  if (hasClickedOutside && isDropdownOpen) {
    setIsDropdownOpen(false);
  }

  const handleEnterKey = (e) => {
    const combinedItems = searchItems.length > 0 ? searchItems : searchHistory;
    if (highlightedIndex >= 0 && combinedItems[highlightedIndex]) {
      handleOptionClick(combinedItems[highlightedIndex]);
    } else {
      addToSearchHistory(e.target.value);
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
      setIsSearchOpen(true);
    },
    [addToSearchHistory, setSearchQuery, setIsSearchOpen]
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
    <div className="dropdown" ref={ref}>
      <div className="search-container">
        <IoIosSearch className="search-icon" />
        <input
          className={`search-input ${isDropdownOpen ? "search-bar" : ""}`}
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
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
            <IoMdClose />
          </button>
        )}
      </div>
      {isDropdownOpen && (
        <ul className="dropdown-list">
          {searchItems.length > 0 ? (
            searchItems.map((option, index) => (
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
                  {searchHistory.includes(option.title) ? (
                    <GoClock className="searched-item" />
                  ) : (
                    <IoIosSearch className="searched-item" />
                  )}
                  {option.title}
                </li>
                {searchHistory.includes(option.title) && (
                  <RemoveButton
                    item={option.title}
                    index={index}
                    highlightedIndex={highlightedIndex}
                    removeSearchHistory={removeSearchHistory}
                  />
                )}
              </div>
            ))
          ) : searchHistory.length > 0 ? (
            searchHistory.map((item, index) => (
              <div key={index} className="dropdown-item-container">
                <li
                  className={`dropdown-item resent-search ${
                    index === highlightedIndex ? "highlighted" : ""
                  }`}
                  onClick={() => handleOptionClick(item)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <GoClock className="searched-item" />
                  {item}
                </li>
                <RemoveButton
                  item={item}
                  index={index}
                  highlightedIndex={highlightedIndex}
                  removeSearchHistory={removeSearchHistory}
                />
              </div>
            ))
          ) : (
            <li className="dropdown-item">
              <IoIosSearch className="searched-item" />
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

// context/SearchContext.js
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fakeDB } from "../data/fakeDB";

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    if (!item) return;
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

  return (
    <SearchContext.Provider
      value={{
        searchHistory,
        searchQuery,
        setSearchQuery,
        searchItems,
        addToSearchHistory,
        removeSearchHistory,
        isSearchOpen,
        setIsSearchOpen
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchProvider;
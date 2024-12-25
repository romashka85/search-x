import { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [searchHistory, setSearchHistory] = useState([]);
    const [autoCompleteItems, setAutoCompleteItems] = useState([]);

    const addSearchHistory = (item) => {
        if (!searchHistory.includes(item)) {
            setSearchHistory([...searchHistory, item]);
        }
    };

    const removeSearchHistory = (item) => {
        setSearchHistory(searchHistory.filter((history) => history !== item));
    };

    return (
        <SearchContext.Provider value={{
            searchHistory,
            autoCompleteItems,
            setAutoCompleteItems,
            addSearchHistory,
            removeSearchHistory
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;

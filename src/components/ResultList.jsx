import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fakeDB } from '../data/fakeDB';

const ResultList = ({ search }) => {
    const [results, setResults] = useState([]);
    const [searchTime, setSearchTime] = useState(0);

    useEffect(() => {
        if (search) {
            const startTime = performance.now();
            const filteredResults = fakeDB.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
            );
            const endTime = performance.now();

            setResults(filteredResults);
            setSearchTime((endTime - startTime).toFixed(2));
        }
    }, [search]);

    return (
        <div className="results-list">
            <p>{results.length} results found in {searchTime} ms</p>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        <a href={result.url} target="_blank" rel="noopener noreferrer">{result.title}</a>
                        <p>{result.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
ResultList.propTypes = {
    search: PropTypes.string.isRequired,
};

export default ResultList;


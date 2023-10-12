import React from 'react';

function SearchResultsPage({ searchResults }) {
    return (
        <div>
            <h2>Search Results</h2>
            <ul>
                {searchResults.map((result) => (
                    <li key={result.id}>{result.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default SearchResultsPage;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query) {
            onSearch(query);
        }
    };

    return (
        <div className="search">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="search-box"
            />
            <NavLink to="/search-results">
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </NavLink>
        </div>
    );
}

export default SearchBar;

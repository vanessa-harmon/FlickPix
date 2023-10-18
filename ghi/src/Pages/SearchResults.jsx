import { useLocation } from 'react-router-dom';
import SearchCard from '../Components/Cards/SearchCards';

function SearchResultsPage() {
    const location = useLocation();
    const query = location.state.query;
    const results = location.state.movies;
    const filteredResults = results.filter(
        result => (result.media_type === 'movie' || result.media_type === 'tv'));
    console.log('Search Results:', results);

    return (
        <div>
            <h2>Search Results for: {query}</h2>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {filteredResults.map((result, index) => (
                        <div key={index} className="col">
                            <SearchCard
                                title={result.title || result.name}
                                imageUrl={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                                rating={result.vote_average}
                                id={result.id}
                                mediaType={result.media_type}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchResultsPage;

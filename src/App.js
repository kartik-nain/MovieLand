import React, { useEffect, useState } from 'react';

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=5ce0b648';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // 2. Fetching data from api using callback or async function and storing it in movies array using setMovies function which is used to change the state 
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    // 1. 
    useEffect(() => {
        searchMovies({searchTerm});
    }, []);

    return (
        <div className='app'>
            <h1>MovieLand</h1>

            <div className='search'>
                <input placeholder='Search for Movies' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}></input>
                <img src={SearchIcon} alt='Search' onClick={() => searchMovies(searchTerm)}></img> 
            </div>

            {
                movies?.length > 0 
                    ? ( // 3.
                        <div className='container'>
                            {movies.map( (movie) => (
                                <MovieCard movie = {movie} />
                            ))}
                        </div>
                    ) : (
                        <div className='empty'>
                            <h2>No Movies Found.</h2>
                        </div>
                    )
            }


        </div>
    );
}

export default App;

import React, { useEffect, useState } from "react";
import './App.css';
import searchIcon from './search.svg';
import Movies from './Movies';
// e7fdc38e

const API_URL= 'http://www.omdbapi.com?apikey=e7fdc38e';

// const movie={
//     "Title": "Captain America: The Winter Soldier",
//     "Year": "2014",
//     "imdbID": "tt1843866",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMzA2NDkwODAwM15BMl5BanBnXkFtZTgwODk5MTgzMTE@._V1_SX300.jpg"
    
// }

const App = () => {

    const [movies,setmovies]=useState([]);
    const [searchforMovie,setSeachForMovie]=useState('');

    const handleKeyPress=(event)=>{
        if(event.key=="Enter"){
            searchMovies(searchforMovie);
        }
    }
    
    const searchMovies=async(title)=>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data=await response.json();
        setmovies(data.Search);
    }

    useEffect(()=>{
        searchMovies('Iron Man')
    },[]);

    return(
        <div className="app">
            <h1>CinemaSafari</h1>

            <div className="search">
                <input
                    placeholder="Let's Binge Watch"
                    sx={{color: "#0e0d0d"}}
                    value={searchforMovie}//we will use state on it later to make it work dynamically
                    onChange={(e)=>setSeachForMovie(e.target.value)}

                    onKeyDown={handleKeyPress}
                />

                <img
                    src={searchIcon}
                    alt="search"
                    onClick={()=> searchMovies(searchforMovie)}
                />
            </div>
            
            {
                movies?.length>0 
                ? (
                    <div className="container">
                        {movies.map((movie)=>(
                            <Movies movie={movie}/>
                        ))}
                    </div>
                ):(
                    <div className="empty">
                        <h2>No Movies Found</h2>
                    </div>
                )
            }

            
        </div>
    );
}

export default App;
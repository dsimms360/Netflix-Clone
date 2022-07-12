import React, {useState, useEffect} from 'react'
import axios from './axios';
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

const baseUrl = "https://image.tmdb.org/t/p/original/"

function Row(props) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    // a snippet of code which runs based on a specific condition/variable
    useEffect(() => {
        // if [], run once when the row loads, and don't run again
        async function fetchData() {
            const request = await axios.get(props.fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [props.fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {

            autoplay: 1,
        }
    };

    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.original_title || movie?.name || "")
                .then((url) => {
                    // https://www.youtube.com/watch?v={video id}
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    }

  return (
    <div className="row">
        {/* title */}
        <h2>{props.title}</h2>

        {/* container -> posters */}
        <div className="row_posters">
            {/*several row posters */}

            {movies.map(movie => (
                <img 
                    key={movie.id}
                    onClick={() => handleClick(movie)}
                    className={`row_poster ${props.isLargeRow && "row_posterLarge"}`} 
                    src={`${baseUrl}${props.isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                    alt={movie.original_title} 
                />
            ))}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row
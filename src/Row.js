import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row(props) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const baseUrl = "https://image.tmdb.org/t/p/original/";

  //A snippet code which runs on specific condition
  useEffect(() => {
    //if [] , run once when the row loads, and dont run again
    //if [movies], runs every time the movies update
    async function fetchData() {
      const request = await axios.get(props.fetchUrl);
      setMovies(request.data.results);

      return request;
    }
    fetchData();
  }, [props.fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          console.log(urlParams);
        })
        .catch((error) => console.log(error));
    }
  };

  // console.log(movies);
  return (
    <div className="row">
      {/* title */}
      <h2>{props.title}</h2>
      {/* container -> posters */}
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => {
              handleClick(movie);
            }}
            className={`row__poster ${props.isLargeRow && "row__posterLarge"}`}
            src={`${baseUrl}${
              props.isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;

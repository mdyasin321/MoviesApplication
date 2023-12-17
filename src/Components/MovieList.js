import React from "react";
import classes from "./MovieList.module.css";
import AddFavourite from "./AddFavourite";

const MovieList = (props) => {
  const FavouriteComponent = props.addList;

  let moviesExcludedFromFavourites = [];

  if (props.favouritemoviesList.length > 0) {

    for (let movie of props.movies) {
      let isAvailable = "false";

      for (let favouriteMovie of props.favouritemoviesList) {

        if (favouriteMovie.imdbID === movie.imdbID) {
          isAvailable = "true";
        }
      }

      if (isAvailable === "false") {
        moviesExcludedFromFavourites.push(
          <div className={classes.movie} key={movie.index}>
            <img src={movie.Poster} alt="photo" />
            <div
              onClick={() => {
                props.movieToggler(movie);
              }}
              className={classes.overlay}
            >
              <FavouriteComponent color="black" />
            </div>
          </div>
        );
      }
       else {
        moviesExcludedFromFavourites.push(
          <div className={classes.movie} key={movie.index}>
            <img src={movie.Poster} alt="photo" />
            <div
              onClick={() => {
                props.movieToggler(movie);
              }}
              className={classes.overlay}
            >
              <FavouriteComponent color="red" />
            </div>
          </div>
        );
      }
    }
  } 
  
  
  else {
    console.log("else");

    moviesExcludedFromFavourites = props.movies.map((movie, index) => {
      return (
        <div className={classes.movie} key={movie.index}>
          <img src={movie.Poster} alt="photo" />
          <div
            onClick={() => {
              props.movieToggler(movie);
            }}
            className={classes.overlay}
          >
            <FavouriteComponent color="black" />
          </div>
        </div>
      );
    });
  }

  return <React.Fragment>{moviesExcludedFromFavourites}</React.Fragment>;
};

export default MovieList;

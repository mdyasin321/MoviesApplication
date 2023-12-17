import React, { useCallback, useEffect, useState } from "react";
import MovieList from "./Components/MovieList";
import "./App.css";
import Heading from "./Components/Heading";
import SearchBox from "./Components/SearchBox";
import AddFavourite from "./Components/AddFavourite";
import RemoveFromFavourites from "./Components/RemoveFromFavourites";
import Login from "./Components/Login";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favouriteMovies, setfavouritMovies] = useState([]);
  const [enterdValues, setEnterdValues] = useState({
    email:'',
    password:''
  });
  const [IsLoggedIn, setIsLoggedIn]=useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // const [isEmailInvalid,setIsEmailInValid]= useState(false);




  const updatingEnterdFields=(receivedEmail,receivedPassword)=>{


    // const isValidEmail=receivedEmail.includes('@');

    // if(isValidEmail===false){
    //   setIsEmailInValid(true);
    //   return ;
    // }
   // setIsEmailInValid(false);
    let updatedValue={
      email:receivedEmail,
      password:receivedPassword
    }

  
    setEnterdValues(updatedValue);

    localStorage.setItem("password","1");
    setIsLoggedIn(true);

    

  }

  const getMovieList = useCallback(async (searchValue) => {
    setIsLoading(true)
    const response = await fetch(
      `http://www.omdbapi.com/?s=${searchValue}&apikey=f89982f`
    );

    const data = await response.json();

    console.log(data.Search);
    if (data.Search) {
      setMovies(data.Search);
      
    }
    setIsLoading(false)
  }, []);

  const setSearchValueHandler = (value) => {
    setSearchValue(value);
  };

  const addFavouriteMovieHandler = (movie) => {
    console.log("addFavouriteMovieHandler ");

    const alreadyPresent = favouriteMovies.findIndex((favouriteMovie) => {
      return favouriteMovie.imdbID === movie.imdbID;
    });

    //findIndex() -> If no item is present , it will return -1

    if (alreadyPresent === -1) {
      console.log("Inside already present if ");
      const favouriteMovieList = [...favouriteMovies, movie];
      setfavouritMovies(favouriteMovieList);
      saveToLocalStorage(favouriteMovieList);
    }
  };

  const removeMovieHandler = (movieRecived) => {
    const movieList = favouriteMovies.filter((favouriteMovie) => {
      return favouriteMovie.imdbID != movieRecived.imdbID;
    });
    setfavouritMovies(movieList);
    saveToLocalStorage(movieList);
  };


  const saveToLocalStorage = (favouriteMovieList) => {
    localStorage.setItem("FaouriteMovies", JSON.stringify(favouriteMovieList));
  };

  useEffect(() => {
    getMovieList(searchValue);
  }, [getMovieList, searchValue]);

  useEffect(() => {
    const storedMoviesFromLocalStorage = JSON.parse(
      localStorage.getItem("FaouriteMovies")
    );
    if (storedMoviesFromLocalStorage != null) {
      setfavouritMovies(storedMoviesFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    const value_received=localStorage.getItem("password");
    if(value_received==='1'){
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler=()=>{

    setIsLoggedIn(false);
    localStorage.clear();
  }

  
  console.log("email "+enterdValues.email);
  console.log("password "+enterdValues.password);

  return (
    
      
    

    IsLoggedIn===false ? <Login updatingEnterdFields={updatingEnterdFields} /> :

    <div>
     <div className="background"></div>
      <div className="header">
        <Heading heading="Movies" />
        <SearchBox
          value={searchValue}
          searchValueHandler={setSearchValueHandler}
        />
        <button className="logout" onClick={logoutHandler}>Logout</button>
      </div>
      <div style={{marginTop:"70px"}}></div>

      {( movies.length > 0) ? (
        <div className="movieList">
          
          <MovieList
            movies={movies}
            addList={AddFavourite}
            movieToggler={addFavouriteMovieHandler}
            favouritemoviesList={favouriteMovies}
          ></MovieList>
         
        </div>
      ) : (
        <h2 style={{ color: "#454141cc", textAlign: "center",  }}>
          Type to Search Movies
        </h2>
      )}
      { isLoading===true   &&      <h2 style={{ color: "#454141cc", textAlign: "center",  }}>
          isLoading...
        </h2>} 

      <Heading heading="Favourites" />
      {favouriteMovies.length > 0 ? (
        <div className="movieList">
          <MovieList
            movies={favouriteMovies}
            addList={RemoveFromFavourites}
            movieToggler={removeMovieHandler}
            favouritemoviesList={favouriteMovies}
          ></MovieList>
        </div> 
      ) : (
        <h2 style={{ color: "#454141cc", textAlign: "center" }}>
          No Favourite Movies
        </h2>
      )}
    </div>
  
  )
};
export default App;

import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";

import MovieHeader from "./components/MovieHeader";
import EditMovieForm from "./components/EditMovieForm";
import AddMovieForm from "./components/AddMovieForm";

import FavoriteMovieList from "./components/FavoriteMovieList";

import axios from "axios";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();

  const getMovies = () => {
    axios
      .get("http://localhost:9000/api/movies")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:9000/api/movies/${id}`)
      .then((res) => {
        setMovies(res.data);
        if (favoriteMovies.find((favMovie) => favMovie.id === id)) {
          setFavoriteMovies(
            favoriteMovies.filter((favMovie) => favMovie.id !== id)
          );
        }
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const addToFavorites = (movie) => {
    if (favoriteMovies.find((favMovie) => favMovie.id === movie.id)) {
      setFavoriteMovies(
        favoriteMovies.filter((favMovie) => favMovie.id !== movie.id)
      );
    } else {
      const newFavoriteList = [...favoriteMovies, movie];
      setFavoriteMovies(newFavoriteList);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand"> HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Routes>
            <Route
              path="movies/edit/:id"
              element={<EditMovieForm setMovies={setMovies} />}
            />

            <Route
              path="movies/:id"
              element={
                <Movie
                  deleteMovie={deleteMovie}
                  addToFavorites={addToFavorites}
                  favoriteMovies={favoriteMovies}
                />
              }
            />

            <Route
              path="movies/add"
              element={<AddMovieForm setMovies={setMovies} />}
            />

            <Route path="movies" element={<MovieList movies={movies} />} />

            <Route path="/" element={<Navigate to="/movies" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

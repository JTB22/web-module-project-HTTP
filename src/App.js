import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";

import MovieHeader from "./components/MovieHeader";
import EditMovieForm from "./components/EditMovieForm";

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
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const addToFavorites = (movie) => {};

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
              element={<Movie deleteMovie={deleteMovie} />}
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

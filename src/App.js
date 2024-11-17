import "./App.css";
import { useEffect, useState } from "react";

import Logo from "./components/nav/Logo";
import Navbar from "./components/nav/Navbar";
import Search from "./components/nav/Search";
import Results from "./components/nav/Results";

import Main from "./components/main/Main";
import Box from "./components/main/Box";
import Movies from "./components/main/Movies";
import Watched from "./components/main/Watched";

import Loader from "./components/utils/Loader";
import ErrorMessage from "./components/utils/ErrorMessage";
import MovieDetails from "./components/main/MovieDetails";

export const KEY = "d5c358a1";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, isLoading] = useState(false);
  const [err, setErr] = useState("");
  const [movieId, setMovieId] = useState("");

  useEffect(
    function () {
      async function loadMovies() {
        try {
          isLoading(true);
          setErr("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!res.ok) throw new Error("There was a issue with your data");

          const data = await res.json();
          if (data.Error) throw new Error(data.Error);

          setMovies(data.Search);
        } catch (e) {
          setErr(e.message);
        } finally {
          isLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setErr("The movie must have more than 3 char...")
        return;
      }

      loadMovies();
    },
    [query]
  );

  console.log(movieId);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Results movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {loading && <Loader />}
          {!loading && !err && (
            <Movies movies={movies} handleSelectedId={setMovieId} />
          )}
          {err && <ErrorMessage message={err} />}
        </Box>
        <Box>{movieId ? <MovieDetails id={movieId} /> : <Watched watched={watched} />}</Box>
      </Main>
    </>
  );
}



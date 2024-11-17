import Movie from "./Movie";

export default function Movies({ movies, handleSelectedId }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          handleSelectedId={handleSelectedId}
        />
      ))}
    </ul>
  );
}
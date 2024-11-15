import Summary from "./Summary";
import WatchedMovie from "./WatchedMovie";

export default function Watched({ watched }) {
  return (
    <>
      <Summary watch={watched} />
      <ul className="list">
        {watched.map((movie) => (
          <WatchedMovie key={movie.imdbID} movie={movie} />
        ))}
      </ul>
    </>
  );
}
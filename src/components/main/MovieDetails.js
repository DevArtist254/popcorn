import { useEffect, useState } from "react";
import Loader from "../utils/Loader";
import Stars from "../../Star";

import { KEY } from "../../App";

export default function MovieDetails({ id }) {
  const [details, setDetails] = useState({});
  const [loading, isLoading] = useState(false);

  useEffect(
    function () {
      async function loadDetails() {
        isLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${id}`
        );
        const data = await res.json();
        setDetails(data);
        isLoading(false);
      }

      loadDetails();
    },
    [id]
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back">&larr;</button>
          </header>
          <section className="details-overview">
            <img src={details.Poster} alt="movie" />
            <div>
              <h2>{details.Title}</h2>
              <p>{details.Genre}</p>
              <p>{details.Runtime}</p>
              <p>IMDB Rating {details.imdbRating}</p>
            </div>
          </section>
          <section>
            <em>
              <p>{details.Plot}</p>
            </em>
            <p>{details.Awards}</p>
            <p>{details.Writer}</p>
            <p>{details.Actors}</p>
          </section>
          <div className="rating">
            <button className="btn-add">
              <h2>Add your rating</h2>
              <Stars maxRating={10} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

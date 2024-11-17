export default function Results({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies === undefined ? 0 : movies.length }</strong> results
    </p>
  );
}

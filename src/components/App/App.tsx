import { useState } from "react";
import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import fetchMovies from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoader, setLoader] = useState(false);
  const [isError, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const openModal = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  async function handleSearch(topic: string) {
    try {
      setError(false);
      setLoader(true);
      const movies = await fetchMovies(topic);

      if (movies.length == 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(movies);
    } catch {
      setError(true);
    } finally {
      setLoader(false);
    }
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoader && <Loader />}
      <Toaster position="top-center" reverseOrder={false} />
      {isError ? (
        <ErrorMessage />
      ) : (
        movies.length > 0 &&
        isLoader === false && <MovieGrid movies={movies} onSelect={openModal} />
      )}
      {selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie} />
      )}
    </>
  );
}

export default App;

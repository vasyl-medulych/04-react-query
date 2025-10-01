import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesProps {
  results: Movie[];
  total_pages: number;
}

axios.defaults.baseURL = "https://api.themoviedb.org/3/search/";
export default async function fetchMovies(
  topic: string,
  page: number
): Promise<FetchMoviesProps> {
  const apiReadKey = import.meta.env.VITE_API_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiReadKey}`,
    },
  };
  const res = await axios.get<FetchMoviesProps>(
    `movie?query=${topic}&page=${page}`,
    options
  );

  return res.data;
}

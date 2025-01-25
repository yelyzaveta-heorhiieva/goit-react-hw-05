import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import toast, { Toaster } from 'react-hot-toast';

const MoviesPage = ({ fetchData, isMovie }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchData, setSearchData] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);
   const [searchValue, setSearchValue] = useState(searchParams.get("query") || "");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
       if (searchValue) {
      fetchSearchMovies(searchValue, page);
      navigate(`/movies?query=${searchValue}`, { replace: true });
    }
  }, [fetchTrigger, page ])

  const handleSubmit = (evt) => {
    setSearchData([]);
    evt.preventDefault();
    const [input] = evt.target.elements;
    if (input.value.trim() === '') {
     return toast.error("Please enter a request")
    }
    setPage(1);
    setSearchValue(input.value.toLowerCase().trim());
    setFetchTrigger(prev => !prev);
    setSearchParams({ searchValue });
   evt.target.reset();
  };

  async function fetchSearchMovies(query, searchPage) {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${searchPage}`;
      const data = await fetchData(url);
      setTotalPages(data.total_pages);
      setSearchData((prev) => [...prev, ...data.results])
      
      console.log(data);
       
    } catch (error) {
        //  setError(true);
      } finally {
      // setLoading(false);
      }
  }
  
  const loadMore = () => {
   setPage((prevPage) => prevPage + 1);
 };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movie"
        />          
        <button type="submit">Search</button>
      </form>
       <Toaster position="top-right" reverseOrder={false} />

      <MovieList data={searchData} isMovie={isMovie} />   
      {searchData.length > 0 && totalPages > page && <button type="button" onClick={loadMore}>Load more</button>}
    </div>
  )
}

export default MoviesPage

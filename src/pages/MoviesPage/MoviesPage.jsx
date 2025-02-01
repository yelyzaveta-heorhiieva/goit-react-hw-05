import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import s from './MoviePage.module.css'
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { fetchData } from "../../services/api";

const MoviesPage = ({isMovie }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchData, setSearchData] = useState([]);
   const [searchValue, setSearchValue] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [searchPage, setSearchPage] = useState(1);
   const [totalResults, setTotalResults] = useState(1);

  const updateSearchParams = (params) => {
  const updatedParams = new URLSearchParams(searchParams); 
  Object.entries(params).forEach(([key, value]) => {
    updatedParams.set(key, value); 
  });
  setSearchParams(updatedParams);
};

  useEffect(() => {
      const query = searchParams.get("query");
      const page = searchParams.get("page");
     if (query) {
      setSearchValue(query);
      setSearchPage(page ? Number(page) : 1);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchValue) {
       async function fetchSearchMovies(searchValue, searchPage) {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&page=${searchPage}`;
      const data = await fetchData(url);
      setTotalPages(data.total_pages);
      setSearchData(() => [...data.results]);
      setTotalResults(data.total_results);
    } catch (error) {
        return toast.error("Request failed!")
      } 
  }
      fetchSearchMovies(searchValue, searchPage);
    updateSearchParams({ query: searchValue, page: searchPage });
    }
  }, [searchPage, searchValue])


  const handleSubmit = (evt) => {
    setSearchData([]);
    evt.preventDefault();
    const [input] = evt.target.elements;
    if (input.value.trim() === '') {
     return toast.error("Please enter a request")
    }
    setSearchPage(1);
    setSearchValue(input.value.toLowerCase().trim());
   evt.target.reset();
  };


  const handlePageClick = (event) => {
    setSearchPage(() => (event.selected + 1)); 
     window.scrollTo({
      top: 0, 
      behavior: "smooth", 
    });
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          className={s.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movie"
        />          
        <button type="submit" className={s.btn}><BsSearch className={s.btnIcon} /></button>
      </form>
      { !totalResults && <p className={s.notFound}>No movies found for your request.</p>}
      { searchData.length > 0 && <MovieList data={searchData} isMovie={isMovie} /> }
     { searchData.length > 0 &&
        <ReactPaginate
        className={s.pagination}
        activeClassName={s.pageActive}
        previousClassName={s.prevBtn}
        nextClassName={s.nextBtn}
        breakLabel="..."
        nextLabel={<HiArrowSmRight className={s.icon} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        previousLabel={<HiArrowSmLeft className={s.icon} />}
        initialPage={searchPage - 1}
        pageClassName={s.item}
      />}
    </section>
  )
}

export default MoviesPage

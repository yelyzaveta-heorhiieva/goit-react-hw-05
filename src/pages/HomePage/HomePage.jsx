import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import toast from 'react-hot-toast'
import s from './HomePage.module.css'
import { fetchData } from "../../services/api";

const Homepage = ({isMovie }) => {
    const [trendingData, setTrendingData] = useState([]);
    
    useEffect(() => {   
      const fetchTrendingMovies= async () => {
            try {
              const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
              const {results} = await fetchData(url);
              setTrendingData(results);
            } catch (error) {
               return toast.error("Request failed!")
            }
        }
        fetchTrendingMovies();
    }, []);

  return (
    <section>
      <h1 className={s.title}>Trending today</h1>
      { trendingData.length > 0 && <MovieList data={trendingData} isMovie={isMovie} />    } 
    </section>
  )
}

export default Homepage

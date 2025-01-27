import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import toast, { Toaster } from 'react-hot-toast'
import s from './HomePage.module.css'

const Homepage = ({fetchData, isMovie }) => {
    const [trendingData, setTrendingData] = useState([]);
    
    useEffect(() => {   
        const fetchTrendingMovies = async () => {
            try {
              const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
              const data = await fetchData(url);
              setTrendingData(data.results);
            } catch (error) {
               return toast.error("Request failed!")
            }
        }
        fetchTrendingMovies();
    }, []);

  return (
    <section>
      <h1 className={s.title}>Trending today</h1>
      <Toaster position="top-right" reverseOrder={false} />
      { trendingData.length > 0 && <MovieList data={trendingData} isMovie={isMovie} />    } 
    </section>
  )
}

export default Homepage

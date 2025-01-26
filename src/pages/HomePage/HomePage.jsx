import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";

const Homepage = ({fetchData, isMovie}) => {
    const [trendingData, setTrendingData] = useState([]);
    
    useEffect(() => {   
        const fetchTrendingMovies = async () => {
            try {
                const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
              const data = await fetchData(url);
                setTrendingData(data.results);
            } catch (error) {

            }
        }
        fetchTrendingMovies();
  }, []);
  return (
    <div>
          <h1>Trending today</h1>
          <MovieList data={trendingData} isMovie={isMovie} />     
    </div>
  )
}

export default Homepage

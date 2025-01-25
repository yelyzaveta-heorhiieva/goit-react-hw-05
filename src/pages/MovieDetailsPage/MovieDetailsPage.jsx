import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import s from "./MovieDetailsPage.module.css"

const MovieDetailsPage = ({fetchData}) => {
  const { movieId } = useParams();
  const [detailData, setDetailData] = useState({});
  const location = useLocation();
   const backLinkHref = location.state ?? '/movies${}';
  console.log(location.state);

    useEffect(() => {   
        const fetchDetailMovies = async () => {
            try {
                const url = `https://api.themoviedb.org/3/movie/${movieId}`;
                const data = await fetchData(url);
              setDetailData(data);            
            } catch (error) {

            }
        }
        fetchDetailMovies();
    }, []);

    const { title, release_date, vote_average, overview, genres, poster_path } = detailData;
    return Object.keys(detailData).length > 0 && (
      <div>
        <Link to={backLinkHref}>Go back</Link>
     <div className={s.wrapper}>
        <div className={s.poster}>
          <img className={s.img} src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
        </div>
        <div>
          <h2>{`${title} (${release_date.slice(0, 4)})`}</h2>
          <p>User score: {Math.ceil(vote_average * 10)}%</p>
          <ul>
            <li>
              <h3>Overview</h3>
              <p>{overview}</p>
            </li>
            <li>
              <h3>Genres</h3>
              <p>{genres.length > 0 ? genres[0].name : 'undefined'}</p>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p>Additional information</p>
        <ul>
          <li><Link to="cast">Cast</Link></li>
          <li><Link to="reviews">Reviews</Link></li>
        </ul>
        <Outlet />
      </div>
    </div>
  )
  }
  

export default MovieDetailsPage

import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import s from "./MovieDetailsPage.module.css"
import toast, { Toaster } from 'react-hot-toast';

const MovieDetailsPage = ({fetchData}) => {
  const { movieId } = useParams();
  const [detailData, setDetailData] = useState({});
  const location = useLocation();
   const backLinkHref = location.state ?? '/movies';

    useEffect(() => {   
        const fetchDetailMovies = async () => {
            try {
                const url = `https://api.themoviedb.org/3/movie/${movieId}`;
                const data = await fetchData(url);
              setDetailData(data);            
            } catch (error) {
              return toast.error("Request failed!")
            }
        }
        fetchDetailMovies();
    }, []);

    return (detailData && Object.keys(detailData).length > 0) && (
      <div>
        <Toaster position="top-right" reverseOrder={false} />
        <Link to={backLinkHref}>Go back</Link>
     <div className={s.wrapper}>
        <div className={s.poster}>
          <img className={s.img} src={`https://image.tmdb.org/t/p/w500${detailData.poster_path}`} alt={detailData.title} />
        </div>
        <div>
          <h2>{`${detailData.title} (${detailData.release_date.slice(0, 4)})`}</h2>
          <p>User score: {Math.ceil(detailData.vote_average * 10)}%</p>
          <ul>
            <li>
              <h3>Overview</h3>
              <p>{detailData.overview}</p>
            </li>
            <li>
              <h3>Genres</h3>
              <p>{detailData.genres.length > 0 ? detailData.genres[0].name : 'undefined'}</p>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p>Additional information</p>
        <ul>
          <li><Link to="cast" state={backLinkHref}>Cast</Link></li>
          <li><Link to="reviews" state={backLinkHref}>Reviews</Link></li>
        </ul>
        <Outlet />
      </div>
    </div>
  )
  }
  

export default MovieDetailsPage

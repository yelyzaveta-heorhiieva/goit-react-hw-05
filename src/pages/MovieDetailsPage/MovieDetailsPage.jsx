import { useParams, Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import s from "./MovieDetailsPage.module.css"
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowLeftLong } from "react-icons/fa6";
import clsx from 'clsx';

  const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
    };

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
      <section>
        <Toaster position="top-right" reverseOrder={false} />
        <Link to={backLinkHref} className={s.backLink}><FaArrowLeftLong />Go back</Link>
     <div className={s.wrapper}>
        <div className={s.poster}>
          <img className={s.img} src={`https://image.tmdb.org/t/p/w500${detailData.poster_path}`} alt={detailData.title} />
        </div>
        <div className={s.content}>
          <h2 className={s.title}>{`${detailData.title} (${detailData.release_date.slice(0, 4)})`}</h2>
          <p className={s.score}>User score: {Math.ceil(detailData.vote_average * 10)}%</p>
          <ul className={s.infoList}>
            <li className={s.listItem}>
              <h3>Overview</h3>
              <p>{detailData.overview}</p>
            </li>
            <li className={s.listItem}>
              <h3>Genres</h3>
              <p>{detailData.genres.length > 0 ? detailData.genres[0].name : 'undefined'}</p>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p className={s.adds}>Additional information</p>
        <ul className={s.addsList}>
          <li><NavLink to="cast" state={backLinkHref} className={buildLinkClass}>Cast</NavLink></li>
          <li><NavLink to="reviews" state={backLinkHref} className={buildLinkClass}>Reviews</NavLink></li>
        </ul>
        <Outlet />
      </div>
    </section>
  )
  }
  

export default MovieDetailsPage

import s from './MovieList.module.css'
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';


const MovieList = ({ data, isMovie }) => {
  const location = useLocation();
  const [sortValue, setSortValue] = useState("popularity");
  const [movie, setMovie] = useState([]);

  const Sort = (value) => {
    const sortMovie = [...data].sort((a, b) => {
      if (value === "release_date") {
        const dateA = new Date(a[value]);
        const dateB = new Date(b[value]);
        return dateB - dateA;
      }
      return b[value] - a[value]
    });
    setMovie(() => sortMovie)
  }

  useEffect(() => {
    Sort(sortValue);  
 }, [sortValue, data])

  return (
     <>
       <label className={s.label}>
          Sorting from top to bottom by
          <select value={sortValue} onChange={(evt) => setSortValue(evt.target.value)} className={s.sortSelect}>
            <option value="popularity">popularity</option>
            <option value="release_date">release year</option>
          </select>
        </label>
           <ul className={s.list}>
        {movie.map(({ id, title, release_date, poster_path }) => (
          <li key={id} className={s.movieItem}>
            <Link to={isMovie ? `movies/${id}` : `${id}`} state={location} className={s.movieLink}>
              {poster_path ? <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} className={s.img} />
                : <div className={s.poster}>No image available</div>}
              <span className={s.linkText}>{`${title} (${release_date.slice(0, 4)})`}</span>
            </Link>
        </li>
       )) }
           </ul>
     </>
  )
}

export default MovieList

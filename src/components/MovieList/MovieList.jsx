import s from './MovieList.module.css'
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MovieList = ({ data, isMovie }) => {
  const location = useLocation();
  const [sortValue, setSortValue] = useState("popularity");
  const [movie, setMovie] = useState([]);

  const Sort = (value) => {
    const sortMovie = [...data].toSorted((a, b) => value === "release_date" ? (b[value]).slice(0, 4) - (a[value]).slice(0, 4)
      : b[value] - a[value]);
    setMovie(() => sortMovie)
  }

  useEffect(() => {
    Sort(sortValue);  
 }, [sortValue, data])

  return (
     <>
       <label>
          Sorting from top to bottom by
          <select value={sortValue} onChange={(evt) => setSortValue(evt.target.value)}>
            <option value="popularity">popularity</option>
            <option value="release_date">release year</option>
          </select>
        </label>
           <ul className={s.list}>
        {movie.map(({ id, title, release_date, poster_path }) => (
         <li key={id}>
            <Link to={isMovie ? `movies/${id}` : `${id}`} state={location}>
              {poster_path ? <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} className={s.img} />
                : <div className={s.poster}>No image available</div>}
              <p>{`${title} (${release_date.slice(0, 4)})`}</p>
            </Link>
        </li>
       )) }
           </ul>
     </>
  )
}

export default MovieList

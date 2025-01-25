import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ data, isMovie }) => {
  const location = useLocation();

  return (
    <ul>
      {data.map(({ id, title, release_date }) => (
       <li key={id}>
          <Link to={isMovie ? `movies/${id}` : `${id}`} state={location}>
            <p>{`${title} (${release_date.slice(0, 4)})`}</p>
          </Link>
      </li>
     )) }
    </ul>
  )
}

export default MovieList

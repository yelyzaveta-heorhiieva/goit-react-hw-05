import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import s from './MovieCast.module.css'

const MovieCast = ({fetchData}) => {
  const { movieId } = useParams();
  const [castData, setCastData] = useState([]);
  
useEffect(() => {   
        const fetchCast = async () => {
            try {
              const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
                const data = await fetchData(url);
              setCastData(data.cast);
              
            } catch (error) {

            }
        }
        fetchCast();
    }, []);

  return (
    <ul className={s.castList}>
      { castData.map(({id, profile_path, character, original_name }) => {
        return (
          <li key={id}>
            {profile_path ? <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt={original_name} className={s.img} />
              : <div className={s.photo}>Not found</div>}
            <h3>{original_name}</h3>
            <p>{character}</p>
          </li>)
      } )}
    </ul>
  )
}

export default MovieCast

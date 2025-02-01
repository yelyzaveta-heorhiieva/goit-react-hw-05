import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ShowMoreText from "react-show-more-text";
import toast, { Toaster } from 'react-hot-toast';
import s from './MovieReviews.module.css'
import { fetchData } from "../../services/api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviewsData, setReviewsData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  
useEffect(() => {   
        const fetchCast = async () => {
            try {
              const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
                const data = await fetchData(url);
              setReviewsData(data.results);    
            } catch (error) {
               return toast.error("Request failed!")
            } finally {
              setIsFetching(false)
            }
        }
        fetchCast();
}, [movieId]);

     return (
       <div>
         {!isFetching && reviewsData.length <= 0 && <p className={s.noRewiews}>We don't have any reviews for this movie.</p>}
         {reviewsData.length > 0 &&
           (<ul className={s.list}> 
             {reviewsData.map(({ author, content, id }) =>
               <li key={id} className={s.item}>
                 <h3>{author}</h3>
                 <ShowMoreText
                   lines={3}
                   more="Show more"
                   less="Show less"
                   anchorClass={s.moreText}
                   truncatedEndingComponent={"... "}
                 ><p>{content}</p></ShowMoreText>
               </li>
             )}
           </ul>)}
    </div>
    )
  
}

export default MovieReviews

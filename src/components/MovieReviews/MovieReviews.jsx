import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ShowMoreText from "react-show-more-text";
import toast, { Toaster } from 'react-hot-toast';

const MovieReviews = ({fetchData}) => {
  const { movieId } = useParams();
  const [reviewsData, setReviewsData] = useState([]);
  const [totalResults, setTotalResults] = useState(1);
  
useEffect(() => {   
        const fetchCast = async () => {
            try {
              const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
                const data = await fetchData(url);
              setReviewsData(data.results);    
              setTotalResults(data.total_results);
            } catch (error) {
               return toast.error("Request failed!")
            }
        }
        fetchCast();
}, []);

     return (
       <div>
         <Toaster position="top-right" reverseOrder={false} />
         {!totalResults && <p>We don't have any reviews for this movie.</p>}
         {reviewsData.length > 0 &&
           (<ul>
             {reviewsData.map(({ author, content, id }) =>
               <li key={id}>
                 <h3>{author}</h3>
                 <ShowMoreText
                   lines={3}
                   more="Show more"
                   less="Show less"
                   // className="content-css"
                   anchorClass="show-more-less-clickable"
                   truncatedEndingComponent={"... "}
                 ><p>{content}</p></ShowMoreText>
               </li>
             )}
           </ul>)}
    </div>
    )
  
}

export default MovieReviews

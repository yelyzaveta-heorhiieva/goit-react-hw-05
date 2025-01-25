import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ShowMoreText from "react-show-more-text";

const MovieReviews = ({fetchData}) => {
    const { movieId } = useParams();
  const [reviewsData, setReviewsData] = useState([]);
  
useEffect(() => {   
        const fetchCast = async () => {
            try {
              const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
                const data = await fetchData(url);
              setReviewsData(data.results);
              console.log(reviewsData.results);
              
            } catch (error) {

            }
        }
        fetchCast();
    }, []);
  return (
    <div>
      {reviewsData.length > 0 ?
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
      </ul>) : <p>We don't have any reviews for this movie.</p>}
    </div>
  )
}

export default MovieReviews

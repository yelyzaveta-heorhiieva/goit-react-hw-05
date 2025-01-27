import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import s from './MovieCast.module.css'
import toast, { Toaster } from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel, Scrollbar} from 'swiper/modules';
import "swiper/css";
import 'swiper/css/scrollbar';


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
             return toast.error("Request failed!")
            } 
        }
        fetchCast();
}, []);
    

  return (
  <>
    <Toaster position="top-right" reverseOrder={false} />
      <Swiper
      modules={[Scrollbar, Keyboard, Mousewheel]}
      spaceBetween={10}
        scrollbar={{ draggable: true }}
        slidesPerView='auto'
        keyboard={{ enabled: true, onlyInViewport: true, }}
        mousewheel={true}
      className={s.castList}>
          { castData.map(({id, profile_path, character, original_name }) => {
            return (
              <SwiperSlide key={id} className={s.slide}>
                {profile_path ? <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt={original_name} className={s.img} />
                  : <div className={s.photo}>No image</div>}
                <h3>{original_name}</h3>
                <p>{character}</p>
              </SwiperSlide>)
          } )}
        </Swiper>
  </>
  )
}

export default MovieCast

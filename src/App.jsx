import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import './App.css'
import { Suspense, lazy } from 'react';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Navigation from './components/Navigation/Navigation';
import toast, { Toaster } from 'react-hot-toast';


const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));


function App() {
  // const [error, setError] = useState(false);
  async function fetchData(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDBkYjRmZDQwMWIxZmY5MjY4NTZkYjFhZmI3ODFjZCIsIm5iZiI6MTczNzcxMDMzMy45NTksInN1YiI6IjY3OTM1YWZkNTU5ZTJkOTc0YjQ4MmY4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bA72FnpOepCVf0jHNIZqGY8hH8pQqZz9k2FQd7bcwW8'
        }
      })
      return response.data;
    } catch (error) {
      throw error;
    } 
  }

  return (
      <>
        <Navigation />
        <Toaster position="top-right" reverseOrder={false} />
        <Suspense fallback={<div>Loading page...</div>}></Suspense>
        <Routes>
          <Route path="/" element={<HomePage fetchData={fetchData} isMovie={true} />} />
          <Route path="/movies" element={<MoviesPage fetchData={fetchData} isMovie={false} />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage fetchData={fetchData} />}>
            <Route path="cast" element={<MovieCast fetchData={fetchData} />} />
            <Route path="reviews" element={<MovieReviews fetchData={fetchData} />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* {error && <p>Request Failed</p>} */}
      </>
  )
}

export default App

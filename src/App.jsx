import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import './App.css'
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Navigation from './components/Navigation/Navigation';
import MovieCast from './components/MovieCast/MovieCast';
import MovieReviews from './components/MovieReviews/MovieReviews';

function App() {
  async function fetchData(url) {
    const response = await axios.get(url, {
      headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDBkYjRmZDQwMWIxZmY5MjY4NTZkYjFhZmI3ODFjZCIsIm5iZiI6MTczNzcxMDMzMy45NTksInN1YiI6IjY3OTM1YWZkNTU5ZTJkOTc0YjQ4MmY4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bA72FnpOepCVf0jHNIZqGY8hH8pQqZz9k2FQd7bcwW8'
  }
    })
    return response.data;
  }

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage fetchData={fetchData} isMovie={true} />} />
        <Route path="/movies" element={<MoviesPage fetchData={fetchData} isMovie={false}/>} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage fetchData={fetchData}/>}>
            <Route path="cast" element={<MovieCast fetchData={fetchData}/>} />
            <Route path="reviews" element={<MovieReviews fetchData={fetchData}/>} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App

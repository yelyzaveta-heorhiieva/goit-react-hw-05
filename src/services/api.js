import axios from "axios";

export async function fetchData(url) {
    const response = await axios.get(url, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDBkYjRmZDQwMWIxZmY5MjY4NTZkYjFhZmI3ODFjZCIsIm5iZiI6MTczNzcxMDMzMy45NTksInN1YiI6IjY3OTM1YWZkNTU5ZTJkOTc0YjQ4MmY4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bA72FnpOepCVf0jHNIZqGY8hH8pQqZz9k2FQd7bcwW8'
        }
      })
      return response.data;
  }
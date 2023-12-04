import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { useState, useEffect} from "react"
import Nav from "./Nav";
import React from "react";

function Home() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingShows, setTrendingShows] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [popularPeople, setPopularPeople] = useState([]);
  

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjA3MTcxNWViMDc5ZGNiOGUyNjVkMTk4MTg4NjNhYyIsInN1YiI6IjY1NWYyYTgzN2RmZGE2MDEzOGY5MGUzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HKY7Hf1XSS6VdDa1wgIiCKb_MOq2LFA71sCv6aZ9Mm4'
      }
    };

    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => {
        setUpcomingMovies(data.results);
      })
      .catch(err => console.error(err));
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => {
        setPopularMovies(data.results);
      })
      .catch(err => console.error(err));
  }, []);
  console.log(upcomingMovies);
 return (
  <div class="px-2 bg-main">
   <Nav />
   <p>Upcoming Movies</p>
   <div className="container home">
      <div className="row">
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <ul className="home list-group">
              <li className="list-group-item active">Trending Movies</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
            </ul>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <ul className="home list-group">
                <li className="list-group-item active">Trending TV Shows</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
            </ul>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <ul className="home list-group">
              <li className="list-group-item active">Trending People</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
            </ul>
          </div>
      </div>
      <div className="row">
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <ul className="home list-group">
            <li className="list-group-item active">Popular Movies</li>
            {popularMovies.map(movie => (
              <li className="list-group-item" key={movie.id}>
                <div className="row">
                  <div className="col">
                  <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={`${movie.title} Poster`}
                      style={{ width: "75px", height: "122.5px" }} // Adjust the image size
                    />
                  </div>
                  <div className="col">
                    <h5>{movie.title}</h5>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <ul className="home list-group">
            <li className="list-group-item active">Popular TV Shows</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
          </ul>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
         <ul className="home list-group">
            <li className="list-group-item active">Popular People</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3>Popular reviews this week</h3>
        </div>

      </div>
   </div>
  </div>
 );
}
export default Home;

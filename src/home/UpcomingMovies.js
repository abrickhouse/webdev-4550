import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav";

function UpcomingMovies() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjA3MTcxNWViMDc5ZGNiOGUyNjVkMTk4MTg4NjNhYyIsInN1YiI6IjY1NWYyYTgzN2RmZGE2MDEzOGY5MGUzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HKY7Hf1XSS6VdDa1wgIiCKb_MOq2LFA71sCv6aZ9Mm4",
      },
    };

    
    fetchUpcomingMovies(currentPage, options);
  }, [currentPage]);
  

  const fetchUpcomingMovies = (page, options) => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setUpcomingMovies(data.results);
      })
      .catch((err) => console.error(err));
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div class="px-2 bg-main">
        <Nav />
    <div>
      <h2>Upcoming Movies</h2>
      <ul className="home list-group">
        {upcomingMovies.map((movie) => (
          <Link to={`/details/${movie.id}`} state={{ from: `/` }} className="homeDetails">
            <li className="home list-group-item">
            <div className="row">
              <div className="upcomingMoviesContainer">
                <div className="poster-display-flex">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={`${movie.title} Poster`}
                    className="poster-size"
                  />
                </div>
                <div className="details-display-flex">
                  <h4 className="mb-1">{movie.title}</h4>
                  <p className="mb-1">Release Date: {movie.release_date}</p>
                  <p className="mb-1"><i className="fas fa-star star-icon"></i> {movie.vote_average}</p>
                </div>
              </div>
            </div>
            </li>
          </Link>
        ))}
      </ul>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <button onClick={handleNextPage}>Next Page</button>
    </div>
    </div>
  );
}

export default UpcomingMovies;

import { useEffect, useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Nav from "../Nav";

function UpcomingMovies() {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUpcomingMovies = (page, options) => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`, options)
      .then((response) => response.json())
      .then((data) => {
        setUpcomingMovies(data.results);
      })
      .catch((err) => console.error(err));
  };

  const getPageNumberFromUrl = () => {
    const queryParams = new URLSearchParams(location.search);
    return parseInt(queryParams.get('page'), 10) || 1;
  };

  useEffect(() => {
    const page = getPageNumberFromUrl();
    const options = {
      method: "GET",
      headers: {
       accept: "application/json",
       Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjA3MTcxNWViMDc5ZGNiOGUyNjVkMTk4MTg4NjNhYyIsInN1YiI6IjY1NWYyYTgzN2RmZGE2MDEzOGY5MGUzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HKY7Hf1XSS6VdDa1wgIiCKb_MOq2LFA71sCv6aZ9Mm4",
      },
     };
    fetchUpcomingMovies(page, options);
  }, [location.search]); 

  const handleNextPage = () => {
    const nextPage = getPageNumberFromUrl() + 1;
    navigate(`?page=${nextPage}`);
  };

  const handlePrevPage = () => {
    const currentPage = getPageNumberFromUrl();
    if (currentPage > 1) {
      navigate(`?page=${currentPage - 1}`);
    }
  };

  return (
    <div className="px-2 bg-main">
      <Nav />
      <Link to="/" className="link">
        <i className="fa fa-chevron-left float-start mx-1 my-1"></i> Back
      </Link>
      <br/>
      <span className="movieHeading">Upcoming Movies</span>
      <div className="row movie">
        {upcomingMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link
              to={`/details/${movie.id}`}
              state={{ from: `${location.pathname}${location.search}` }}
              className="movie-link"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={`${movie.title} Poster`}
                className="movie-poster"
              />
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-release-date">
                  Release Date: {movie.release_date}
                </p>
                <i className="fas fa-star star-icon"></i> {movie.vote_average}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        {
            getPageNumberFromUrl() !== 1 && (
              <button
                onClick={handlePrevPage}
                className="page-button-left"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
            )
        }
        <button onClick={handleNextPage} className="page-button-right">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default UpcomingMovies;

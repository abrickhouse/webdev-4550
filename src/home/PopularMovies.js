import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import { useNavigate } from "react-router-dom";

function PopularMovies() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjA3MTcxNWViMDc5ZGNiOGUyNjVkMTk4MTg4NjNhYyIsInN1YiI6IjY1NWYyYTgzN2RmZGE2MDEzOGY5MGUzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HKY7Hf1XSS6VdDa1wgIiCKb_MOq2LFA71sCv6aZ9Mm4",
      },
    };

    
    fetchPopularMovies(currentPage, options);
    navigate(`?page=${currentPage}`);
  }, [currentPage, navigate]);
  

  const fetchPopularMovies = (page, options) => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setPopularMovies(data.results);
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
  console.log(`/popular/?page=${currentPage}`);
  return (
    <div className="px-2 bg-main">
    <Nav />
    <Link to='/' class="link">
    <i className="fa fa-chevron-left float-start mx-1 my-1"></i> Back
   </Link>
    <h2>Popular Movies</h2>
    <div className="row movie">
      {popularMovies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <Link to={`/details/${movie.id}`} state={{ from: `/popular/?page=${currentPage}` }} className="movie-link">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`${movie.title} Poster`}
            className="movie-poster"
          />
          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-release-date">Release Date: {movie.release_date}</p>
            <i className="fas fa-star star-icon"></i> {movie.vote_average}
          </div>
          </Link>
        </div>
      ))}
    </div>
    <div className="d-flex justify-content-center">
    <button onClick={handlePrevPage} disabled={currentPage === 1} className="page-button-left">
      <i className="fas fa-chevron-left"></i>
      </button>
      <button onClick={handleNextPage} className="page-button-right"><i className="fas fa-chevron-right"></i></button>
    </div>
  </div>
  );    
}

export default PopularMovies;

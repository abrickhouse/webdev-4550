import Nav from "../Nav";
import { HashRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Review from "../Review";

function Details() {
 const { id } = useParams();
 const [result, setResult] = useState();
 const options = {
  method: "GET",
  url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
  headers: {
   accept: "application/json",
   Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGQ2NWQ4NGZlYmNhMWQwMTFjMWY5MWYwNWQxMDc1NSIsInN1YiI6IjY1NTY1YzJiN2YwNTQwMDBjNTc5MDU3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xm54P0547jeEewjjkj6nhyB4iN0spOT8jFxmI-wMoO8",
  },
 };

 const getInfo = async () => {
  console.log("get info!!");
  axios
   .request(options)
   .then(function (response) {
    console.log(response.data);
    setResult(response.data);
   })
   .catch(function (error) {
    console.error(error);
   });
 };

 useEffect(() => {
  getInfo();
 }, []);

 return (
  <div class="px-2 bg-main">
   {" "}
   <Nav />
   <Link to="/search" class="link">
    {" "}
    <i className="fa fa-chevron-left float-start mx-1 my-1"></i> Back to Search
   </Link>
   <div class="page-title">Details</div>
   {result && (
    <div class="grid round outline mx-3">
     <div className=" row">
      <img
       className="col-2 mx-1"
       alt="poster"
       src={`https://image.tmdb.org/t/p/w300/${result.poster_path}`}
      />
      <div className="col-8">
       {" "}
       <h1 class="mx-3">
        {result.original_title ? result.original_title : result.original_name}
       </h1>
       <h5 class="mx-3">{result.tagline}</h5>
       <div class="mx-3">{result.overview}</div>
       <div class="mx-3">Rating: {result.vote_average}</div>
       <div class="mx-3">
        Genre: {result.genres.map((e) => e.name).join(", ")}
       </div>
       <div class="mx-3">Release Date: {result.release_date}</div>
       <div class="mx-3">Revenue: {result.revenue}</div>
       <div class="mx-3">Runtime: {result.runtime} min</div>
      </div>
     </div>

     <div class="my-4">
      <div class="d-flex align-items-center">
       {" "}
       <h5 placeholder="Search movies by title..." class="m-2 py-1">
        Reviews (but only review with this id as their movie_id) then work on
        adding reviews to database then has to be on a server
       </h5>
       <button class="btnx py-0">Add a Review</button>
      </div>
      <div class="list-group">
       <Review />
       <Review />
       <Review />
      </div>
     </div>
    </div>
   )}
  </div>
 );
}
export default Details;

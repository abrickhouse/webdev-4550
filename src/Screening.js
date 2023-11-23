import { React, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import axios from "axios";

function Screening(props) {
 const [result, setResult] = useState();
 const options = {
  method: "GET",
  url: `https://api.themoviedb.org/3/movie/${props.movie}?language=en-US`,
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
  <li class="round  my-1">
   {result && (
    <div class="grid row d-flex align-items-center">
     <div class="my-2 peek row grid ">
      <div class="d-flex justify-content-between">
       <div>
        <div class="d-flex">
         {" "}
         <img
          className=" mx-1"
          style={{ height: "200px" }}
          alt="poster"
          src={`https://image.tmdb.org/t/p/w300/${result.poster_path}`}
         />{" "}
         <div>
          {" "}
          <h1 class="mx-2">
           {result.original_title
            ? result.original_title
            : result.original_name}
          </h1>
          <h6 class="mx-2">Created by User: {props.user}</h6>
          <div class="mx-2">Runtime: {result.runtime} min</div>
          <div class="mx-2">Date: {props.date}</div>
         </div>
        </div>
       </div>
       <div className="flex-shrink-1">
        <button class="btnx py-0  float-end">Join</button>
        <div class="my-3">Viewers: {props.viewers.length}</div>
       </div>
      </div>
     </div>
    </div>
   )}
  </li>
 );
}
export default Screening;

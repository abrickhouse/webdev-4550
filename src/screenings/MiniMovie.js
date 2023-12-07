import { React, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import * as client from "../search/client.js";
import axios from "axios";
import { useSelector } from "react-redux";

function MiniMovie(props) {
 const [result, setResult] = useState();

 const users = useSelector((state) => state.profile.users);
 const user = users.filter((u) => props.user === u.name)[0];

 const [screenings, setScreenings] = useState([]);

 const fetchScreenings = async () => {
  const scs = await client.findAllScreenings();
  setScreenings(scs);
 };

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
  fetchScreenings();
 }, []);
 return (
  <li class="round my-1 mx-1">
   {result && (
    <div class="my-2 peek">
     <div>
      <div class="">
       {" "}
       <img
        className="mx-1 my-2"
        style={{ height: "150px", width: "auto" }}
        alt="poster"
        src={`https://image.tmdb.org/t/p/w300/${result.poster_path}`}
       />{" "}
       <div>
        {" "}
        <h6 class="mx-2">
         {result.original_title ? result.original_title : result.original_name}
        </h6>
       </div>
      </div>
     </div>
    </div>
   )}
  </li>
 );
}
export default MiniMovie;

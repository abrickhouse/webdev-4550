import { React, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import screenings from "../Data/screenings.json";
import axios from "axios";
import { useSelector } from "react-redux";

function Screening(props) {
 const [result, setResult] = useState();
 const [views, setViews] = useState(props.viewers.length);
 const [joined, setJoined] = useState(false);
 const { currentUser } = useSelector((state) => state.UserReducer);

 const users = useSelector((state) => state.profile.users);
 const user = users.filter((u) => props.user === u.name)[0];

 const options = {
  method: "GET",
  url: `https://api.themoviedb.org/3/movie/${props.movie}?language=en-US`,
  headers: {
   accept: "application/json",
   Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGQ2NWQ4NGZlYmNhMWQwMTFjMWY5MWYwNWQxMDc1NSIsInN1YiI6IjY1NTY1YzJiN2YwNTQwMDBjNTc5MDU3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xm54P0547jeEewjjkj6nhyB4iN0spOT8jFxmI-wMoO8",
  },
 };

 const handleJoin = () => {
  // should not change if they are already in it (!)
  screenings = screenings.map((s) =>
   s.movie_id === result.id.toString()
    ? {
       _id: s._id,
       movie_id: s.movie_id,
       user: s.user,
       date: s.date,
       viewers: [...s.viewers, currentUser.username],
      }
    : s
  );
  setViews(views + 1);
  setJoined(true);
  console.log(screenings);
  console.log(result.id);
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
 }, [screenings]);
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
          className="col-2 mx-1"
          style={{ height: "200px", width: "auto" }}
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
          {user && (
           <h6 class="mx-2 col">
            Created by User:{" "}
            <Link to={`/profile/${user.id}`} className="col">
             {props.user}
            </Link>
           </h6>
          )}
          <div class="mx-2">Runtime: {result.runtime} min</div>
          <div class="mx-2">Date: {props.date}</div>
         </div>
        </div>
       </div>
       <div className="flex-shrink-1 align-items-end flex-column">
        {currentUser && currentUser.userType === "Typical User" && (
         <div>
          {!props.viewers.includes(currentUser.username) && !joined ? (
           <button class="btnx py-0 px-2 float-end" onClick={handleJoin}>
            Join
           </button>
          ) : (
           <button disabled class="btnx py-0 px-2 float-end">
            joined
           </button>
          )}
         </div>
        )}
        <div class="my-3">Viewers: {views}</div>
       </div>
      </div>
     </div>
    </div>
   )}
  </li>
 );
}
export default Screening;

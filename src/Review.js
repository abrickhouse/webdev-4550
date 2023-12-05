import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

function Review(props) {
 const users = useSelector((state) => state.profile.users);
 const user = users.filter((u) => props.user === u.name)[0];

 const stars = [];
 for (let i = 0; i < props.rating; i++) {
  stars.push(" ");
 }
 return (
  <li class="round  my-1">
   <div class="grid row d-flex align-items-center">
    <div class="my-2 peek ">
     <div class="d-flex">
      <i
       className="fa fa-comment fa-flip-horizontal"
       style={{ color: "#229660" }}
      ></i>
      {user && (
       <Link to={`/profile/${user.id}`}>
        {" "}
        <h6 class="mx-2 col">{props.user}</h6>
       </Link>
      )}
     </div>
     <p>{props.comment}</p>
     <div class="d-flex">
      {stars.map((e) => (
       <i className="fa fa-star" style={{ color: "#a7a700" }} />
      ))}
     </div>
    </div>
   </div>
  </li>
 );
}
export default Review;

import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Review({}) {
 return (
  <li class="round  my-1">
   <div class="grid row d-flex align-items-center">
    <div class="my-2 peek ">
     <div class="d-flex">
      <i className="fa fa-circle" style={{ color: "#C5C0EE" }}></i>
      <h6 class="mx-2">Abrikk</h6>
     </div>
     <p>This is my all time favorite movie! Incredible!</p>
     <div class="d-flex">
      <i className="fa fa-star" style={{ color: "#a7a700" }} />
      <i className="fa fa-star" style={{ color: "#a7a700" }} />
      <i className="fa fa-star" style={{ color: "#a7a700" }} />
      <i className="fa fa-star" style={{ color: "#a7a700" }} />
      <i className="fa fa-star" style={{ color: "#a7a700" }} />
     </div>
    </div>
   </div>
  </li>
 );
}
export default Review;

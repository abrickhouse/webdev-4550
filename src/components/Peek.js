import { React, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Peek({}) {
 return (
  <li class="round  my-1">
   <div class="grid row d-flex align-items-center">
    <div class="my-2 peek col-11">
     <h6>Movie Title</h6>
     <p>Release Date: 10/11/2022</p>
    </div>

    <i className="fa fa-chevron-right float-end col-1"></i>
   </div>
  </li>
 );
}
export default Peek;

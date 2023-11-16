import Nav from "../Nav";
import { HashRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Review from "../Review";

const deta = {
 genre: "Horror",
 release: "10/11/2022",
 revenue: "2 billion",
 runtime: "3h 20m",
};

function Details() {
 return (
  <div class="px-2 bg-main">
   {" "}
   <Nav />
   <Link to="/search" class="link">
    {" "}
    <i className="fa fa-chevron-left float-start mx-1 my-1"></i> Back to Search
   </Link>
   <div class="page-title">Details</div>
   <div class="round outline mx-3">
    <h1 class="mx-2">Movie Title</h1>
    <div class="mx-3">Genre: {deta.genre}</div>
    <div class="mx-3">Release Date: {deta.genre}</div>
    <div class="mx-3">Revenue: {deta.genre}</div>
    <div class="mx-3">Runtime: {deta.genre}</div>
    <div class="my-4">
     <div class="d-flex align-items-center">
      {" "}
      <h5 placeholder="Search movies by title..." class="m-2 py-1">
       Reviews
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
  </div>
 );
}
export default Details;

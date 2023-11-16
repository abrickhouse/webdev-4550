import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Nav from "../Nav";
import Peek from "../components/Peek";
import { Link } from "react-router-dom";

function Search() {
 return (
  <div class="px-2 bg-main">
   {" "}
   <Nav /> <div class="page-title">Search</div>
   <div class="d-flex align-items-center">
    {" "}
    <input
     placeholder="Search movies by title..."
     class=" form-control m-2 py-1"
    />
    <button class="btnx py-0">Search</button>
   </div>
   <div class="list-group">
    <Link to="/details">
     <Peek />
    </Link>
    <Link to="/details">
     <Peek />
    </Link>
    <Link to="/details">
     <Peek />
    </Link>
   </div>
  </div>
 );
}
export default Search;

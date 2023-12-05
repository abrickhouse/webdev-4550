import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import response from "../Data/response.json";
import "../App.css";

function Review(props) {
 const [Repping, setRep] = useState(false);
 const [reply, setReply] = useState("");
 const users = useSelector((state) => state.profile.users);
 const user = users.filter((u) => props.user === u.name)[0];

 const stars = [];
 for (let i = 0; i < props.rating; i++) {
  stars.push(" ");
 }

 const handleSave = () => {
  setRep(false);
  response = [
   ...response,
   {
    _id: response.length + 1,
    rev_id: props.id,
    movie_id: props.movie,
    user: "fill later",
    comment: reply,
   },
  ];
 };

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
        <h6 class="mx-2 my-0 col">{props.user}</h6>
       </Link>
      )}
     </div>
     <p className="my-1">{props.comment}</p>
     <div class="d-flex">
      {stars.map((e) => (
       <i className="fa fa-star" style={{ color: "#a7a700" }} />
      ))}
     </div>
    </div>
   </div>
   <div>
    {response
     .filter((r) => r.rev_id === props.id)
     .map((res) => (
      <div className="res mx-4 my-2">
       <h6>{res.user}</h6>

       {res.comment}
      </div>
     ))}
   </div>
   {!Repping && (
    <button class="btnx py-0 px-2 mx-4 float-end" onClick={(e) => setRep(true)}>
     Reply
    </button>
   )}
   {Repping && (
    <div class="mx-4 my-2">
     <hr />
     <input
      class="form-control my-2"
      placeholder="Type reply..."
      type="text"
      onChange={(e) => setReply(e.target.value)}
     ></input>{" "}
     <button class="btnx py-0 px-2 float-end" onClick={(e) => setRep(false)}>
      cancel
     </button>
     <button
      class="btnx py-0 px-2 mx-2 float-end"
      onClick={(e) => handleSave()}
     >
      save
     </button>
    </div>
   )}
  </li>
 );
}
export default Review;

import { useParams } from "react-router-dom";
import Nav from "../Nav";
import React, { useState } from "react";
import "./Profile.css";
import Review from "../search/Review";
import MiniScreening from "../screenings/MiniScreening";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import reviews from "../Data/reviews.json";
import screenings from "../Data/screenings.json";
import response from "../Data/response.json";
import UserReducer from "../login/UserReducer";
import MiniMovie from "../screenings/MiniMovie";

// Profile page for a user. Only displays sensitive information if this screen is the logged in user's profile
function Profile() {
 const { uId } = useParams();
 const users = useSelector((state) => state.profile.users);
 const user = users.find((user) => user.id === parseInt(uId));

 const navigate = useNavigate();

 if (!user) {
  navigate("/login");
 }

 const { currentUser } = useSelector((state) => state.UserReducer);
 
 // boolean for if the logged in user is viewing their own profile
 let isOwnProfile = false;
 
 if (currentUser) {
  isOwnProfile = (uId == currentUser.id);
 }

 const [showFollowers, setShowFollowers] = useState(true);
 const [showFollowing, setShowFollowing] = useState(true);
 const [showBookmarks, setShowBookmarks] = useState(true);
 const [showReviews, setShowReviews] = useState(true);
 const [showAddedMovies, setShowAddedMovies] = useState(true);
 const [showResponses, setShowResponses] = useState(true);

 // generate a list of followers and following from the indices in the user object
 const followers = users.filter((u) => user.followers.includes(u.id));
 const following = users.filter((u) => user.following.includes(u.id));

 return (
  <div className="px-2 bg-main bg-dark">
   {" "}
   <Nav />
   <div className="mx-5 my-2">
    <div className="row" style={{ width: "100%" }}>
     {/* column for Profile Picture, Name, and Bio */}
     <div
      // checks if this is the users own profile, if not it makes this div larger.
      className={`col-md-5 border rounded p-4 me-3 mt-2 bg-mint ${
       isOwnProfile ? "wd-scrollable-div" : "wd-scrollable-div-large"
      } `}
     >
      {/* <div className="col-md-4 border rounded p-4 me-3 mt-2 bg-mint wd-scrollable-div"> */}
      <h2
       className="rounded"
       style={{
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        border: "2px solid black",
        fontSize: "1.5em",
       }}
      >
       Profile Information
      </h2>
      <img
       src={user.profilePicture}
       alt="Profile"
       className="img-fluid rounded-circle mx-auto d-block"
      />
      <h1 className="text-center">{user.name}</h1>
      <div className="d-flex justify-content-center mb-2 mt-4">
       {/* EDIT PROFILE BUTTON only if this is logged in user */}
       {isOwnProfile && (
        <Link
         className="wd-link border-dark border-2 rounded wd-li bg-success p-2 text-center form-control"
         to={`/profile/profileEditor/${user.id}`}
        >
         Edit Your Profile
        </Link>
       )}
       {/* FOLLOW BUTTON only if this is not the logged in user*/}
       {!isOwnProfile && (
        <button className="wd-link border-dark border-2 rounded wd-li bg-warning p-2 text-center form-control">
         Follow {user.name}
        </button>
       )}
      </div>
      <h5 className="ms-1 mb-2 mt-4">Biography:</h5>
      <p
       className="bg-white p-2 rounded"
       style={{ maxHeight: "calc(1.5em * 5)", overflowY: "auto" }}
      >
       {user.bio}
      </p>
     </div>

     {/* column for reviews/likes or added movies/responses depending on user type */}
     <div
      // checks if this is the users own profile, if not it makes this div larger.
      className={`col border rounded p-4 me-3 mt-2 bg-mint ${
       isOwnProfile ? "wd-scrollable-div" : "wd-scrollable-div-large"
      } `}
     >
      <h2
       className="rounded mb-4"
       style={{
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        border: "2px solid black",
        fontSize: "1.5em",
       }}
      >
       {user.userType === "Typical User"
        ? "Reviews and Likes"
        : "Movies and Responses"}
      </h2>
      {user.userType === "Typical User" && (
       <div>
        <div className="wd-section mb-3">
         <button
          className="btn btn-light form-control"
          onClick={() => setShowReviews(!showReviews)}
         >
          {showReviews ? "Hide Reviews" : "Display Reviews"} 
          {/* ({reviews.filter((r) => r.user === user.username).length}) */}
         </button>{" "}
        </div>
        {showReviews && (
         <ul className="list-group">
          {reviews
           .filter((r) => r.user === user.username)
           .map((review, index) => (
            <Link
             to={`/details/${review.movie_id}`}
             state={{ from: `/profile/${user.id}` }}
            >
             <Review
              id={review._id}
              movie={review.movie_id}
              user={review.user}
              rating={review.rating}
              comment={review.comment}
              det={false}
             />
            </Link>
           ))}
         </ul>
        )}
        <div className="wd-section mb-3">
         <button
          className="btn btn-light mt-4 form-control"
          onClick={() => setShowBookmarks(!showBookmarks)}
         >
          {showBookmarks ? "Hide Bookmarks" : "Display Bookmarks"}
         </button>
        </div>
        {showBookmarks && (
         <ul className="list-group">
          {currentUser.bookmarks.map((b, index) => (
           <Link to={`/details/${b}`} state={{ from: `/profile/${user.id}` }}>
            <MiniMovie user={""} date={""} movie={b} />
           </Link>
          ))}
         </ul>
        )}
       </div>
      )}
      {user.userType === "Director" && (
       <div>
        <div className="wd-section mb-3">
         <button
          className="btn btn-light form-control"
          onClick={() => setShowAddedMovies(!showAddedMovies)}
         >
          {showAddedMovies ? "Hide Screenings" : "Display Screenings"}
         </button>
        </div>
        {showAddedMovies && (
         <ul className="list-group">
          {screenings
           .filter((s) => s.user === user.name)
           .map((addedMovie, index) => (
            <li
             className="list-group-item border-dark border-2 rounded wd-li"
             key={index}
            >
             <MiniScreening
              user={user.name}
              date={addedMovie.date}
              viewers={addedMovie.viewers}
              movie={addedMovie.movie_id}
             />
            </li>
           ))}
         </ul>
        )}
        <div className="wd-section mb-3">
         <button
          className="btn btn-light mt-4 form-control"
          onClick={() => setShowResponses(!showResponses)}
         >
          {showResponses ? "Hide Responses" : "Display Responses"}
         </button>
        </div>
        {showResponses && (
         <ul className="list-group">
          {response
           .filter((r) => r.user === user.name)
           .map((response, index) => (
            <Link
             to={`/details/${response.movie_id}`}
             state={{ from: `/profile/${user.id}` }}
            >
             <li
              className="list-group-item border-dark border-2 rounded wd-li"


             >
              <div>{response.comment}</div>
             </li>
            </Link>
           ))}
         </ul>
        )}
       </div>
      )}
     </div>
     {/* column for followers/following */}
     <div
      // checks if this is the users own profile, if not it makes this div larger.
      className={`col border rounded p-4 mt-2 bg-mint ${
       isOwnProfile ? "wd-scrollable-div" : "wd-scrollable-div-large"
      } `}
     >
      <h2
       className="rounded mb-4"
       style={{
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        border: "2px solid black",
        fontSize: "1.5em",
       }}
      >
       Social Network
      </h2>
      <div className="wd-section mb-3">
       <button
        className="btn btn-light form-control"
        onClick={() => setShowFollowers(!showFollowers)}
       >
        {showFollowers ? "Hide Followers" : "Display Followers"} (
        {followers.length})
       </button>
      </div>
      {showFollowers && (
       <ul className="list-group">
        {followers.map((f) => (
         <Link className="wd-link" to={`/profile/${f.id}`}>
          <li
           className="list-group-item border-dark border-2 rounded wd-li"
           key={f.id}
          >
           {f.name}
          </li>
         </Link>
        ))}
       </ul>
      )}
      <div className="wd-section mb-3">
       <button
        className="btn btn-light mt-4 form-control"
        onClick={() => setShowFollowing(!showFollowing)}
       >
        {showFollowing ? "Hide Following" : "Display Following"} (
        {following.length})
       </button>
      </div>
      {showFollowing && (
       <ul className="list-group">
        {following.map((f) => (
         <Link to={`/profile/${f.id}`} className="wd-link">
          <li
           className="list-group-item border-dark border-2 rounded wd-li"

          >
           {f.name}
          </li>
         </Link>
        ))}
       </ul>
      )}
     </div>

     {/* Private information only visible to the signed-in user */}
     {isOwnProfile && (
      <div className="private-info rounded bg-mint">
       <h2>Your Private Account Information</h2>
       <p>Email: {user.email}</p>
       <p>Phone Number: {user.phoneNumber}</p>
       <p>Address: {user.address}</p>
       <hr className="mt-4" />
       <p className="mt-3 text-danger">
        <b>
         ***Disclaimer: This information is only available if you are signed in
         to this account. <u>We value your privacy!</u>
        </b>
       </p>
      </div>
     )}
    </div>
   </div>
  </div>
 );
}

export default Profile;

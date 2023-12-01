import { HashRouter, useParams } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Nav from "../Nav";
import React, { useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileReducer from "./ProfileReducer";


// Profile page for the logged in user
function Profile() {
  const { uId } = useParams();
  const users = useSelector((state) => state.profile.users);
  const user = users.find((user) => user.id === parseInt(uId));

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [showAddedMovies, setShowAddedMovies] = useState(false);
  const [showResponses, setShowResponses] = useState(false);

  // generate a list of followers and following from the indices in the user object
  const followers = users.filter((u) => user.followers.includes(u.id));
  const following = users.filter((u) => user.following.includes(u.id));
  

  return (
    <div className="px-2 bg-main bg-dark">
      {" "}
      <Nav />
      <div className="container mt-4">
        <div className="row">
          {/* column for Profile Picture, Name, and Bio */}
          <div className="col-md-4 border rounded p-4 me-3 bg-mint">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="img-fluid rounded-circle mx-auto d-block"
            />
            <h1 className="text-center">{user.name}</h1>
            <p className="bg-white p-3 rounded">{user.bio}</p>

            <div className="d-flex justify-content-center">
              {/* EDIT PROFILE BUTTON */}
              <Link
                className="wb-link border-dark border-2 rounded wd-li bg-success p-2 text-center"
                to={`/profile/profileEditor/${user.id}`}
              >
                Edit Your Profile
              </Link>

              {/* FOLLOW BUTTON */}
              <button className="border-dark border-1 rounded bg-warning p-2 ms-2 text-center">
                Follow {user.name}
              </button>
            </div>
          </div>

          {/* column for reviews/likes or added movies/responses depending on user type */}
          <div className="col-md-4 rounded p-4 me-3 bg-mint">
            {user.userType === "Typical User" && (
              <div>
                <h2>
                  <button
                    className="btn btn-light text-center me-2"
                    onClick={() => setShowReviews(!showReviews)}
                  >
                    {showReviews ? "Hide Reviews" : "Display Reviews"}
                  </button>{" "}
                </h2>
                {showReviews && (
                  <ul className="list-group">
                    {user.reviews.map((review, index) => (
                      <li
                        className="list-group-item border-dark border-2 rounded wd-li"
                        key={index}
                      >
                        {review}
                      </li>
                    ))}
                  </ul>
                )}

                <h2>
                  <button
                    className="btn btn-light text-center me-2"
                    onClick={() => setShowLikes(!showLikes)}
                  >
                    {showLikes ? "Hide Likes" : "Display Likes"}
                  </button>
                </h2>
                {showLikes && (
                  <ul className="list-group">
                    {user.likes.map((likedMovie, index) => (
                      <li
                        className="list-group-item border-dark border-2 rounded wd-li"
                        key={index}
                      >
                        {likedMovie.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {user.userType === "Director" && (
              <div>
                <h2>
                  <button
                    className="btn btn-light text-center me-2"
                    onClick={() => setShowAddedMovies(!showAddedMovies)}
                  >
                    {showAddedMovies ? "Hide Added Movies" : "Display Added Movies"}
                  </button>
                </h2>
                {showAddedMovies && (
                  <ul className="list-group">
                    {user.addedMovies.map((addedMovie, index) => (
                      <li
                        className="list-group-item border-dark border-2 rounded wd-li"
                        key={index}
                      >
                        {addedMovie.title}
                      </li>
                    ))}
                  </ul>
                )}

                <h2>
                  <button
                    className="btn btn-light text-center me-2"
                    onClick={() => setShowResponses(!showResponses)}
                  >
                    {showResponses ? "Hide Responses" : "Display Responses"}
                  </button>
                </h2>
                {showResponses && (
                  <ul className="list-group">
                    {user.responsesToReviews.map((response, index) => (
                      <li
                        className="list-group-item border-dark border-2 rounded wd-li"
                        key={index}
                      >
                        {response}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* column for followers/following */}
          <div className="col-md rounded p-4 bg-mint">
            <h2>
              <button
                className="btn btn-light text-center me-2"
                onClick={() => setShowFollowers(!showFollowers)}
              >
                {showFollowers ? "Hide Followers" : "Display Followers"}
              </button>
            </h2>
            {showFollowers && (
              <ul className="list-group">
                {followers.map((f) => (
                  <Link className="wb-link" to={`/profile/${f.id}`}>
                    <li className="list-group-item border-dark border-2 rounded wd-li" key={f.id}>
                      {f.name}
                      {console.log(f.name)}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
            <h2>
              <button
                className="btn btn-light text-center me-2"
                onClick={() => setShowFollowing(!showFollowing)}
              >
                {showFollowing ? "Hide Following" : "Display Following"}
              </button>{" "}
            </h2>
            {showFollowing && (
              <ul className="list-group">
                {following.map((f) => (
                  <Link to={`/profile/${f.id}`} className="wb-link">
                    <li className="list-group-item border-dark border-2 rounded wd-li" key={f.id}>
                      {f.name}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>

          {/* Private information only visible to the signed-in user 
          Use some kind of if (loggedInUser = thisProfile){...} */}
          <div className="private-info rounded bg-mint">
            <h2>Account Information</h2>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phoneNumber}</p>
            <p>Address: {user.address}</p>
            {/* Add other private info */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

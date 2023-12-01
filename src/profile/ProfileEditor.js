import React, { useState } from "react";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { updateUser, selectUser } from "./ProfileReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ProfileEditor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { uId } = useParams();
  const users = useSelector((state) => state.profile.users);
  const user = users.find((user) => user.id === parseInt(uId));

  // Local state to manage input values
  const [editedUser, setEditedUser] = useState({
    ...user});


  const handleSave = () => {
    handleUpdateUser(editedUser);
    navigate(`/Profile/${uId}`);
  };

  const handleUpdateUser = async (user) => {
    const updatedUser = user;
    // for now theres a placeholder, but this is where the API call would go
    // const updatedUser = await updateUser(user);
    dispatch(updateUser(updatedUser));
  };

  return (
    /*

      WRITE CONDITION TO MAKE SURE UID MATCHES LOGGED IN USER
      - THIS MAKES SURE YOU CANT CHANGE URL AND EDIT OTHER USERS PROFILES

    */
    <div className="container mt-4 bg-main bg-dark">
      <h1 className="text-white text-center p-3">Edit Your Profile</h1>
      <div className="mb-3 rounded bg-mint">
        <label htmlFor="name" className="form-label pt-2 ps-2">
          Name
        </label>
        <input
          type="text"
          className="form-control bg-white"
          id="name"
          name="name"
          value={editedUser.name}
          onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
        />
      </div>
      <div className="mb-3 rounded bg-mint">
        <label htmlFor="name" className="form-label pt-2 ps-2">
          Change Your Profile Picture
        </label>
        <input
          type="text"
          className="form-control bg-white"
          id="pfp"
          name="pfp"
          placeholder="Enter the new URL of the image you would like to use"
          value={editedUser.profilePicture}
          onChange={(e) => setEditedUser({ ...editedUser, profilePicture: e.target.value })}
        />
      </div>
      <div className="mb-3 rounded bg-mint">
        <label htmlFor="email" className="form-label pt-2 ps-2">
          Email
        </label>
        <input
          type="email"
          className="form-control bg-white"
          id="email"
          name="email"
          value={editedUser.email}
          onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
        />
      </div>
      <div className="mb-3 rounded bg-mint">
        <label htmlFor="bio" className="form-label pt-2 ps-2">
          Biography
        </label>
        <textarea
          className="form-control bg-white"
          id="bio"
          rows={5}
          name="bio"
          value={editedUser.bio}
          onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
        />
      </div>
      <div className="mb-3 rounded bg-mint">
        <label htmlFor="phoneNumber" className="form-label pt-2 ps-2">
          Phone Number
        </label>
        <input
          type="text"
          className="form-control bg-white"
          id="phoneNumber"
          name="phoneNumber"
          value={editedUser.phoneNumber}
          onChange={(e) => setEditedUser({ ...editedUser, phoneNumber: e.target.value })}
        />
      </div>
      <div className="mb-3 rounded bg-mint">
        <label htmlFor="address" className="form-label pt-2 ps-2">
          Address
        </label>
        <input
          type="text"
          className="form-control bg-white"
          id="address"
          name="address"
          value={editedUser.address}
          onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
        />
      </div>

      <button onClick={handleSave} className="btn btn-success">
        Save
      </button>
      <Link to={`/profile/${uId}`} className="btn btn-danger ms-2">
        Cancel
      </Link>
    </div>
  );
}

export default ProfileEditor;

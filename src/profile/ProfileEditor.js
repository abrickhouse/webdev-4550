import React, { useState } from "react";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as client from "../login/client";
import { setCurrentUser } from "../login/UserReducer";


function ProfileEditor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { uId } = useParams();
  const { currentUser } = useSelector((state) => state.UserReducer);

  // check to see if current logged in user matches the user id in the url
  // this makes sure that only the user can edit their own profile
  const isOwnProfile = currentUser.id === uId;
  if (!isOwnProfile) {
    navigate("/");
  }

  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const deleteAccount = async () => {
    try {
      // Your delete logic here
      await client.deleteUser(currentUser.id);
      dispatch(setCurrentUser(null));
      navigate(`/login`);
    } catch (error) {
      console.error("Cannot delete account.");
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };



  // Local state to manage input values
  const [editedUser, setEditedUser] = useState({
    ...currentUser,
  });

  console.log(currentUser)

  // const deleteAccount = async () => {
  //   try {
  //     await client.deleteUser(currentUser.id);
  //     dispatch(setCurrentUser(null));
  //     navigate(`/login`);
  //   } catch (error) {
  //     console.error("Cannot delete account.")
  //   }
  // };
  const save = async () => {
    try {
      await client.updateUser(editedUser);
      dispatch(setCurrentUser(editedUser));
      navigate(`/Profile/${uId}`);
    } catch (error) {
      // console.error("Update failed: ", error);
    }
  };

  return (
    <div
      className="container bg-main bg-dark m-0 px-4"
      style={{
        width: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        height: "100vh",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <h1 className="text-white text-center p-4">Edit Your Profile</h1>
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

      <button onClick={save} className="btn btn-success">
        Save
      </button>
      <Link to={`/profile/${uId}`} className="btn btn-danger ms-2">
        Cancel
      </Link>
      {/* {showModal && (
      <div className="modal">
        <div className="modal-content">
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete your account?</p>
          <button onClick={deleteAccount} className="btn btn-danger">
            Confirm Delete
          </button>
          <button onClick={handleCancelDelete} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    )} */}
      <button onClick={deleteAccount} className="btn btn-danger delete">
        Delete
      </button>
      
    </div>
  );
}

export default ProfileEditor;

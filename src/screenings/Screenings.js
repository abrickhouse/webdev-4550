import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Nav from "../Nav";
import Screening from "./Screening";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import screenings from "../Data/screenings.json";

function Screenings() {
 const [open, setOpen] = useState(false);
 const [mov, setMov] = useState("");
 const [dat, setDat] = useState("");

 const handleClose = () => {
  setOpen(false);
 };

 const handleSave = () => {
  setOpen(false);
  screenings = [
   ...screenings,
   {
    _id: new Date().getTime().toString(),
    movie_id: mov,
    user: "new_director",
    date: dat,
    viewers: [],
   },
  ];
 };

 const handleOpen = () => {
  setOpen(true);
 };

 return (
  <div class="px-2 bg-main">
   <Nav />{" "}
   <div className="row">
    <div class="page-title col-8">Screenings</div>
    <div className="col-3 py-2 px-0">
     <button class="btnx py-0  float-end" onClick={handleOpen}>
      Create New
     </button>
    </div>
   </div>
   <div class="d-flex row align-items-center"></div>
   <div class="list-group">
    {screenings.map((s) => (
     <Screening
      user={s.user}
      date={s.date}
      viewers={s.viewers.length}
      movie={s.movie_id}
     />
    ))}
   </div>
   <Modal isOpen={open} onClose={handleClose} className="add">
    <>
     <h3>Add a Screening</h3>
     <label className="my-1">
      {" "}
      Movie ID:{" "}
      <input
       class="form-control"
       onChange={(e) => setMov(e.target.value)}
      ></input>
     </label>
     <div>
      <label className="my-3">
       Date:{" "}
       <input
        onChange={(e) => setDat(e.target.value)}
        type="date"
        className="form-control "
       ></input>
      </label>
     </div>

     <div className="my-5">
      {" "}
      <button class="btnx py-0 mx-2 float-end" onClick={handleSave}>
       {" "}
       save
      </button>
      <button class="btnx py-0  float-end" onClick={handleClose}>
       {" "}
       close
      </button>
     </div>
    </>
   </Modal>
  </div>
 );
}
export default Screenings;

import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Nav from "../Nav";
import Screening from "../Screening";

import screenings from "../Data/screenings.json";

function Screenings() {
 return (
  <div class="px-2 bg-main">
   <Nav /> <div class="page-title">Screenings</div>
   <div class="d-flex row align-items-center"></div>
   <div class="list-group">
    {screenings.map((s) => (
     <Screening
      user={s.user}
      date={s.date}
      viewers={s.viewers}
      movie={s.movie_id}
     />
    ))}
   </div>
  </div>
 );
}
export default Screenings;

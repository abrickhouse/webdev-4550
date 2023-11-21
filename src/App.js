import logo from "./logo.svg";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Nav from "./Nav";
import Home from "./Home";
import Screenings from "./screenings/Screenings";
import Search from "./search/Search";
import Profile from "./profile/Profile";
import Details from "./search/Details";

function App() {
 return (
  <HashRouter>
   <div class="body">
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/screenings/*" element={<Screenings />} />
     <Route path="/search/*" element={<Search />} />
     <Route path="/profile/*" element={<Profile />} />
     <Route path="/details/:id" element={<Details />} />
    </Routes>
   </div>
  </HashRouter>
 );
}

export default App;

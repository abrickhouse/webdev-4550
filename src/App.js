import logo from "./logo.svg";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Home from "./Home";
import Screenings from "./screenings/Screenings";
import Search from "./search/Search";
import Profile from "./profile/Profile";
import Details from "./search/Details";
import ProfileEditor from "./profile/ProfileEditor";
import Signin from "./login/Signin";
import { Signup } from "./login/Signup";
import { Provider } from "react-redux";
import store from "./store";
import SearchRes from "./search/SearchRes";

function App() {
 return (
  <Provider store={store}>
   <HashRouter>
    <div class="body">
     <Routes>
      <Route path="/signin/*" element={<Signin />} />
      <Route path="/signup/*" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/screenings/*" element={<Screenings />} />
      <Route path="/search/" element={<Search />} />
      <Route path="/result/:que" element={<SearchRes />} />
      <Route path="/profile/:uId" element={<Profile />} />
      <Route path="/profile/profileEditor/:uId" element={<ProfileEditor />} />
      <Route path="/details/:id" element={<Details />} />
     </Routes>
    </div>
   </HashRouter>
  </Provider>
 );
}

export default App;

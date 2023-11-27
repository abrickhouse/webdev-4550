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
import ProfileEditor from "./profile/ProfileEditor";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div class="body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/screenings/*" element={<Screenings />} />
            <Route path="/search/*" element={<Search />} />
            <Route path="/profile/:uId" element={<Profile />} />
            <Route path="/profile/profileEditor/:uId" element={<ProfileEditor />} />
            <Route path="/details/*" element={<Details />} />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;

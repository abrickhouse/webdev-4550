import Nav from "../Nav"
import React, { useState } from "react";
import * as client from "./client";
import { useNavigate } from "react-router-dom";

function Signup(){
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
     firstname:"", username: "", password: "",
     email:"", role:"REVIEWER"});

    const handleRoleChange = (e) => {
    setCredentials({ ...credentials, role: e.target.value });
  };
  const signup = async () => {
    try {
      await client.signup(credentials);
      navigate("/login");
    } catch (err) {
      console.log("error");
    }
  };

  return (
    <div className="background-sign">
      <Nav />
      <div className="container sign1">
        <div className="container sign">
          <div className="d-flex justify-content-center">
          <h2 className="webtitle">Create an account</h2>
          </div>
          <form>         
            <div className="form-group sign">
              <input type="text" class="form-control" placeholder="Username" value={credentials.username} 
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}/>
            </div>
            <div className="form-group sign">
              <input type="email" class="form-control" placeholder="Email" value={credentials.email} 
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}/>
            </div>
            <div className="form-group sign">
              <input type="password" class="form-control" placeholder="Password" value={credentials.password} 
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}/>
            </div>
            <div className="form-group sign">
              <input type="password" class="form-control" placeholder="Confirm Password"/>
            </div>
            <div className="mb-3">
              <div className="form-check sign">
                <input className="form-check-input" type="radio"
                 name="TypeOfUser" id="Reviewer" value="REVIEWER"
                checked={credentials.role === "REVIEWER"} onChange={handleRoleChange}/>
                  <label className="register-sent" for="Reviewer">
                    Reviewer
                  </label>
              </div>
              <div className="form-check sign">
                <input className="form-check-input" type="radio"
                 name="TypeOfUser" id="Director" value="DIRECTOR"
                 checked={credentials.role === "DIRECTOR"} onChange={(handleRoleChange)}/>
                  <label className="register-sent" for="Director">
                    Director
                  </label>
              </div>
            </div>

            <p className="sign-sent"> Already have an account? <a href="#/login/*" className="sign-link">Login now</a></p>
            <div className="d-flex justify-content-center">
              <button type="submit" class="btn-sign" onClick={signup}>Sign Up</button>
            </div>
          </form>
        </div>  
      </div>
    </div>
  )
}

export default Signup;
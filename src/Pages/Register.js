import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import LoginRegisterTemplate from "../Components/LoginRegisterTemplate";

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warning, setWarning] = useState(null);

  const registerUser = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ username: username, password: password });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/register`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        props.history.push("/");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <LoginRegisterTemplate>
      <h3 className="text-center mb-4">Login</h3>
      <div className="mb-3">
        <p>Username</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <p>Password</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <p>Confirm Password</p>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          type="password"
          className="form-control"
        />
      </div>
      <p className="text-danger">{warning}</p>
      <div>
        <button
          onClick={() => {
            if (username === "" || password === "") {
              setWarning("Cannot empty");
            } else if (password === confirmPassword) {
              registerUser();
            } else {
              setWarning("Password should be the same with Confirm Password");
            }
          }}
          className="btn btn-secondary form-control mb-2"
        >
          Register
        </button>
        <p className="text-center">Already have an account?</p>
        <Link to="/" className="btn btn-info form-control mb-2">
          Login
        </Link>
      </div>
    </LoginRegisterTemplate>
  );
}

export default withRouter(Register);

import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";

import { AuthContext } from "../Contexts/Authentication";
import LoginRegisterTemplate from "../Components/LoginRegisterTemplate";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(null);
  const auth = useContext(AuthContext);

  const authUser = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ username: username, password: password });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/auth`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (Object.entries(data).length === 0 && data.constructor === Object) {
          setWarning("Wrong Username / Password");
        } else {
          auth.changeAuthToTrue(data);
          props.history.push("/home");
        }
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
      <p className="text-danger">{warning}</p>
      <div>
        <button onClick={authUser} className="btn btn-info form-control mb-2">
          Login
        </button>
        <p className="text-center">Don't have account?</p>
        <Link to="/register" className="btn btn-secondary form-control mb-2">
          Register
        </Link>
      </div>
    </LoginRegisterTemplate>
  );
}

export default withRouter(Login);

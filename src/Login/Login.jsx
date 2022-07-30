import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    const bodies = {
      email: loginData.email,
      password: loginData.password,
    };

    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodies),
    });

    const data = res.json();

    console.log(data.Response);

    setLoginData(data);
    setLoginData({
      title: "",
      content: "",
      date: "",
    });

    window.location.reload();
  };

  return (
    <div>
      <section>
        <h1>Login</h1>

        <form style={{ maxWidth: "50rem" }}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLogin}
              id="ema"
              autoComplete="off"
              placeholder="Enter Your Email"
              className="form-control"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              name="password"
              value={loginData.password}
              onChange={handleLogin}
              type="password"
              autoComplete="off"
              placeholder="Enter Your Password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="btn btn-primary" onSubmit={onSubmit}>
            Login
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;

import React, { useState } from "react";

function Registration() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const databodies = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    console.log(databodies);

    fetch("http://localhost:3001/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(databodies),
    }).then( (res) => { return res.json()})
    .then( (data) => console.log(data) )

    console.log(data.Response);

    setData(data);
    setData({
      name: "",
      email: "",
      phone: "",
      password: "",
    });

    // window.location.reload();
  };

  return (
    <div>
      <section >
        <h1>Sign Up</h1>

        <form >
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                placeholder="Enter Your Name"
                value={data.name}
                onChange={handleInput}
                className="form-control" 
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Phone
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                name="phone"
                id="phone"
                autoComplete="off"
                placeholder="Enter Your Number"
                value={data.phone}
                onChange={handleInput}
                className="form-control"
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                placeholder="Enter Your Email"
                value={data.email}
                onChange={handleInput}
                className="form-control"
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                name="password"
                id="pass"
                autoComplete="off"
                placeholder="Enter Your Password"
                value={data.password}
                onChange={handleInput}
                className="form-control"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Sign up
          </button>
       </form>
      </section>
    </div>
  );
}

export default Registration;

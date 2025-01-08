import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [credentials, setCredentails] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Credentials:", credentials);

    if (credentials.name.trim().split(" ").length < 2) {
        alert("Please enter your full name (e.g., John Doe).");
        return;
    }

    try {
      const requestBody = JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      });
      console.log("Request Body Sent:", requestBody);

      const response = await fetch("https://mern-app-backend-so3k.onrender.com/api/creatuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      const json = await response.json();
      console.log("Response JSON:", json);

      if (!json.success) {
        alert(json.error || "Invalid credentials. Please check your input.");
        return;
      }

      alert("User registered successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentails({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="exampleInputEmail1"
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
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Alreay a user
          </Link>
        </form>
      </div>
    </div>
  );
}

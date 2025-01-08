import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

export default function Login() {
     const [credentials, setCredentails] = useState({ email: "", password: "" });
     let navigate = useNavigate();
     const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Credentials:", credentials);
    
        try {
            const requestBody = JSON.stringify({ 
                email: credentials.email,
                password: credentials.password, 
            });
            console.log("Request Body:", requestBody);
    
            const response = await fetch("http://localhost:5000/api/loginuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestBody
            });
    
            const json = await response.json();
            console.log("Response JSON:", json);
    
            if (!json.success) {
                alert("Invalid credentials. Please try again.");
                return; // Prevent further execution
            }
    
            // Successful login
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken", json.authToken);
            console.log("Auth Token Saved:", json.authToken);
    
            console.log("Success: Navigating to home");
            navigate("/"); // Redirect to home page
        } catch (error) {
            console.error("Error in handleSubmit:", error);
            alert("Something went wrong. Please try again.");
        }
    };
    
  
      const onChange = (e) => {
          setCredentails({ ...credentials, [e.target.name]: e.target.value })
      }
   
      return (
        <div>
            <div className='container'>
                <form onSubmit={handleSubmit}> 
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                    </div> 
                    <button type="submit" className="m-3 btn btn-primary">Submit</button>
                    <Link to="/creatuser" className='m-3 btn btn-danger'>I'm a new user</Link>
                </form>
            </div>
        </div>
    )
}

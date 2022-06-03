import React, { useState } from 'react';
const axios = require('axios').default;

export default function Landing(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // STATE CHANGES
    const handleUserChange = (e) => {
    setUsername(e.target.value);
    console.log("username: " + username);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        console.log("password: " + password);
    }
    
      const handleRegister = async (e) => {
        
        axios.post('http://localhost:5000/register/', {username: username, password: password})
        .then((res)=>{
          console.log(res)
        })
        e.preventDefault();
      }

    return (
        <div className="App bg-light">
          <div className="d-flex row justify-content-center">
          <div className="d-flex col-md-12 shadow-lg m-5 p-5 mb-5 bg-white rounded w-25 justify-content-center">
            <h1 className="h1 display-1 m-auto"> KardBan </h1>
          </div>
    
          <div className="d-flex col-md-12 shadow-lg m-5 p-5 mb-5 bg-white rounded w-25 justify-content-center">
          <form method="POST" action="http://localhost:5000/register" onSubmit={handleRegister}> 
              <div className="form-group">
                <label for="exampleInputEmail1" className="fw-bold">Email Address / Username</label>
                <input className="form-control" id="exampleInputEmail1" autoComplete="off" placeholder="Enter email/username" onChange={handleUserChange}/>
                
              </div>
              <div className="form-group mt-3">
                <label for="exampleInputPassword1" className="fw-bold">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handlePasswordChange}/>
                <br></br>
              </div>
              <div className="container mt-5 text-center">
              <button type="submit" className=" btn btn-outline-dark">Sign up</button>
              </div>
              
              
            </form>
          </div>
          </div>
    
          
        </div>
      );
}
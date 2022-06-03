import React, { useState, Routes, Route, useNavigate } from 'react';
const axios = require('axios').default;

export default function Landing(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [registering, setRegistering] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    // STATE CHANGES
    const handleUserChange = (e) => {
    setUsername(e.target.value);
    console.log("username: " + username);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        console.log("password: " + password);
    }

    const handleLogIn = async (e) => {
    
        // POST REQUEST RETURNS A STATUS CODE
        axios.post('http://localhost:5000/user/login', {username: username, password: password})
        .then((res) => {
          console.log(res.data);
        })
        .catch((res) => {
          console.log("User doesn't exist")
        })
        e.preventDefault();
      }
    
      const handleRegister = async (e) => {
        setRegistering(true);
        axios.post('http://localhost:5000/user/register', {username: username, password: password})
        .then((res)=>{
          console.log(res);
          setRegistering(false);
        })
        e.preventDefault();
      }
      const registerPage = (e) => {
        setRegistering(true);
        e.preventDefault();
      }

      const changePasswordPage = (e) => {
        setChangingPassword(true);
      }

      const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
      }

      const handleChangePassword = async (e) => {
        e.preventDefault();
        axios.put('http://localhost:5000/user/login/recover', {username: username, password: password, newPassword: newPassword})
        .then((res)=>{
          console.log(res);
          setChangingPassword(false);
        })

      }

    if (registering){
      return (
        <div className="App bg-light">
          <div className="d-flex row justify-content-center">
          <div className="d-flex col-md-12 shadow-lg m-5 p-5 mb-5 bg-white rounded w-25 justify-content-center">
            <h1 className="h1 display-1 m-auto"> KardBan </h1>
          </div>
    
          <div className="d-flex col-md-12 shadow-lg m-5 p-5 mb-5 bg-white rounded w-25 justify-content-center">
          <form method="POST" action="http://localhost:5000/login" onSubmit={handleRegister}> 
              <div className="form-group">
                <label for="exampleInputEmail1" className="fw-bold" minlength="8">Email Address / Username</label>
                <input className="form-control" id="exampleInputEmail1" autoComplete="off" placeholder="Enter email/username" onChange={handleUserChange}/>
                
              </div>
              <div className="form-group mt-3">
                <label for="exampleInputPassword1" className="fw-bold">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handlePasswordChange}/>
              </div>
              <br></br>
              <div className="container mt-5 text-center">
              <button type="submit" className=" btn btn-outline-dark">Sign Up</button>
              </div>
              
              
            </form>
          </div>
          </div>
    
          
        </div>
      );
    }
    else if(changingPassword){
      return (
        <div className="App bg-light">
          <div className="d-flex row justify-content-center">
          <div className="d-flex col-md-12 shadow-lg m-5 p-5 mb-5 bg-white rounded w-25 justify-content-center">
            <h1 className="h1 display-1 m-auto"> KardBan </h1>
          </div>
    
          <div className="d-flex col-md-12 shadow-lg m-5 p-5 mb-5 bg-white rounded w-25 justify-content-center">
          <form method="POST" action="http://localhost:5000/login" onSubmit={handleChangePassword}> 
              <div className="form-group">
                <label for="exampleInputEmail1" className="fw-bold">Email Address / Username</label>
                <input className="form-control" id="exampleInputEmail1" autoComplete="off" placeholder="Enter email/username" onChange={handleUserChange}/> 
              </div>

              <div className="form-group mt-3">
                <label for="exampleInputPassword1" className="fw-bold">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handlePasswordChange}/>
              </div>

              <div className="form-group mt-3">
                <label for="exampleInputPassword1" className="fw-bold">New Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handleNewPassword}/>
              </div>

              <br></br>
              <div className="container mt-5 text-center">
              <button type="submit" className=" btn btn-outline-dark" onSubmit={handleChangePassword}>Change password</button>
              </div>
              
              
            </form>
          </div>
          </div>
    
          
        </div>
      );
    }
    return (
        <div className="App bg-light">
          <div className="d-flex row justify-content-center">
          <div className="d-flex col-md-12 shadow-lg m-5 p-5 mb-5 bg-white rounded w-25 justify-content-center">
            <h1 className="h1 display-1 m-auto"> KardBan </h1>
          </div>
    
          <div className="d-flex col-md-12 shadow-lg m-5 p-5 mb-5 bg-white rounded w-25 justify-content-center">
          <form method="POST" action="http://localhost:5000/login" onSubmit={handleLogIn}> 
              <div className="form-group">
                <label for="exampleInputEmail1" className="fw-bold">Email Address / Username</label>
                <input className="form-control" id="exampleInputEmail1" autoComplete="off" placeholder="Enter email/username" onChange={handleUserChange}/>
                
              </div>
              <div className="form-group mt-3">
                <label for="exampleInputPassword1" className="fw-bold">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handlePasswordChange}/>
                <br></br>
                <small id="emailHelp" className="form-text text-muted"> <a onClick={registerPage}>Sign Up</a> | <a onClick={changePasswordPage}> Forgot your password? </a> </small>
              </div>
              <div className="container mt-5 text-center">
              <button type="submit" className=" btn btn-outline-dark">Sign In</button>
              </div>
              
              
            </form>
          </div>
          </div>
    
          
        </div>
      );
}

const Register = () => {

}

const Login = () => {
  
}
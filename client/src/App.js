import React, { useState } from 'react';
const axios = require('axios').default;

function App() {

  // USER CREDENTIALS
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({username: "", password: ""});

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
    axios.post('http://localhost:5000/login/', {username: username, password: password})
    .then((res) => {
      console.log(res.data);
    })
    .catch((res) => {
      console.log("User doesn't exist")
    })
    e.preventDefault();
  }

  const handleRegister = async (e) => {
    
    axios.post('http://localhost:5000/register/', {username: username, password: password})
    .then((res)=>{
      console.log(res)
    })
    e.preventDefault();
  }


  return (
    <div className="App">
      <form method="POST" action="http://localhost:5000/login" onSubmit={handleLogIn}> 
        <label> Username </label>
        <input type="text" onChange={handleUserChange} autoComplete="off" required name="username" placeholder="Enter username here..." />

        <br />

        <label> Password </label>
        <input type="password" onChange={handlePasswordChange} required name="password" placeholder="Enter password here..." />

        <br />
        <input type="submit"/>
      </form>

      <button onClick={handleRegister}> Register </button>
      <br>
      </br>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
const axios = require('axios').default;

export const Login = () => {

    const [ username, setUsername ] = useState('');

    const [ password, setPassword ] = useState('');

    const handleUserChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        axios.post('localhost:5000/user/login', 
        {
            username: username,
            password: password
        })
        .then(
            (res) =>{
                console.log(res.data)
            }
        )
        .catch(
            (err) => {console.log(err)}
        )
        e.preventDefault();
    }

    return (
        <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 col-xl-4">
            <div className="card mb-5" style={{paddingBottom: '30%', paddingTop: '10%'}}>
              <div className="card-body d-flex flex-column align-items-center">
                <form className="text-center" method="post">
                  <div className="mb-3"><input className="form-control" name="email" placeholder="Username" onChange={handleUserChange}/></div>
                  <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password" onChange={handlePasswordChange}/></div>
                  <div className="mb-3"><button className="btn btn-dark d-block w-100" type="submit" onSubmit={handleSubmit}>Sign in</button></div>
                  <p className="text-muted">Forgot your password?</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
};

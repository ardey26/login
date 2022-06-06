import React, { useState } from 'react';

import { Login } from './components/login';
import { Register } from './components/register';

function App() {

  const loginPicture = require("./assets/images/login.jpg")

  const [blur, setBlur] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const toggleBlur = () => {
    const toggledBlur = !blur;
    setBlur(toggledBlur);

    if(blur){
      document.body.style.opacity = 0.5;
    }

    else{
      document.body.style.opacity = 1;
    }
    
  }
  
  const handleLogin = () =>{
    
    toggleBlur();
    setShowRegister(false); 
    setShowLogin(!showLogin);

  }

  const handleRegister = () =>{
    
    toggleBlur();
    setShowLogin(false);
    setShowRegister(!showRegister);
    
  }
  return (
    <div className="App">
      { showLogin ? <Login /> : null}
      { showRegister ? <Register /> : null}
      <div className="row" style={{margin: '5%', borderStyle: 'solid', borderColor: 'rgb(52,58,64)'}}>
        <div className="col-lg-8 col-xl-9 col-xxl-8 offset-0 offset-xxl-0" style={{background: 'var(--bs-gray-dark)', padding: '15%', margin: '0px'}}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 style={{textAlign: 'center', fontWeight: 'bold', color: '#ffffff'}}>KardBan</h1>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row" style={{paddingTop: '5%'}}>
              <div className="col-md-12 col-xxl-4 offset-xxl-2" style={{paddingLeft: '10px'}}><button className="btn btn-outline-light btn-lg" type="button" style={{width: '100%'}} onClick={handleLogin}>Sign in</button></div>
              <div className="col-xxl-4 offset-xxl-0"><button className="btn btn-outline-light btn-lg" type="button" style={{width: '100%', marginRight: '20%'}} onClick={handleRegister}>Sign up</button></div>
            </div>
          </div>
          <div />
          <p />
        </div>
        <div className="col" style={{paddingRight: 0, paddingLeft: 0, background: '#343a40'}}>
          <picture><img className="img-thumbnail" src={loginPicture} style={{height: '100%', padding: 0}} alt="Login"/></picture>
        </div>
      </div>
    </div>
  );
}

export default App;

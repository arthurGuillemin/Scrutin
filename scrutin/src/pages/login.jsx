import React, { useState } from 'react';
import '../assets/css/Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="connection-container">
      <div className="logoPage">Condo</div>
      <div className="connection-form">
      <small>
          Vous n'avez pas encore de compte ? <a href="/createAccount">S'inscrire</a>
        </small>
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input 
              type="email" 
              placeholder="Adresse email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-row">
            <input 
              type="password" 
              placeholder="Mot de passe" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="submit-button">Connexion</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

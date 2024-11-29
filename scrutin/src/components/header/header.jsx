import React from "react";
import "./header.css";
import avatarImage from "../../assets/images/avatar.png";

function Header({ isAuthenticated }) {
  return (
    <header>
      <div>
        <h1 className="logo">Condo</h1>
      </div>
      <nav>
        {isAuthenticated ? (
          <>
            <a href="/accueil">Accueil</a>
            <a href="/creation">Création</a>
            <a href="/scrutins">Liste de scrutin</a>
          </>
        ) : null}
      </nav>
      <div>
        {isAuthenticated ? (
          <a href="/profil">
            <img src={avatarImage} alt="Profil" className="profil-icon" />
          </a>
        ) : (
          <>
            <a href="/connexion" className="connexion">
              Connexion
            </a>
            <a href="/inscription" className="inscription">
              Inscription
            </a>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

import React, { useState, useEffect } from "react";
import "../assets/css/header.css";
import avatarImage from "../assets/images/avatar.png";

function Header({ isAuthenticated }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={isScrolled ? "scrolled" : ""}>
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
            <a href="/login" className="connexion">
              Connexion
            </a>
            <a href="/createAccount" className="inscription">
              Inscription
            </a>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

import { useState, useEffect } from "react";
import "../assets/css/header.css";
import avatarImage from "../assets/images/avatar.png";
import { Link } from "react-router-dom";

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
            <Link href="/accueil">Accueil</Link>
            <Link href="/creation">Création</Link>
            <Link href="/scrutins">Liste de scrutin</Link>
          </>
        ) : null}
      </nav>
      <div>
        {isAuthenticated ? (
          <Link href="/profil">
            <img src={avatarImage} alt="Profil" className="profil-icon" />
          </Link>
        ) : (
          <>
            <Link href="/login" className="connexion">
              Connexion
            </Link>
            <Link href="/createAccount" className="inscription">
              Inscription
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

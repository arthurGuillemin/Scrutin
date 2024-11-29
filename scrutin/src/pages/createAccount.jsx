import React, { useState } from "react";
import '../assets/css/CreateAccount.css'

function CreateAccount() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    console.log(formData);
    alert("Compte créé avec succès !");
  };

  return (
    <div className="create-account-container">
        <h1 className="logo">Condo</h1>

      <form className="create-account-form" onSubmit={handleSubmit}>
      <p>
        Vous disposez déjà d'un compte ? <span class="connection"><a href="/login">Se connecter</a></span>
      </p>
        <h1>Créer un compte</h1>

        <div className="form-row">
          <input
            type="text"
            name="firstName"
            placeholder="Nom"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Prénom"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="date"
          name="birthDate"
          placeholder="Date de naissance"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <small>Votre mot de passe doit contenir au moins 8 caractères.</small>

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmation mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-button">
          Créer mon compte
        </button>
      </form>
    </div>
  );
}

export default CreateAccount;

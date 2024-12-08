import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); 
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== newPasswordConfirmation) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    const data = {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: newPasswordConfirmation,
    };

    try {
      const response = await axios.put(
        "https://notes.devlop.tech/api/update-password",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Mot de passe mis à jour avec succès !");
        setErrorMessage(""); 
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Non autorisé. Veuillez vous connecter à nouveau.");
      } else {
        setErrorMessage("Erreur lors de la mise à jour du mot de passe. Essayez à nouveau.");
      }
      setSuccessMessage(""); 
    }
  };

  const handleCancel = () => {
    navigate("/"); 
  };

  return (
    <div className="UpdatePassword">
      <h2>Mettre à jour le mot de passe</h2>
      <center><img src="bloquer.png" alt="Bloquer" /></center>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="currentPassword">Mot de passe actuel</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">Nouveau mot de passe</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newPasswordConfirmation">Confirmer le nouveau mot de passe</label>
          <input
            type="password"
            id="newPasswordConfirmation"
            value={newPasswordConfirmation}
            onChange={(e) => setNewPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <button type="submit">Mettre à jour</button>
        <button type="button" onClick={handleCancel}>Annuler</button> 
      </form>
    </div>
  );
}

export default UpdatePassword;

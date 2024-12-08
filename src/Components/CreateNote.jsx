import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import UsersList from './UsersList'; 
import './style.css';
function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sharedWith, setSharedWith] = useState([]); 
  const [users, setUsers] = useState([]); 
  const navigate = useNavigate();

  // Fonction pour gérer la sélection d'utilisateurs
  const handleUserSelect = (selectedUsers) => {
    setSharedWith(selectedUsers); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Aucun token trouvé. Redirection vers la page de connexion.");
      navigate("/Login");
      return;
    }

    try {
      const url = `https://notes.devlop.tech/api/notes`;
      await axios.post(
        url,
        { 
          title, 
          content, 
          shared_with: sharedWith.map(user => user.value)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Note créée avec succès.");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la création de la note :", error);
      if (error.response && error.response.status === 401) {
        console.warn("Token invalide ou expiré. Redirection vers la page de connexion.");
        localStorage.removeItem("token");
        navigate("/Login");
      } else if (error.response && error.response.status === 422) {
        console.error("Données invalides envoyées à l'API :", error.response.data);
      }
    }
  };

  // Fonction pour annuler et revenir à la page précédente
  const handleCancel = () => {
    navigate("/"); // Remplacez "/" par la route de votre choix
  };

  return (
    <div className="CreateNote">
      <h1>Créer une nouvelle note</h1>
      <center><img src="ajouter.png" alt="" /></center>
      <form onSubmit={handleSubmit}>
        
          <label >
            Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entrez le titre"
            required
          />
          </label>
        <br />
        
          <label >
            Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Entrez le contenu"
            required
          ></textarea>
          </label>
        <br />
        
        {/* Sélecteur d'utilisateur */}
        <label>
          Partager avec :
          <Select 
            options={users.map(user => ({
              value: user.id, 
              label: `${user.first_name} ${user.last_name}`
            }))} 
            isMulti 
            onChange={handleUserSelect} 
            placeholder="Sélectionnez un ou plusieurs utilisateurs"
          />
        </label>
        
        <br />
        <button type="submit">Créer</button>
        <button type="button" onClick={handleCancel} style={{ marginLeft: "10px" }}>
          Annuler
        </button>
      </form>

      <UsersList onUserSelect={setUsers} />
    </div>
  );
}

export default CreateNote;

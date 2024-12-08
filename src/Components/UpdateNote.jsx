import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import UsersList from './UsersList'; 

function UpdateNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sharedWith, setSharedWith] = useState([]); 
  const [users, setUsers] = useState([]); 
  const token = localStorage.getItem("token");

  const handleUserSelect = (selectedUsers) => {
    setSharedWith(selectedUsers); 
  };
  const fetchNote = async () => {
    try {
      const url = `https://notes.devlop.tech/api/notes/${id}`;
      const resp = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const note = resp.data;
  
      setTitle(note.title);
      setContent(note.content);
  
      // Formatter `shared_with` pour `react-select`
      const formattedSharedWith = note.shared_with.map(user => ({
        value: user.id,
        label: `${user.first_name} ${user.last_name}`,
      }));
      setSharedWith(formattedSharedWith); // Définir les utilisateurs partagés
    } catch (error) {
      console.error("Erreur lors de la récupération de la note :", error);
      if (error.response && error.response.status === 401) {
        navigate("/Login");
      }
    }
  };
  

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      const url = `https://notes.devlop.tech/api/notes/${id}`;
      await axios.put(
        url,
        { title, content,shared_with: sharedWith.map(user => user.value)},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Note mise à jour avec succès !");
      navigate("/"); 
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la note :", error);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <div className="UpdateNote">
      <h1>Modifier la note</h1>
      <center>
        <img src={`${process.env.PUBLIC_URL}/crayon.png`} alt="Icône de crayon" />
      </center>
      <form onSubmit={updateNote}>
        <div>
        <label>
          Partager avec :
          <Select 
            options={users.map(user => ({
              value: user.id, 
              label: `${user.first_name} ${user.last_name}`,
            }))} 
            isMulti 
            onChange={handleUserSelect}
            value={sharedWith}
            placeholder="Sélectionnez un ou plusieurs utilisateurs"
          />
        </label>
          <label>Titre :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contenu :</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Mettre à jour</button>
        <button type="button" onClick={() => navigate("/")}>
          Annuler
        </button>
      </form>
      <UsersList onUserSelect={setUsers} />

    </div>
  );
}

export default UpdateNote;

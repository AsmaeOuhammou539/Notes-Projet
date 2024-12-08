import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function DeleteNote() {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const navigate = useNavigate();

  useEffect(() => {
    const deleteNote = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("Aucun token trouvé. Redirection vers la page de connexion.");
        navigate("/Login");
        return;
      }

      try {
        const url = `https://notes.devlop.tech/api/notes/${id}`;
        await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(`Note avec l'ID ${id} supprimée avec succès.`);
        navigate("/"); // Redirection vers la liste des notes après la suppression
      } catch (error) {
        console.error("Erreur lors de la suppression de la note :", error);
        if (error.response && error.response.status === 401) {
          console.warn("Token invalide ou expiré. Redirection vers la page de connexion.");
          localStorage.removeItem("token");
          navigate("/Login");
        }
      }
    };

    deleteNote();
  }, [id, navigate]);

  return (
    <div>
      <p>Suppression de la note en cours...</p>
    </div>
  );
}

export default DeleteNote;

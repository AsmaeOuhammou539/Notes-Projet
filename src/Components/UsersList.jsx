import axios from "axios";
import { useEffect } from "react";

function UsersList({ onUserSelect }) {
  const token = localStorage.getItem("token");

  // Charger les utilisateurs
  const fetchUsers = async () => {
    try {
      const url = `https://notes.devlop.tech/api/users`;
      const resp = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onUserSelect(resp.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return null;
}

export default UsersList;
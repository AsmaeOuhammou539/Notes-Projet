import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Logout() {
    const navigate = useNavigate(); 

    useEffect(() => {
        const logoutUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const url = `https://notes.devlop.tech/api/logout`;
                    await axios.post(url, {}, { 
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    localStorage.removeItem("token");
                } catch (error) {
                    console.error("Erreur lors de la déconnexion :", error);
                }
            }
            navigate("/login");
        };

        logoutUser();
    }, [navigate]); 

    return null;
}

export default Logout;
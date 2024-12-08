import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './style.css';

function NotesList({ userName }) {
    const [notes, setNotes] = useState([]); 
    const [filteredNotes, setFilteredNotes] = useState([]); 
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const getNotes = async () => {
        const url = `https://notes.devlop.tech/api/notes`;
        try {
            const resp = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNotes(resp.data);
            setFilteredNotes(resp.data); 
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Token invalide ou expiré, redirection vers la page de connexion.");
                localStorage.removeItem("token");
                navigate('/Login');
            } else {
                console.error("Erreur lors de la récupération des notes:", error);
            }
        }
    };

    // Affiche toutes les notes
    const showAllNotes = () => {
        setFilteredNotes(notes); 
    };

    // Affiche seulement les notes où is_owner est faux
    const showOwnerNotes = () => {
        const ownerNotes = notes.filter(note => note.is_owner === false);
        setFilteredNotes(ownerNotes); 
    };

    // Fonction de recherche
    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        if (searchTerm === "") {
            setFilteredNotes(notes);
        } else {
            setFilteredNotes(
                notes.filter(
                    (note) =>
                        note.title.toLowerCase().includes(searchTerm) ||
                        note.content.toLowerCase().includes(searchTerm)
                )
            );
        }
    };

    useEffect(() => {
        getNotes();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${month} ${day}, ${hours}:${minutes}`;
    };

    return (
        <div className="NotesList">
            <header>
                <h1>Bienvenue, {userName || "Invité"}!</h1>
                <button className="nav-button">
                    <Link to="/Logout">
                        <img src="logout.png" alt="Logout" className="btn-icone" />
                    </Link>
                </button>
                <button className="nav-button">
                    <Link to="/UpdatePassword">
                        <img src="pass.png" alt="Logout" className="btn-icone" />
                    </Link>
                </button>
                <div className="part">
                    <button className="nav-button">
                        <Link to="/CreateNote">
                            <img src="add.png" alt="Add Note" className="btn-icone" />
                        </Link>
                    </button>
                    <button onClick={showAllNotes}>
                        <img src="tout.png" alt="Afficher tout" />
                    </button>
                    <button onClick={showOwnerNotes}>
                        <img src="owner.png" alt="Mes notes" />
                    </button>
                </div>
                <div className="search-container">
                    <img src="chercher.png" alt="Search" className="btn-icone" />
                    <input
                        type="text"
                        placeholder="Search notes..."
                        onChange={handleSearch}
                    />
                </div>
            </header>
            <div className="notes">
                {filteredNotes.length > 0 ? (
                    filteredNotes.map((note) => (
                        <div key={note.id} className="note">
                            <div className="head">
                                <p>{formatDate(note.date)}</p>
                                <button className='btn-icone'>
                                    <Link to={`/DeleteNote/${note.id}`}><img src="delete.png" alt="Supprimer" width={18} /></Link>
                                </button>
                                <button className='btn-icone'>
                                    <Link to={`/UpdateNote/${note.id}`}><img src="pencil.png" alt="Modifier" width={16} /></Link>
                                </button>
                            </div>
                            <p className='title'>{note.title}</p>
                            <p>{note.content}</p>
                            <div className="shared-with">
                                {note.shared_with.map(item => (
                                    <span key={item.id}>
                                        {item.first_name[0]}{item.last_name[0]}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucune note trouvée...</p>
                )}
            </div>
        </div>
    );
}

export default NotesList;

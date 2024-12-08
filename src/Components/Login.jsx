// import './login.css';
import './style.css';

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUserName }) {
    const [cin, setCin] = useState("JK53222");
    const [password, setPassword] = useState("111111");
    const navigate = useNavigate();

    const onButtonClick = async (e) => {
        e.preventDefault();
        const url = `https://notes.devlop.tech/api/login`;
        try {
            const resp = await axios.post(url, { cin, password });
            const token = resp.data.token;
            setUserName(resp.data.user.first_name);
            localStorage.setItem('token', token);
            navigate('/'); // Redirection vers la page principale après un login réussi
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
        }
    };

    return (
        <div className="Login">
            {/* Formulaire */}
            <div className="formulaire">
                <form id="formulaire">
                    <h1>Welcome</h1>
                    <p>Sign in to your account</p>
                    <div className="inputs">
                        <input 
                            className="inp" 
                            value={cin} 
                            onChange={e => setCin(e.target.value)} 
                            type="text" 
                            placeholder="CIN" 
                        />
                        <br />
                        <input 
                            className="inp" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            type="password" 
                            placeholder="Password" 
                        />
                        <br />
                        <button id="btn" onClick={onButtonClick}><center>Login</center></button>
                    </div>
                </form>
            </div>
    
            {/* Cartes */}
            <div class="cards ">
                <div class="card card1">
                    <div class="card-inner">
                        <div class="card-front">
                            <p>"Gérez efficacement vos notes."</p>
                        </div>
                        <div class="card-back">
                            <img src="im1.png" alt="h" />
                        </div>
                    </div>
                </div>

                <div class="card card2">
                    <div class="card-inner">
                        <div class="card-front">
                            <p>"Un espace pour vos notes, toujours à portée de main".</p>
                        </div>
                        <div class="card-back">
                            <img src="im2.png" alt="h" />
                        </div>
                    </div>
                </div>

                <div class="card card3">
                    <div class="card-inner">
                        <div class="card-front">
                            <p>"Capturez vos idées avant qu'elles ne s'échappent".</p>
                        </div>
                        <div class="card-back">
                            <img src="im1.png" alt="h" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    );
}

export default Login;
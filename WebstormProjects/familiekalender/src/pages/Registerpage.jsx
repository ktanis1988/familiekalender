import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registerpage.css";

function Registerpage() {
    const navigate = useNavigate();

    console.log("API Key:", import.meta.env.VITE_API_KEY);
    console.log("API URL:", import.meta.env.VITE_API_URL);

    const [naam, setNaam] = useState("");
    const [gezinsnaam, setGezinsnaam] = useState("");
    const [email, setEmail] = useState("");
    const [wachtwoord, setWachtwoord] = useState("");

    const [error, setError] = useState("");

    async function handleRegisteren(e) {
        e.preventDefault();
        console.log("Registreren knop geklikt");

        if (!naam || !gezinsnaam || !email || !wachtwoord) {
            setError("Vul alle velden in!");
            console.log("Error: niet alles ingevuld");
            return;
        }

        if (wachtwoord.length < 6){
            setError("Wachtwoord moet minimaal 6 tekens zijn!");
            console.log("Error: wachtwoord te kort");
            return
        }

        console.log("Formulier data:", {
            naam: naam,
            gezinsnaam: gezinsnaam,
            email: email,
            wachtwoord: wachtwoord,
        });

        console.log("Bezig met registreren via API...");

        const apiUrl = `${import.meta.env.VITE_API_URL}/api/users`;
        console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'novi-education-project-id': import.meta.env.VITE_API_KEY,
            },

            body: JSON.stringify({
                username: naam,
                email: email,
                password: wachtwoord,
                familyName: gezinsnaam,
            }),
        });

        const data = await response.json();
        console.log("Response van API:", data);

        if (response.ok) {
            console.log("Registratie gelukt!");
            setError("");
            navigate('/');
        } else {
            console.log("Registratie mislukt:", data);
            setError("Er ging iets mis bij het registreren");
        }
    }

    function gaNaarInloggen(){
        console.log("Terug naar inloggen");
        navigate('/');
    }

    return (
        <div className="registerpage-container">
            <h1>Maak een gezinsaccount aan!!</h1>
            <p>Organiseer alles samen!!</p>

            <form className="register-form-container" onSubmit={handleRegisteren}>

                {error && <p className="error-message">{error}</p>}


                <label htmlFor="name">Naam:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Naam:"
                    value={naam}
                    onChange={ (e) => setNaam(e.target.value)}
                />

                <label htmlFor="familyname">Gezinsnaam:</label>
                <input
                    type="text"
                    id="familyname"
                    name="familyname"
                    placeholder="Gezinsnaam:"
                    value={gezinsnaam}
                    onChange={ (e) => setGezinsnaam(e.target.value)}
                />

                <label htmlFor="email">E-mailadres:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-mailadres:"
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Wachtwoord:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Wachtwoord:"
                    value={wachtwoord}
                    onChange={ (e) => setWachtwoord(e.target.value)}
                />

                <button type="submit" className="button primary">Account aanmaken</button>

                <p className="login-link">Heb je al een account? Klik hier om in te loggen</p>

                <button type="button" className="button secondary" onClick={gaNaarInloggen}>Inloggen</button>
            </form>
        </div>
    );
}

export default Registerpage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

function Homepage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [wachtwoord, setWachtwoord] = useState("");

    const [error, setError] = useState("");

    function handleInloggen(e) {
        e.preventDefault();
        console.log("Inloggen knop geklikt");

        if (!email || !wachtwoord) {
            setError("Vul beide velden in!")
            console.log("Error: niet alles ingevuld");
            return;
        }

        if (wachtwoord.length < 6) {
            setError("Wachtwoord moet minimaal 6 tekens lang zijn!");
            console.log("Error: wachtwoord te kort");
            return;
        }

        console.log("Inlog data:", {
            email: email,
            wachtwoord: wachtwoord
        });

        setError("");

        navigate('/calendar');
    }

    function gaNaarRegistreren() {
        console.log("Registreren knop geklikt");
        navigate('/register');
    }

    function wachtwoordVergeten () {
        console.log("Wachtwoord vergeten geklikt")
        /* Pagina maken voor wachtwoord reset */
        alert("Deze functie maak ik later!");
    }

    return (
        <div className="homepage-container">
            <h1>Welkom bij de Familiekalender!</h1>
            <p>Log in voor je persoonlijke omgeving!</p>

            <form onSubmit={handleInloggen}>

                {error && <p className="error-message">{error}</p>}

                <label htmlFor="email">E-mailadres:</label><br />
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Voer je e-mailadres in"
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                /><br /><br />

                <label htmlFor="password">Wachtwoord:</label><br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Voer je wachtwoord in"
                    value={wachtwoord}
                    onChange={ (e) => setWachtwoord(e.target.value)}
                /><br /><br />

                <button type="submit">Inloggen</button><br />
                <button type="button" onClick={gaNaarRegistreren}>Registreren</button><br />
                <button type="button" onClick={wachtwoordVergeten}>Wachtwoord vergeten?</button><br />
            </form>
        </div>
    );
}

export default Homepage;
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

function Homepage() {
    const navigate = useNavigate();

    function handleInloggen(e) {
        e.preventDefault();
        console.log("Inloggen knop geklikt");

        /* Later echte inlogcheck maken */
        navigate('/Calendar');
    }

    function gaNaarRegistreren() {
        console.log("Registreren knop geklikt");
        navigate('/Register');
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
                <label htmlFor="email">E-mailadres:</label><br />
                <input type="email" id="email" name="email" placeholder="Voer je e-mailadres in" /><br /><br />

                <label htmlFor="password">Wachtwoord:</label><br />
                <input type="password" id="password" name="password" placeholder="Voer je wachtwoord in" /><br /><br />

                <button type="submit">Inloggen</button><br />
                <button type="button" onClick={gaNaarRegistreren}>Registreren</button><br />
                <button type="button" onClick={wachtwoordVergeten}>Wachtwoord vergeten?</button><br />
            </form>
        </div>
    );
}

export default Homepage;
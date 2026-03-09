import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

function Homepage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [wachtwoord, setWachtwoord] = useState("");
    const [error, setError] = useState("");

    async function handleInloggen(e) {
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

        console.log("Bezig met inloggen via API...");

        const apiUrl = `${import.meta.env.VITE_API_URL}/api/login`;
        console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'novi-education-project-id': import.meta.env.VITE_API_KEY,
            },
            body: JSON.stringify({
                email: email,
                password: wachtwoord,
            }),
        });

        const data = await response.json();
        console.log("Response van API:", data);

        if (response.ok) {
            console.log("Inloggen gelukt!");

            localStorage.setItem('token', data.token);

            const tokenParts = data.token.split('.');
            const tokenData = JSON.parse(atob(tokenParts[1]));
            const userId = tokenData.userId;

            console.log("Ophalen volledige user data voor userId:", userId);

            const userResponse = await fetch(
                `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'novi-education-project-id': import.meta.env.VITE_API_KEY,
                        'Authorization': `Bearer ${data.token}`
                    }
                }

            );

            const userData = await userResponse.json();
            console.log("Volledige user data:", userData);

            const savedFamilyName= localStorage.getItem('familyName_' + email);

            if (savedFamilyName) {
                console.log("Gezinsnaam gevonden:", savedFamilyName);
                userData.familyName = savedFamilyName;
            } else {
                console.log("Geen gezinsnaam gevonden");
                userData.familyName= "Onbekend";
            }

            localStorage.setItem('user', JSON.stringify(userData));

            setError("");
            navigate('/calendar');
        } else {
            console.log("Inloggen mislukt:", data);
            setError("Onjuiste inloggevens!");
        }
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
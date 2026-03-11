import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Homepage.css";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import Message from "../components/Message";

function Homepage() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

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

        try {
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

            if (!response.ok) {
                console.log("Inloggen mislukt:", data);
                setError("Onjuiste inloggegevens!");
                return;
            }

            console.log("Inloggen gelukt!");

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
                    },
                });

            const userData = await userResponse.json();
            console.log("Volledige user data:", userData);

            const savedFamilyName = localStorage.getItem('familyName_' + email);

            if (savedFamilyName) {
                console.log("Gezinsnaam gevonden in localStorage:", savedFamilyName);
                userData.familyName = savedFamilyName;
            } else if (userData.familyName) {
                console.log("Gezinsnaam komt uit API:", userData.familyName);
            } else {
                console.log("Geen gezinsnaam gevonden, fallback naar Onbekend");
                userData.familyName = "Onbekend";
            }

            login(data.token, userData);

            setError("");
            navigate("/calendar");
        } catch (err) {
            console.error("Error tijdens inloggen:", err);
            setError("Er ging iets mis bij het inloggen");
        }
    }

    function gaNaarRegistreren() {
        console.log("Registreren knop geklikt");
        navigate('/register');
    }

    function wachtwoordVergeten () {
        console.log("Wachtwoord vergeten geklikt")
        alert("Deze functie maak ik later!");
    }

    return (
        <div className="homepage-container">
            <h1>Welkom bij de Familiekalender!</h1>
            <p>Log in voor je persoonlijke omgeving!</p>

            <form className="form-container" onSubmit={handleInloggen}>
                <Message type="error">{error}</Message>

                <FormInput
                    label="E-mailadres:"
                    id="email"
                    type="email"
                    placeholder="Voer je e-mailadres in"
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                />

                <FormInput
                    label="Wachtwoord:"
                    id="password"
                    name="password"
                    placeholder="Voer je wachtwoord in"
                    value={wachtwoord}
                    onChange={ (e) => setWachtwoord(e.target.value)}
                />

                <Button type="submit" variant="primary">Inloggen</Button>
                <Button type="button" variant="secondary" onClick={gaNaarRegistreren}>Registreren</Button>
            </form>
        </div>
    );
}

export default Homepage;
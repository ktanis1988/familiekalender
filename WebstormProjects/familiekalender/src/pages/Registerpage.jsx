import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registerpage.css";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import Message from "../components/Message";

function Registerpage() {
    const navigate = useNavigate();

    const [naam, setNaam] = useState("");
    const [gezinsnaam, setGezinsnaam] = useState("");
    const [email, setEmail] = useState("");
    const [wachtwoord, setWachtwoord] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleRegisteren(e) {
        e.preventDefault();
        console.log("Registreren knop geklikt");

        if (!naam || !gezinsnaam || !email || !wachtwoord) {
            setError("Vul alle velden in!");
            console.log("Error: niet alles ingevuld");
            return;
        }

        if (wachtwoord.length < 6) {
            setError("Wachtwoord moet minimaal 6 tekens zijn!");
            console.log("Error: wachtwoord te kort");
            return
        }

        setIsLoading(true);
        setError("");

        try {
            console.log("STAP 1: Registeren via API...");
            const registerUrl = `${import.meta.env.VITE_API_URL}/api/users`;
            console.log("Register URL:", registerUrl);

            const registerResponse = await fetch(registerUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "novi-education-project-id": import.meta.env.VITE_API_KEY,
                },
                body: JSON.stringify({
                    username: naam,
                    email: email,
                    password: wachtwoord,
                    familyName: gezinsnaam,
                    roles: ["ROLE_USER"],
                }),
            });

            const registerData = await registerResponse.json();
            console.log("Registratie response:", registerData);

            if (!registerResponse.ok) {
                throw new Error(registerData.message || "Registratie mislukt");
            }

            console.log("Registratie gelukt!");

            localStorage.setItem('familyName_' + email, gezinsnaam);
            console.log("Gezinsnaam opgeslagen voor:", email);

            navigate("/");
        } catch (error) {
        console.error("Error tijdens registratie:", error);
        setError(error.message || "Er ging iets mis bij het registreren");
        } finally {
            setIsLoading(false);
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

                <Message type="error">{error}</Message>

                <FormInput
                    label="Naam:"
                    id="name"
                    type="text"
                    placeholder="Naam:"
                    value={naam}
                    onChange={ (e) => setNaam(e.target.value)}
                />

                <FormInput
                    label="Gezinsnaam:"
                    id="familyname"
                    type="text"
                    placeholder="Gezinsnaam:"
                    value={gezinsnaam}
                    onChange={ (e) => setGezinsnaam(e.target.value)}
                />

                <FormInput
                    label="E-mailadres:"
                    id="email"
                    type="email"
                    placeholder="E-mailadres:"
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                />

                <FormInput
                    label="Wachtwoord:"
                    id="password"
                    type="password"
                    placeholder="Wachtwoord:"
                    value={wachtwoord}
                    onChange={ (e) => setWachtwoord(e.target.value)}
                />

                <Button type="submit" variant="primary" disabled={isLoading}> {isLoading ? "Bezig met aanmaken..." : "Account aanmaken"}
                </Button>

                <p className="login-link" onClick={gaNaarInloggen}>Heb je al een account? Klik hier om in te loggen</p>

                <Button type="button" variant="secondary" onClick={gaNaarInloggen} disabled={isLoading}
                >Inloggen</Button>
            </form>
        </div>
    );
}

export default Registerpage;

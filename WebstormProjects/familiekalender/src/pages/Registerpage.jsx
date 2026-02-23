import React from "react";
import "./Registerpage.css";

function Registerpage() {
    return (
        <div className="registerpage-container">
            <h1>Maak een gezinsaccount aan!!</h1>
            <p>Organiseer alles samen!!</p>

            <form className="register-form-container">
                <label htmlFor="name">Naam:</label>
                <input type="text" id="name" name="name" placeholder="Naam:" />

                <label htmlFor="familyname">Gezinsnaam:</label>
                <input type="text" id="familyname" name="familyname" placeholder="Gezinsnaam:" />

                <label htmlFor="email">E-mailadres:</label>
                <input type="email" id="email" name="email" placeholder="E-mailadres:" />

                <label htmlFor="password">Wachtwoord:</label>
                <input type="password" id="password" name="password" placeholder="Wachtwoord:" />

                <button type="submit" className="button primary">Account aanmaken</button>

                <p className="login-link">Heb je al een account? Klik hier om in te loggen</p>

                <button type="button" className="button secondary">Inloggen</button>
            </form>
        </div>
    );
}

export default Registerpage;


import React from "react";

function Homepage() {
    return (
        <div>
            <h1>Welkom bij de Familiekalender!</h1>
            <p>Log in voor je persoonlijke omgeving!</p>

            <form>
                <label htmlFor="email">E-mailadres:</label><br />
                <input type="email" id="email" name="email" placeholder="Voer je e-mailadres in" /><br /><br />

                <label htmlFor="password">Wachtwoord:</label><br />
                <input type="password" id="password" name="password" placeholder="Voer je wachtwoord in" /><br /><br />

                <button type="submit">Inloggen</button><br />
                <button type="button">Registreren</button><br />
                <button type="button">Wachtwoord vergeten?</button><br />
            </form>
        </div>
    );
}

export default Homepage;
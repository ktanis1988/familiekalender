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
            </form>
        </div>
    )
}
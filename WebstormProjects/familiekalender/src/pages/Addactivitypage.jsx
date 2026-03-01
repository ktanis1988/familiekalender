import React from "react";
import { useNavigate } from "react-router-dom";
import "./Addactivitypage.css";

function Addactivitypage() {
    const navigate = useNavigate();

    function gaTerug() {
        console.log("Terug knop geklikt");
        navigate('/calendar');
    }

    function handleOpslaan(e) {
        e.preventDefault();
        console.log("Opslaan knop geklikt");
        /* later toe te voegen */
        navigate('/calendar');
    }

    function handleAnnuleren() {
        console.log("Annuleren knop geklikt");
        navigate('/calendar');
    }

    return (
        <div className="addactivity-container">
            <header className="addactivity-header">
                <button className="back-button"onClick={gaTerug}>Vorige</button>
                <h1>Activiteit toevoegen</h1>
            </header>

            <form className="addactivity-form" onSubmit={handleOpslaan}>
                <div className="form-field">
                    <label>Titel</label>
                    <input type="text" placeholder="Naam activiteit" />
                </div>

                <div className="form-field">
                    <label>Data</label>
                    <input type="date" placeholder="Datum activiteit" />
                </div>

                <div className="form-field">
                    <label>Tijd</label>
                    <input type="time" placeholder="Tijd activiteit" />
                </div>

                <div className="form-field">
                    <label>Categorie</label>
                    <input type="text" placeholder='"werk", "school", "etcetera"' />
                </div>

                <div className="form-field">
                    <label>Toewijzen</label>
                    <input type="text" placeholder="persoon selectie" />
                </div>

                <button type="submit" className="submit-button">Opslaan</button>
                <button type="button" className="cancel-button" onClick={handleAnnuleren}>Annuleren</button>
            </form>
        </div>
    );
}

export default Addactivitypage;

import React from "react";
import ".Addactivitypage.css";

function Addactivitypage() {
    return (
        <div className="addactivity-container">
            <header className="addactivity-header">
                <button className="back-button"></button>
                <h1>Activiteit toevoegen</h1>
            </header>

            <form className="addactivity-form">
                <div className="form-field">
                    <label>Titel</label>
                    <input type="text" placeholder="Naam activiteit" />
                </div>

                <div className="form-field">
                    <label>Data</label>
                    <input type="text" placeholder="Datum activiteit" />
                </div>

                <div className="form-field">
                    <label>Tijd</label>
                    <input type="text" placeholder="Tijd activiteit" />
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
                <button type="button" className="cancel-button">Annuleren</button>
            </form>
        </div>
    );
}

export default Addactivitypage;

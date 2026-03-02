import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Addactivitypage.css";

function Addactivitypage() {
    const navigate = useNavigate();

    const [titel, setTitel] = useState("");
    const [datum, setDatum] = useState("");
    const [tijd, setTijd] = useState("");
    const [categorie, setCategorie] = useState("");
    const [persoon, setPersoon] = useState("");

    const [error, setError] = useState("");

    function gaTerug() {
        console.log("Terug knop geklikt");
        navigate('/calendar');
    }

    function handleOpslaan(e) {
        e.preventDefault();
        console.log("Opslaan knop geklikt");

        if (!titel || !datum || !tijd) {
            setError("Vul minimaal titel, datum en tijd in!");
            console.log("Error: verplichte velden niet ingevuld");
            return;
        }

        console.log("Activiteit data:", {
            titel: titel,
            datum: datum,
            tijd: tijd,
            categorie: categorie,
            persoon: persoon,
        });

        setError("");

        navigate('/calendar');
    }

    function handleAnnuleren() {
        console.log("Annuleren knop geklikt");
        navigate('/calendar');
    }

    return (
        <div className="addactivity-container">
            <header className="addactivity-header">
                <button className="back-button" onClick={gaTerug}>Vorige</button>
                <h1>Activiteit toevoegen</h1>
            </header>

            <form className="addactivity-form" onSubmit={handleOpslaan}>

                {error && <p className="error-message">{error}</p>}


                <div className="form-field">
                    <label>Titel *</label>
                    <input
                        type="text"
                        placeholder="Naam activiteit"
                        value={titel}
                        onChange={ (e) => setTitel(e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label>Datum *</label>
                    <input
                        type="date"
                        value={datum}
                        onChange={ (e) => setDatum(e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label>Tijd *</label>
                    <input
                        type="time"
                        value={tijd}
                        onChange={ (e) => setTijd(e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label>Categorie</label>
                    <input
                        type="text"
                        placeholder='"werk", "school", "etcetera"'
                        value={categorie}
                        onChange={ (e) => setCategorie(e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label>Toewijzen</label>
                    <input
                        type="text"
                        placeholder="persoon selectie"
                        value={persoon}
                        onChange={(e) => setPersoon(e.target.value)}
                    />
                </div>

                <button type="submit" className="submit-button">Opslaan</button>
                <button type="button" className="cancel-button" onClick={handleAnnuleren}>Annuleren</button>
            </form>
        </div>
    );
}

export default Addactivitypage;

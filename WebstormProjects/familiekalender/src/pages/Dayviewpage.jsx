import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dayviewpage.css";

function Dayviewpage() {
    const navigate = useNavigate();

    function gaTerug() {
        console.log("Terug naar de kalender");
        navigate('/calendar');
    }

    function vorigeDag() {
        console.log("Vorige dag knop geklikt")
        /* later toe te voegen */
    }

    function volgendeDag() {
        console.log("Volgende dag knop geklikt");
        /* later toe te voegen */
    }

    function gaNaarToevoegen() {
        console.log("Nieuwe activiteit toevoegen");
        navigate('/addactivity');
    }

    function handleOpslaan() {
        console.log("Opslaan knop geklikt");
        /* later toe te voegen */
    }

    return (
        <div className="dayview-container">
            <header className="dayview-header">
                <button className="nav-arrow left" onClick={vorigeDag}>Vorige</button>
                <h1>Dinsdag 12 Januari 2026</h1>
                <button className="nav-arrow right" onClick={volgendeDag}>Volgende</button>
            </header>

            <div className="timeslots">
                <div className="timeslot">
                <div className="time">00:00 t/m 03:00</div>
                <div className="activity">Titel Activiteit</div>
            </div>

            <div className="timeslot">
                <div className="time">03:00 t/m 06:00</div>
                <div className="activity">Titel Activiteit</div>
            </div>

            <div className="timeslot">
                <div className="time">06:00 t/m 09:00</div>
                <div className="activity">Titel Activiteit</div>
            </div>

            <div className="timeslot">
                <div className="time">09:00 t/m 12:00</div>
                <div className="activity">Titel Activiteit</div>
            </div>

            <div className="timeslot">
                <div className="time">12:00 t/m 15:00</div>
                <div className="activity">Titel Activiteit</div>
            </div>

            <div className="timeslot">
                <div className="time">15:00 t/m 18:00</div>
                <div className="activity">Titel Activiteit</div>
            </div>

            <div className="timeslot">
                <div className="time">18:00 t/m 21:00</div>
                <div className="activity">Titel Activiteit</div>
            </div>

            <div className="timeslot">
                <div className="time">21:00 t/m 00:00</div>
                <div className="activity">Titel Activiteit</div>
            </div>
            </div>

        <button className="save-button" onClick={handleOpslaan}>Opslaan</button>
        <button className="add-button" onClick={gaNaarToevoegen}>+</button>
        </div>
    );
}

export default Dayviewpage;


import React from "react";
import { useNavigate } from "react-router-dom";
import "./Calendarpage.css";

function Calendarpage () {
    const navigate = useNavigate();

    function gaNaarActiviteitToevoegen() {
        console.log("Plus knop geklikt");
        navigate('/addactivity');
    }

    function gaNaarDagweergave() {
        console.log("Dag geklikt");
        navigate('/dayview');
    }

    function vorigeWeek() {
        console.log("Vorige week knop geklikt");
        /* later toe te voegen  */
    }

    function volgendeWeek() {
        console.log("Volgende week knop geklikt");
        /* later toe te voegen */
    }

    return (
        <div className="calendar-container">
            <header className="calendar-header">
                <button className="nav-button left" onClick={vorigeWeek}>Vorige</button>
                <h1>Gezinskalender</h1>
                <button className="nav-button right" onClick={volgendeWeek}>Volgende</button>
            </header>

            <div className="calendar-grid">
                <div className="day-header">Maandag</div>
                <div className="day-header">Dinsdag</div>
                <div className="day-header">Woensdag</div>
                <div className="day-header">Donderdag</div>
                <div className="day-header">Vrijdag</div>
                <div className="day-header">Zaterdag</div>
                <div className="day-header">Zondag</div>

                {Array.from({ length: 35}).map((_, index) => (
                        <div key={index} className="calendar-cell" onClick={gaNaarDagweergave}>{/*later toe te voegen*/}</div>
                    ) ) }
            </div>

            <button className="add-button" onClick={gaNaarActiviteitToevoegen}>+</button>
        </div>
    );
}

export default Calendarpage;
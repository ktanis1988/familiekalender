import React from "react";
import ".Calendarpage.css";

function Calendarpage () {
    return (
        <div className="calender-containter">
            <header className="calendar-header">
                <button className="nav-button left"></button>
                <h1>Gezinskalender</h1>
                <button className="nav-button right"></button>
            </header>

            <div className="calender-grid">
                <div className="day-header">Maandag</div>
                <div className="day-header">Dinsdag</div>
                <div className="day-header">Woensdag</div>
                <div className="day-header">Donderdag</div>
                <div className="day-header">Vrijdag</div>
                <div className="day-header">Zaterdag</div>
                <div className="day-header">Zondag</div>

                {Array.from({ length: 365}).map((_, index) => (
                        <div key={index} className="calender-cell"></div>
                    ) ) }
            </div>

            <button className="add-button">+</button>
        </div>
    );
}

export default Calendarpage;
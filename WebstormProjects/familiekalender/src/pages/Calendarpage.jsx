import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Calendarpage.css";

function Calendarpage () {
    const navigate = useNavigate();

    const [activities, setActivities] = useState ([]);
    const [isLoading, setIsLoading] = useState (true);
    const [error, setError] = useState ("");

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        async function fetchActivities(){
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));

            if (!token || !user) {
                setError("Je moet ingelogd zijn!");
                setIsLoading(false);
                return;
            }

            try {
                console.log("Bezig met ophalen activiteiten...");

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/activities`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'novi-education-project-id': import.meta.env.VITE_API_KEY,
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Kon geen activiteiten ophalen");
                }

                const data = await response.json();
                console.log("Activiteiten opgehaald:", data);

                const myActivities = data.filter(
                    activity => activity.familyName === user.familyName
                );

                setActivities(myActivities);
            } catch (error) {
                console.error("Error bij ophalen activiteiten:", error);
                setError("Er ging iets mis bij het ophalen van activiteiten");
            } finally {
                setIsLoading(false);
            }
        }

        fetchActivities();
        },  []);

    function getCalendarDays() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month +1, 0);

        let startDayOfWeek = firstDay.getDay();
        if (startDayOfWeek === 0) startDayOfWeek = 7;

        const daysInMonth = lastDay.getDate();

        const calendarDays = [];

        for (let i = 1; i < startDayOfWeek; i++) {
            calendarDays.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            calendarDays.push(day);
        }

        return calendarDays;
    }

    function getMonthName() {
        const months = [
            'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli',
            'Augustus', 'September', 'Oktober', 'November', 'December'
        ];
        return months[currentDate.getMonth()];
    }

    function getActivitiesForDay(day) {
        if (!day) return [];

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        return activities.filter(activity => activity.date === dateString);
    }

    function gaNaarActiviteitToevoegen() {
        console.log("Plus knop geklikt");
        navigate('/addactivity');
    }

    function gaNaarDagweergave(day) {
        if (!day) return;

        const year= currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        console.log("Dag geklikt:", dateString);
        navigate(`/dayview?date=${dateString}`);
    }

    function vorigeWeek() {
        console.log("Vorige week knop geklikt");
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    }

    function volgendeWeek() {
        console.log("Volgende week knop geklikt");
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    }

    const calendarDays = getCalendarDays();

    return (
        <div className="calendar-container">
            <header className="calendar-header">
                <button className="nav-button left" onClick={vorigeWeek}>Vorige</button>
                <h1>{getMonthName()} {currentDate.getFullYear()}</h1>
                <button className="nav-button right" onClick={volgendeWeek}>Volgende</button>
            </header>

            {error && <p className="error-message">{error}</p>}

            {isLoading ? (
                <p className="loading-message">Bezig met laden...</p>
            ) : (
                <>
                    <div className="calendar-grid">
                        <div className="day-header">Maandag</div>
                        <div className="day-header">Dinsdag</div>
                        <div className="day-header">Woensdag</div>
                        <div className="day-header">Donderdag</div>
                        <div className="day-header">Vrijdag</div>
                        <div className="day-header">Zaterdag</div>
                        <div className="day-header">Zondag</div>

                        {calendarDays.map((day, index) => {
                            const dayActivities = getActivitiesForDay(day);
                            const isToday = day &&
                                day === new Date().getDate() &&
                                currentDate.getMonth() === new Date().getMonth() &&
                                currentDate.getFullYear() === new Date().getFullYear();

                            return (
                                <div
                                    key={index}
                                    className={`calendar-cell ${day ? 'active' : 'empty'} ${isToday ? 'today' : ''}`}
                                    onClick={() => day && gaNaarDagweergave(day)}
                                >
                                    {day && (
                                        <>
                                            <span className="day-number">{day}</span>
                                            {dayActivities.length > 0 && (
                                                <div className="activity-dots">
                                                    {dayActivities.slice(0, 3).map((activity, i) => (
                                                        <div
                                                            key={i}
                                                            className={`activity-dot ${activity.urgent ? 'urgent' : ''}`}
                                                            title={activity.title}
                                                        />
                                                    ))}
                                                    {dayActivities.length > 3 && (
                                                        <span
                                                            className="more-activities">+{dayActivities.length - 3}</span>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="activities-overview">
                        <h2>Alle geplande activiteiten</h2>
                        {activities.length === 0 ? (
                            <p> Nog geen activiteiten gepland. Voeg er een toe!</p>
                        ) : (
                            <div className="activities-list">
                                {activities.map(activity => (
                                    <div key={activity.id} className="activity-card">
                                        <h3>{activity.title}</h3>
                                        <p>{activity.date}</p>
                                        <p>{activity.time}</p>
                                        <p>{activity.assignedTo}</p>
                                        <p>{activity.category}</p>
                                        {activity.urgent && <span className="urgent-badge"> Urgent</span>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}

            <button className="add-button" onClick={gaNaarActiviteitToevoegen}>+</button>
        </div>
    );
}

export default Calendarpage;


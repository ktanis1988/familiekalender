import React, {useState, useEffect, Activity} from "react";
import { useNavigate } from "react-router-dom";
import "./Calendarpage.css";
import PageHeader from "../components/PageHeader";
import Message from "../components/Message.jsx";
import ActivityCard from "../components/ActivityCard";
import FloatingAddButton from "../components/FloatingAddButton.jsx";

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
        navigate(`/dayview/${dateString}`);
    }

    function vorigeMaand() {
        console.log("Vorige maand knop geklikt");
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    }

    function volgendeMaand() {
        console.log("Volgende week knop geklikt");
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    }

    const calendarDays = getCalendarDays();

    return (
        <div className="calendar-container">
            <PageHeader className="calendar-header"
                        left={
                <button className="nav-button left" onClick={vorigeMaand}>
                    Vorige
                </button>
            }
            title={`${getMonthName()} ${currentDate.getFullYear()}`}
            right={
                <button className="nav-button right" onClick={volgendeMaand}>
                    Volgende
                </button>
            }
            />

            <Message type="error">{error}</Message>

            {isLoading ? (
                <Message type="loading">Bezig met laden...</Message>
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
                            <Message type="empty"> Nog geen activiteiten gepland. Voeg er een toe!
                            </Message>
                        ) : (
                            <div className="activities-list">
                                {activities.map(activity => (
                                    <ActivityCard key={activity.id} activity={activity} />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}

            <FloatingAddButton  onClick={gaNaarActiviteitToevoegen} />
        </div>
    );
}

export default Calendarpage;


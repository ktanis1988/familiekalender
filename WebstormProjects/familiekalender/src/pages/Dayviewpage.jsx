import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Dayviewpage.css";

function Dayviewpage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const dateFromUrl = searchParams.get('date');
    const [currentDate, setCurrentDate] = useState(dateFromUrl);

    useEffect(() => {
        async function fetchActivities() {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));

            if(!token || !user) {
                setError("Je moet ingelogd zijn!");
                setIsLoading(false);
                return;
            }

            console.log("Ophalen activiteiten voor datum:", currentDate);

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

            const data = await response.json();
            console.log("Alle activiteiten:", data);

            const dayActivities = data.filter(activity =>
            activity.date === currentDate &&
            activity.familyName === user.familyName
            );

            console.log("Activiteiten voor deze dag:", dayActivities);
            setActivities(dayActivities);
            setIsLoading(false);
        }

        fetchActivities();
    }, [currentDate]);

    function formatDateForHeader(dateString) {
        const date = new Date(dateString + 'T00:00:00');
        const days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
        const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

        const dayName = days[date.getDay()];
        const day = date.getDate();
        const monthName = months[date.getMonth()];
        const year = date.getFullYear();

        return `${dayName} ${day} ${monthName} ${year}`;
    }

    async function handleDelete(activityId) {
        if (!window.confirm("Weet je zeker dat je deze activiteit wilt verwijderen? ")) {
            return;
        }

        const token = localStorage.getItem('token');

        console.log("Verwijderen activiteit:", activityId);

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/activities/${activityId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'novi-education-project-id': import.meta.env.VITE_API_KEY,
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (response.ok) {
            console.log("Activiteit verwijderd!");

            setActivities(activities.filter(activity => activity.id !== activityId));
        } else {
            alert("Er ging iets mis bij het verwijderen");
        }
    }

    function handleEdit(activityId) {
        console.log("Bewerken activiteit:", activityId);
        navigate(`/addactivity?edit=${activityId}`);
    }

    function gaTerug() {
        console.log("Terug naar de kalender");
        navigate('/calendar');
    }

    function vorigeDag() {
        console.log("Vorige dag knop geklikt")

        const date = new Date(currentDate + 'T00:00:00');
        date.setDate(date.getDate() - 1);

        const newDate = date.toISOString().split('T')[0];
        setCurrentDate(newDate);
        navigate(`/dayview?date=${newDate}`);
    }

    function volgendeDag() {
        console.log("Volgende dag knop geklikt");

        const date = new Date(currentDate + 'T00:00:00');
        date.setDate(date.getDate() + 1);

        const newDate = date.toISOString().split('T')[0];
        setCurrentDate(newDate);
        navigate(`/dayview?date=${newDate}`);
    }

    function gaNaarToevoegen() {
        console.log("Nieuwe activiteit toevoegen");
        navigate(`/addactivity?date=${currentDate}`);
    }

    return (
        <div className="dayview-container">
            <header className="dayview-header">
                <button className="nav-arrow left" onClick={vorigeDag}>Vorige</button>
                <h1>{formatDateForHeader(currentDate)}</h1>
                <button className="nav-arrow right" onClick={volgendeDag}>Volgende</button>
            </header>

            <button className="back-button" onClick={gaTerug}>Terug naar kalender</button>

            {error && <p className="error-message">{error}</p>}

            {isLoading ? (
                <p className="loading-message">Bezig met laden...</p>
                ) : (
                    <div className="activities-list">
                        {activities.length === 0 ? (
                            <p className="no-activities">Geen activiteiten gepland op deze dag</p>
                        ) : (
                            activities.map(activity => (
                                <div key={activity.id} className="activity-card">
                                    <div className="activity-info">
                                        <h3>{activity.title}</h3>
                                        <p className="activity-time">{activity.time}</p>

                                        {activity.description && (
                                            <p className="activity-description">{activity.description}</p>
                                        )}

                                        {activity.category && (
                                            <span className="activity-category">{activity.category}</span>
                                        )}

                                        {activity.assignedTo && (
                                            <p className="activity-assigned">Voor: {activity.assignedTo}</p>
                                        )}

                                        {activity.urgent && (
                                            <span className="urgent-badge">Urgent</span>
                                        )}
                                    </div>

                                    <div className="activity-buttons">
                                        <button
                                            className="edit-button"
                                            onClick={() => handleEdit(activity.id)}
                                            >
                                                Bewerken
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDelete(activity.id)}
                                        >
                                            Verwijderen
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                <button className="add-button" onClick={gaNaarToevoegen}>+</button>
            </div>
       );
}

export default Dayviewpage;


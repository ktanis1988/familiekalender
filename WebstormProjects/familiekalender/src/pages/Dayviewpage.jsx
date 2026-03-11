import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Dayviewpage.css";
import PageHeader from "../components/PageHeader";
import Message from "../components/Message";
import ActivityCard from "../components/ActivityCard.jsx";
import FloatingAddButton from "../components/FloatingAddButton.jsx";

function Dayviewpage() {
    const navigate = useNavigate();
    const { date} = useParams();

    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        setIsNavigating(false);
    }, [date]);

    useEffect(() => {
        async function fetchActivities() {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));

            if(!token || !user) {
                setError("Je moet ingelogd zijn!");
                setIsLoading(false);
                return;
            }

            try {
                setError("");
                setIsLoading(true);


                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/activities`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'novi-education-project-id': import.meta.env.VITE_API_KEY,
                            'Authorization': `Bearer ${token}`
                        },
                    });

                if (!response.ok) {
                    throw new Error("Kon geen activiteiten ophalen");
                }

                const data = await response.json();

                const dayActivities = data.filter(activity =>
                    activity.date === date &&
                    activity.familyName === user.familyName
                );

                dayActivities.sort((a, b) => (a.time || "").localeCompare(b.time || ""));

                setActivities(dayActivities);
            } catch (e) {
                console.error(e);
                setError("Er ging iets mis bij het ophalen van activiteiten")
            }   finally {
                setIsLoading(false);
            }
        }

        if (date) fetchActivities();
    }, [date]);

    function formatDateForHeader(dateString) {
        const d = new Date(dateString + 'T00:00:00');
        const days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
        const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

        const dayName = days[d.getDay()];
        const day = d.getDate();
        const monthName = months[d.getMonth()];
        const year = d.getFullYear();

        return `${dayName} ${day} ${monthName} ${year}`;
    }

    function addDays(dateString, amount) {
        const d  = new Date(dateString + "T12:00:00");
        d.setDate(d.getDate() + amount);

        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
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

            setActivities((prev) => prev.filter((activity) => activity.id !== activityId) );
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
        if (isNavigating) return;
        setIsNavigating(true);

        console.log("Vorige dag knop geklikt")

        const d = new Date(date + 'T00:00:00');
        d.setDate(d.getDate() - 1);

        const newDate = addDays(date, -1);
        navigate(`/dayview/${newDate}`);
    }

    function volgendeDag() {
        if (isNavigating) return;
        setIsNavigating(true);

        console.log("Volgende dag knop geklikt");

        const d = new Date(date + 'T00:00:00');
        d.setDate(d.getDate() + 1);

        const newDate = addDays(date, 1);
        navigate(`/dayview/${newDate}`);
    }

    function gaNaarToevoegen() {
        console.log("Nieuwe activiteit toevoegen");
        navigate(`/addactivity?date=${date}`);
    }

    return (
        <div className="dayview-container">
            <PageHeader className="dayview-header">
                <button className="nav-arrow left" onClick={vorigeDag} disabled={isNavigating}>Vorige</button>
                <h1>{date ? formatDateForHeader(date): "Dagweergave"}</h1>
                <button className="nav-arrow right" onClick={volgendeDag} disabled={isNavigating}>Volgende</button>
            </PageHeader>

            <button className="back-button" onClick={gaTerug}>Terug naar kalender</button>

            <Message type="error">{error}</Message>

            {isLoading ? (
                <Message type="loading">Bezig met laden...</Message>
                ) : (
                    <div className="activities-list">
                        {activities.length === 0 ? (
                            <Message type="empty">Geen activiteiten gepland op deze dag</Message>
                        ) : (
                            activities.map(activity => (
                                <ActivityCard
                                    key={activity.id}
                                    activity={activity}
                                    right={
                                    <div className="activity-buttons">
                                        <button className="edit-button" onClick={() =>
                                        handleEdit(activity.id)}>
                                        Bewerken
                                        </button>
                                        <button className="delete-button" onClick={() =>
                                        handleDelete(activity.id)}>
                                            Verwijderen
                                        </button>
                                    </div>
                                    }
                                />
                            ))
                        )}
                    </div>
                )}

                <FloatingAddButton onClick={gaNaarToevoegen} />
            </div>
       );
}

export default Dayviewpage;


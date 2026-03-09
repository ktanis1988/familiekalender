import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Addactivitypage.css";

function Addactivitypage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [titel, setTitel] = useState("");
    const [datum, setDatum] = useState("");
    const [tijd, setTijd] = useState("");
    const [categorie, setCategorie] = useState("");
    const [persoon, setPersoon] = useState("");
    const [beschrijving, setBeschrijving] = useState("");
    const [urgent, setUrgent] = useState(false);

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const editId = searchParams.get('edit');
    const dateFromUrl = searchParams.get('date');
    const isEditMode = editId !== null;

    useEffect(() => {
        if (isEditMode) {
            async function fetchActivity() {
                try {
                    const token = localStorage.getItem('token');

                    if (!token) {
                        console.log("Geen token gevonden");
                        return;
                    }

                    console.log("Ophalen activiteit voor bewerken, ID:", editId);

                    const response = await fetch(
                        `${import.meta.env.VITE_API_URL}/api/activities/${editId}`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'novi-education-project-id': import.meta.env.VITE_API_KEY,
                                'Authorization': `Bearer ${token}`
                            }
                        }
                    );

                    if (!response.ok) {
                        console.log("Ophalen mislukt");
                        return;
                    }

                    const data = await response.json();
                    console.log("Opgehaalde activiteit:", data);

                    setTitel(data.title || "");
                    setDatum(data.date || "");
                    setTijd(data.time || "");
                    setCategorie(data.category || "");
                    setPersoon(data.assignedTo || "");
                    setBeschrijving(data.description || "");
                    setUrgent(data.urgent || false);
                } catch (error) {
                    console.error("Error bij ophalen:", error);
                }
            }

            fetchActivity();
        } else if (dateFromUrl) {
            setDatum(dateFromUrl);
        }
    },  [editId, isEditMode, dateFromUrl]);

    function gaTerug() {
        console.log("Terug knop geklikt");
        navigate('/calendar');
    }

    async function handleOpslaan(e) {
        e.preventDefault();
        console.log("Opslaan knop geklikt");

        if (!titel || !datum || !tijd) {
            setError("Vul minimaal titel, datum en tijd in!");
            console.log("Error: verplichte velden niet ingevuld");
            return;
        }

        if (!categorie) {
            setError("Vul een categorie in!");
            console.log("Error: categorie verplicht");
            return;
        }

        if (!persoon) {
            setError("Wijs de activiteit toe aan een persoon!");
            console.log("Error: persoon verplicht");
            return;
        }

        console.log("Activiteit data:", {
            titel: titel,
            datum: datum,
            tijd: tijd,
            categorie: categorie,
            persoon: persoon,
            beschrijving: beschrijving,
            urgent: urgent,
        });

        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!token) {
            setError("Je bent niet ingelogd!");
            console.log("Error: geen JWT token gevonden");
            return;
        }

        setIsLoading(true);

        const method = isEditMode ? 'PUT' : 'POST';
        const apiUrl = isEditMode
        ? `${import.meta.env.VITE_API_URL}/api/activities/${editId}`
        : `${import.meta.env.VITE_API_URL}/api/activities`;

        console.log(`Bezig met activiteit ${isEditMode ? 'bijwerken' : 'opslaan'} via API ... `);
        console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'novi-education-project-id':import.meta.env.VITE_API_KEY,
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: titel,
                date: datum,
                time: tijd,
                category: categorie,
                assignedTo: persoon,
                description: beschrijving,
                createdBy: user.email,
                familyName: user.familyName,
                urgent: urgent,
            }),
        });

        const data = await response.json();
        console.log("Response van API:", data);

        if (response.ok) {
            console.log(`Activiteit ${isEditMode ? 'bijgewerkt' : 'opgeslagen'}!`);
            setError("");
            navigate('/calendar');
        } else {
            console.log("Opslaan mislukt:", data);
            setError("Er ging iets mis bij het opslaan");
        }

        setIsLoading(false);
    }

    function handleAnnuleren() {
        console.log("Annuleren knop geklikt");
        navigate('/calendar');
    }

    return (
        <div className="addactivity-container">
            <header className="addactivity-header">
                <button className="back-button" onClick={gaTerug}>Vorige</button>
                <h1>{isEditMode ? 'Activiteit bewerken' : 'Activiteit toevoegen'}</h1>
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

                <div className="form-field">
                    <label>Beschrijving</label>
                    <textarea
                        placeholder="Extra informatie..."
                        value={beschrijving}
                        onChange={ (e) => setBeschrijving(e.target.value)}
                        rows="3"
                    />
                </div>

                <div className="form-field">
                    <label>
                        <input
                            type="checkbox"
                            checked={urgent}
                            onChange={ (e) => setUrgent(e.target.checked)}
                            />
                            {''}Urgent
                    </label>
                </div>

                <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? 'Bezig...' : (isEditMode ? 'Bijwerken' : 'Opslaan')}
                </button>
                <button type="button" className="cancel-button" onClick={handleAnnuleren}>Annuleren</button>
            </form>
        </div>
    );
}

export default Addactivitypage;

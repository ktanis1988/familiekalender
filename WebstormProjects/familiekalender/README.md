Familiekalender

/* Inhoudsopgave

1. Inleiding en doel.
2. Belangrijkste functionaliteiten.
3. Screenshot.
4. Gebruikte technieken en frameworks.
5. Installatie en lokaal draaien.
6. Configuratie en API-key. 
7. Inloggen en testgebruikers. 
8. Beschikbare npm-commando's.

--------------------------------------------------------------------------

1. Inleiding en doel.

Deze applicatie is een familiekalender gebouwd als eindproject voor de opleiding
Front End Web Developer. In deze kalender kunnen gezinsleden eenvoudig activiteiten 
toevoegen, wijzigen en inzien in een gedeeld online overzicht.

---------------------------------------------------------------------------

2. Belangrijkste functionaliteiten.

- Gebruikers kunnen een account aanmaken.(registreren)
- Inloggen met eigen gebruikersgegevens.
- Ieder gezinslid ziet alleen zijn/haar eigen gezinsagenda.
- Activiteiten aanmaken, bewerken en verwijderen.
- Kalenderweergave per maand en per dag.
- Navigatie naar vorige/volgende dag of maand.
- Eenvoudige, duidelijke gebruikersinterface.
- Foutafhandeling en validatie bij formulieren.
- Alleen ingelogde gebruikers hebben toegang tot hun omgeving.

---------------------------------------------------------------------------

3. Screenshot van de applicatie.

![Screenshot van de applicatie](screenshot.png)

---------------------------------------------------------------------------

4. Gebruikte technieken en frameworks.

- React: frontend-library voor componentbased development.
- React router: client-side navigatie tussen pagina's.
- CSS: voor styling en responsieve lay-out.
- NPM: packagebeheer en scriptrunner.
- NOVI Dynamic API: online backend voor gebruikers/activiteiten.
- Fetch API: voor communicatie met de backend.
- Context API: voor het beheren van authenticatiestatus.

---------------------------------------------------------------------------

5. Installatie en lokaal draaien.

Benodigde stappen:

1. Clone de repository.
    bash /* in de terminal */ 
    git clone https://github.com/ktanis1988/familiekalender.git
    cd familiekalender

2. Installeer de afhankelijkheden:
    bash /* in de terminal */
    npm install

3. Voeg het '.env' bestand aan met de volgende inhoud.
    Maak een bestand .env aan met deze inhoud:

   VITE_API_KEY=9b258735-b4b8-4085-bd53-ded96cbaae7b
   VITE_API_URL=https://novi-backend-api-wgsgz.ondigitalocean.app

4. Start de applicatie lokaal:
    bash /* in de terminal */
    npm run dev

    De applicatie is nu bereikbaar op : [http://localhost:5173](http://localhost:5173).

---------------------------------------------------------------------------

6. Configuratie en API_KEY.

De applicatie maakt gebruik van de NOVI Dynamic API. 
Er hoeft geen nieuwe configuratie te uploaden inde NOVI-omgeving.
De juiste configuratie ('api-config.json') is al ingesteld en upgeload. 
De meegeleverde '.env' zorgt ervoor dat de applicatie direct werkt met de juiste endpoints en key.

---------------------------------------------------------------------------

7. Inloggen en testgebruikers.

Inlognaam:              Wachtwoord;
vader@tanis.nl          test123
moeder@tanis.nl         test123
dochter@tanis.nl        test123

---------------------------------------------------------------------------

8. Beschikbare npm-commando's.

- npm run dev : Start de ontwikkelserver.
- npm run build : Maakt een productiebuild voor deployment aan in de 'dist'.
- npm run preview: Start een lokale server voor de productie-build.
- npm run lint: Controleert code op stijl- en programmeerfouten.
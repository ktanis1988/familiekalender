import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Registerpage from "./pages/Registerpage";
import Calendarpage from "./pages/Calendarpage";
import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/" element={<Registerpage />} />
                <Route path="/" element={<Calendarpage />} />
            </Routes>
        </Router>
    );
}

export default App;

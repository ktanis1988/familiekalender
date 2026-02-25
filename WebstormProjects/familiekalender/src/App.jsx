import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Registerpage from "./pages/Registerpage";
import Calendarpage from "./pages/Calendarpage";
import Addactivitypage from "./pages/Addactivitypage";
import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/register" element={<Registerpage />} />
                <Route path="/calendar" element={<Calendarpage />} />
                <Route path="/addactivity" element={<Addactivitypage />} />
            </Routes>
        </Router>
    );
}

export default App;

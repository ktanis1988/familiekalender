import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Registerpage from "./pages/Register";
import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route Path="/" element={<Registerpage />} />
            </Routes>
        </Router>
    )
}

export default App;

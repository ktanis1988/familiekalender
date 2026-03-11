import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Registerpage from "./pages/Registerpage";
import Calendarpage from "./pages/Calendarpage";
import Addactivitypage from "./pages/Addactivitypage";
import Dayviewpage from "./pages/Dayviewpage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/register" element={<Registerpage />} />

                <Route
                    path="/calendar"
                    element={
                    <ProtectedRoute>
                        <Calendarpage />
                    </ProtectedRoute>
                }
                />

                <Route
                    path="/addactivity"
                    element={
                    <ProtectedRoute>
                        <Addactivitypage />
                    </ProtectedRoute>
                }
                />

                <Route
                    path="/dayview/:date"
                    element={
                    <ProtectedRoute>
                        <Dayviewpage />
                    </ProtectedRoute>
                }
                />
            </Routes>
        </Router>
    );
}

export default App;

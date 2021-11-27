import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Entry from "./pages/Entry/Entry";

export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Entry/>} />
                    <Route path="/entry" element={<Entry/>} />
                </Routes>
            </Router>
        </div>
    );
}
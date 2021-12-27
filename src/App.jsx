import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import Post from "./pages/Post/Post";
import View from "./pages/View/View";

export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/view" element={<View/>} />
                    <Route path="/post" element={<Post/>} />
                </Routes>
            </Router>
        </div>
    );
}
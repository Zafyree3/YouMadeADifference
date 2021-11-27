import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Home() {

    let navigate = useNavigate()

    const handlePost = () => {
        navigate('/post')
    }

    const handleView = () => {
        navigate('/view')
    }
    
    return (
        <div>
            <h4>
                Hello! Welcome To...
            </h4>
            <h2>
                You Made A Difference
            </h2>
            <button
            onClick = {handlePost}>
                Post Your Messages
            </button>
            <button
            onClick = {handleView}>
                View Recievced Messages
            </button>
        </div>
    );
}
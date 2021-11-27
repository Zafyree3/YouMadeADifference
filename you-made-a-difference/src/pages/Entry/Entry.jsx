import React from 'react';
import { useState } from "react";

export default function Entry() {

    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = () => {
        if (password === '12345') {
            alert("You Enter Correctly");
            setPassword("")
            return;
        }
        alert('Buu Buu')
        setPassword("")
        return;
    };

    return (
        <div className="container">
            <text> Type Password: </text>
            <label>
                <input
                type = {showPassword ? "text" : "password"}
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}/>
                <button
                onClick = {toggleShowPassword}>
                    Show
                </button>
            </label>
            <input
            type = 'submit'
            value = 'Submit' 
            onClick= {handleSubmit}/>
        </div>
        
    );
}
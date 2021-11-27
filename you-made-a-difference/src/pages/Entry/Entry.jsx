import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Entry() {

    let navigate = useNavigate();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = () => {
        if (password === '12345') {
            setPassword("")
            navigate('/home')
            return;
        }
        setPassword("")
        alert('The password is wrong.\nPlease re-enter the password.')
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
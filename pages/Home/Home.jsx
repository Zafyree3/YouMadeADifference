import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import Entry from "../Entry/Entry";

export default function Home() {

    let navigate = useNavigate()

    const [code, setCode] = useState('');

    const handlePost = () => {
        navigate('/post')
    }

    const handleView = () => {
        if (code.length === 4) {
            navigate('/view', {state: code})
        } else {
            alert('Please enter a value code')
        }
    }
    
    return (
        <div>
            <Entry/>
            <div class={styles.container}>
                <button
                onClick = {handlePost}
                class = {styles.write}>
                    WRITE a message
                </button>
                <div class={styles.divContainer}>
                    <button
                    onClick = {handleView}
                    class = {styles.view}>
                        VIEW your messages
                    </button>
                    <text
                    class = {styles.keyText}>
                        Key in your 4-digit code:
                    </text>
                    <input
                    type='text'
                    class = {styles.viewInput}
                    onChange = {(e)=> setCode(e.target.value)}
                    placeholder= 'Enter here'>
                    </input>
                </div>
            </div>
        </div>
        
    );
}
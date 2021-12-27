import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Entry.module.css";

export default function Entry() {

    let navigate = useNavigate();
    
    const handleButton = () => {
        navigate('/home')
    }

    return (
        <div class={styles.container}>
            {/* <button class={styles.homeButton} onClick={handleButton}>
                Click Here To Enter
            </button> */}
        </div>
        
    );
}
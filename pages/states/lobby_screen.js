//Steps: 
//1. Add player to the room in Firebase Database
//2. Give player default state of NOT READY
//3. 
import React, { useState, useEffect } from 'react'
import { addPlayer, loadPlayers } from "../../services/firebase_service";

export const LobbyScreen = () => {
    useEffect(() => {
        addPlayer("U3Hg", "John");
        loadPlayers("U3Hg")
    },[])
    
    return (<>This is Lobby screen</>);
}
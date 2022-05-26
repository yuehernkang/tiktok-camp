import React, { useState, useEffect } from 'react'
import { addPlayer, loadPlayers } from "../../services/firebase_service";
import { getDatabase, onDisconnect,ref } from 'firebase/database';

//Steps: 
//1. Add player to the room in Firebase Database
//2. Give player default state of NOT READY
//3. 
export const LobbyScreen = (roomID) => {
    useEffect(() => {
        addPlayer(roomID, "John");
        loadPlayers(roomID)
    })

    const db = getDatabase();
    const presenceRef = ref(db, "rooms/" + roomID);
    //onDisconnect()
    //When player crash, offline, close browser, refresh page
    //it will delete the data from 
    //the realtime database. 
    onDisconnect(presenceRef).remove();
    
    return (<>This is Lobby screen</>);
}
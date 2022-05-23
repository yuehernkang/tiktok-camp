import { getDatabase, ref, onValue, set, push } from "firebase/database";

export const getRoom = (roomID) => {
    const db = getDatabase();
    const roomRef = ref(db, 'rooms/' + roomID);
    onValue(roomRef, (snapshot) => {
        if(snapshot.exists()){
            console.log("exist")
        } else {
            console.log("no exist")
        }
    });
}

export const addPlayer = (roomID, playerName) => {
    const db = getDatabase();
    const roomRef = ref(db, 'rooms/' + roomID);
    const newPlayerRef = push(roomRef);
    set(newPlayerRef, {
        players: playerName
    });
}

export const loadPlayers = (roomID) => {
    const db = getDatabase();
    const roomRef = ref(db, 'rooms/' + roomID);
    onValue(roomRef, (snapshot) => {
        if(snapshot.exists()){
            console.log(snapshot.toJSON())
        } else {
            console.log("no exist")
        }
    });
}
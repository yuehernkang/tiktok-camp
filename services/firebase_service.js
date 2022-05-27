import { getDatabase, ref, onValue, set, push } from "firebase/database";

export const getRoom = async (roomID) => {
    const db = getDatabase();
    const roomRef = ref(db, 'rooms/' + roomID);
    await onValue(roomRef, (snapshot) => {
        if(snapshot.exists()){
            return "exist";
        } else {
            return "no exist";
        }
    });
}

export const createRoom = async () => {
    const generateRoomID = Math.random().toString(36).slice(2, 6);
    const db = getDatabase();
    set(ref(db, 'rooms/' + generateRoomID), {
        players: "john"
    })
}

export const addPlayer = (roomID, playerName) => {
    const db = getDatabase();
    const roomRef = ref(db, 'rooms/' + roomID);
    push(roomRef, {
        "playerName": playerName
    });
}

export const loadPlayers = (roomID) => {
    const db = getDatabase();
    const roomRef = ref(db, 'rooms/' + roomID);
    onValue(roomRef, (snapshot) => {
        if(snapshot.exists()){
            return snapshot.toJSON();
        } else {
            console.log("no exist")
        }
    });
}
import { getApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push, get, child, update } from "firebase/database";
import { getFunctions, httpsCallable } from "firebase/functions";

export const getRoom = async (roomID) => {
    const db = getDatabase();
    const roomRef = ref(db, 'rooms/' + roomID);
    const snapshot = await roomRef.get
    // await get(roomRef).then((snapshot) => {
    //     if(snapshot.exists()) {
    //         return snapshot;
    //     } else {
    //         return false;
    //     }
    // })
}

export const createRoom = async (name) => {
    const generateRoomID = Math.random().toString(36).slice(2, 6);
    const db = getDatabase();
    // const hostKey = push(child(ref(db), 'rooms/' + generateRoomID)).key;
    const updates = {};
    updates[`rooms/${generateRoomID}/${name}`] = true;
    updates[`rooms/${generateRoomID}/GAME_STATE`] = false;
    update(ref(db), updates);
    return generateRoomID;
}

export const initNewPlayer = (roomId, name) => {
    const functions = getFunctions(getApp(), 'asia-southeast1');
    const initNewPlayer = httpsCallable(functions, 'initNewPlayer');
    const result = initNewPlayer({ roomId: roomId, playerName: name });
}

export const startGame = (roomId) => {
    const db = getDatabase();
    const updates = {};
    updates[`rooms/${roomId}/GAME_STATE`] = true;
    update(ref(db), updates);
}

export const setReady = (roomID, name, readyState) => {
    const db = getDatabase();
    const updates = {};
    updates[`rooms/${roomID}/${name}`] = readyState;
    update(ref(db), updates);
}

export const addPlayer = (roomID, playerName) => {
    const db = getDatabase();
    const updates = {};
    updates['rooms/' +roomID + "/" + playerName] = false;
    return update(ref(db), updates);
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
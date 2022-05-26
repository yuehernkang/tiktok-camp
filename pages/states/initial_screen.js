import styled from 'styled-components';
import { getRoom, createRoom } from '../../services/firebase_service';
import {ENTER_ROOM_STATE} from './states';
import { useState } from 'react';


//Create Room:
//Generate Room ID and go to Room Lobby
export const InitialScreen = ({state, onStateChange}) => {

    const makeRoom = () => {
         createRoom();
    }

    return (
        <>
            <button onClick={makeRoom}>Create Room</button>
            <button onClick={() => onStateChange(ENTER_ROOM_STATE)}>Join Room</button>
        </>

    );
}
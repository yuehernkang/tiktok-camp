import styled from 'styled-components';
import { getRoom } from '../../services/firebase_service';
import {LOBBY_SCREEN_STATE, LOGIN_SCREEN_STATE} from './states';
import { useState } from 'react';
import Modal from '@mui/material/Modal';

export const InitialScreen = ({state, onStateChange}) => {

    const [inputValue, setinputValue] = useState();

    const [joinButtonState, setJoinButtonState] = useState(true);

    const getRoomData = (roomID) => {
        getRoom(roomID).then((value) => {
            if(value == "exist") {
                //Go to lobby of specified game
                console.log("exist")
                onStateChange(LOBBY_SCREEN_STATE);
            } else {
                //Show modal or something
                console.log("noexist")
            }
        });
    }

    const onChange = (e) => {
        setinputValue(e.target.value.toUpperCase());
        if(e.target.value.length == 4) {
            setJoinButtonState(false);
        } else{
            setJoinButtonState(true);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        getRoomData(event.target.value);
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Enter Room ID
                <input 
                    type="text" 
                    value={inputValue}
                    onChange={onChange} 
                />
                <input type="submit" value="Submit" disabled={joinButtonState}/>
            </label>
        </form>

    );
}
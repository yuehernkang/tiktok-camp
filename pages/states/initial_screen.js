import styled from 'styled-components';
import { getRoom } from '../../services/firebase_service';
import {LOBBY_SCREEN_STATE, LOGIN_SCREEN_STATE} from './states';
import { useState } from 'react';

export const InitialScreen = ({state, onStateChange}) => {

    const [inputValue, setinputValue] = useState("");

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
        setinputValue(e.target.value);
        if(e.target.value.length == 4) {
            setJoinButtonState(false);
        }
    }

    const Title = styled.h1``;

    const InputBox = styled.input``;

    const NiceButtons = styled.button``;
    return (<Title>
        Welcome To TikTok Game
        <InputBox placeholder='Enter Game ID' value={inputValue.toUpperCase()} onChange={onChange}/>
        <NiceButtons onClick={() => onStateChange(LOGIN_SCREEN_STATE)} >Create New Game</NiceButtons>
        <NiceButtons onClick={() => getRoomData(inputValue)} disabled={joinButtonState}>Join Game</NiceButtons>
      </Title>);
}
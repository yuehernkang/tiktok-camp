import React, { useState, useEffect } from 'react'
import { addPlayer, loadPlayers } from "../../services/firebase_service";
import { getDatabase, onChildAdded, onDisconnect,onValue,push,ref } from 'firebase/database';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setUiState } from '../../features/uiSlice';
import { HANGMAN_GAME_STATE } from './states';
import Image from 'next/image';
import notready from '../../public/notready.png';
import { Button } from '@mui/material';

//Steps: 
//1. Add player to the room in Firebase Database
//2. Give player default state of NOT READY
//3. 

const LobbyScreenDiv = styled.div`
    display: grid;
    grid-gap: 10px;
    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const UserBox = styled.div`
    border: 1px solid red;

    @media (max-width: 768px) {
        width: 100%;
        height: 200px;
    }

    @media (min-width: 768px) {
        margin: auto;
    }
`;

const UserName = styled.div`
    text-align: center;
    border-bottom: 1px solid red;
`;

const StartButton = styled.button`

`;

const ReadyStateImage = styled(Image)`
    max-height: 100%;
    max-width: 100%;
`;

const ReadyStateText = styled.div`
    text-align: center;
    border-top: 1px solid red;
`;

export const LobbyScreen = (roomID) => {
    useEffect(() => {
        addPlayer("2vky", "John");
        loadPlayers("2vky");
    })

    //onDisconnect()
    //When player crash, offline, close browser, refresh page
    //it will delete the data from 
    //the realtime database. 
    const db = getDatabase();
    const presenceRef = ref(db, "rooms/2vky");
    const presenceWordRef = ref(db, "words/2vky");
    onDisconnect(presenceWordRef).remove();
    onDisconnect(presenceRef).remove();
    const [imageState, setImageState] = useState();
    const disPatch = useDispatch();
    const onClick = () => {
        console.log("hello")
        disPatch(setUiState(HANGMAN_GAME_STATE));
    }

    const sendMessage = () => {
        const chatRef = ref(db, "rooms/2vky/chat");
        push(chatRef, {
            chatMessage: "Hello"
            }
        )
    }

    const listenChatRef = ref(db, "rooms/2vky/chat");
    onChildAdded(listenChatRef, (data) => {
        console.log(data);
    });

    const newPlayerRef = ref(db, "rooms/2vky");
    onChildAdded(newPlayerRef, (data) => {
        console.log(data);
    });
    
    return (
        <LobbyScreenDiv>
            <UserBox>
                <UserName>Hello</UserName>
                <ReadyStateImage src={notready}></ReadyStateImage>
                <ReadyStateText>Ready</ReadyStateText>
            </UserBox>
            <UserBox>
                <UserName>Hello</UserName>
                <ReadyStateImage src={notready}></ReadyStateImage>
                <ReadyStateText>Ready</ReadyStateText>
            </UserBox>
            <StartButton onClick={onClick}>Start</StartButton>
            <Button onClick={sendMessage}>send</Button>
        </LobbyScreenDiv>
    );
}
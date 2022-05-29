import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import standImage from "../../public/stand.png";
import { connectFunctionsEmulator, getFunctions , httpsCallable } from "firebase/functions"
import { firebaseConfig } from "../firebase_config";
import { getApp } from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, onValue, ref } from "firebase/database";
import { Box, Button, Input, Modal, TextField, Typography } from "@mui/material";
import { setUiState } from "../../features/uiSlice";
import { LOBBY_SCREEN_STATE } from "./states";

const firstRow = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"
]

const secondRow = [
    "A", "S", "D", "F", "G", "H", "J", "K", "L"
]

const thirdRow = [
    "Z", "X", "C", "V", "B", "N", "M"
]

const LetterBox = styled.button`
    background-color: #C0353CD1;
    color: white;
    margin: 2px;
    font-size: xx-large;
    
    :hover{
        background-color: #FFF;
        color: #C0353CD1;

    }

    :disabled{
        background-color: gray;
    }
`;

const KeyboardDiv = styled.div`
    display: grid;
    margin: auto;
    text-align: center;
    @media (max-width: 768px) {
        position: absolute;
        bottom: 0;
    }
`;

const CurrentWordStateDiv = styled.div`
    text-align: center;
    font-size: xx-large;
    letter-spacing: 4px;
`;

const UserLifeDiv = styled.div`
    text-align: center;
    color: #C0353CD1;
    font-size: xx-large;
`;

export const HangmanScreen = () => {
    const [imageState, setImageState] = useState();
    const [wordState, setWordState] = useState();
    const [keyboardDisable, setkeyboardDisable] = useState(false);
    const [chosenLetters, setChosenLetters] = useState([]);
    const [userLife, setUserLife] = useState();
    const [won, setWon] = useState(false);
    const name = useSelector((state) => state.name);
    const roomId = useSelector((state) => state.ui.roomId);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const disPatch = useDispatch();

    const submitGuess = (guess) => {
        setkeyboardDisable(true);
        setChosenLetters(oldArray => [...oldArray, guess]);
        const functions = getFunctions(getApp(), 'asia-southeast1');
        const checkWord = httpsCallable(functions, 'checkWord');
        console.log(guess);
        const result = checkWord({ guess: guess.toUpperCase(), roomId: roomId, currentWordState: wordState, playerName: name });
        result.then((result) => {
            setkeyboardDisable(false);
        })
    }

    useEffect(() => {
        console.log(wordState);
        const db = getDatabase();
        const dbName = name.value + "_STATE";
        console.log(name);
        const playerWordRef = ref(db, "state/" + roomId);
        onValue(playerWordRef, (snapshot) => {
            if(snapshot.exists()) {
                console.log(snapshot.val());
                if(snapshot.toJSON()[dbName] == "WINNER!") {
                    setWon(true);
                    setOpen(true);
                } else {
                    console.log(snapshot.toJSON()[dbName]);
                    setWordState(snapshot.toJSON()[dbName]);
                }
                for(let v in snapshot.toJSON()) {
                    console.log(snapshot.toJSON()[v]);
                }
            }
        });
    }, [])

    useEffect(() => {
        const db = getDatabase();
        const livesRef = ref(db, "lives/" + roomId + "/" + name.value);
        onValue(livesRef, (snapshot) => {
            setUserLife(snapshot.toJSON());
            if(snapshot.toJSON() == 0) {
                setWon(false);
                setOpen(true);
            }
        });
    },[])

    useEffect(() => {
        setWordState(submitGuess("*")); 
    }, []);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const firstRowKeyboard = firstRow.map((item) => {
        const disabledState = chosenLetters.includes(item) ? true : keyboardDisable;
        return <LetterBox disabled={disabledState} onClick={() => submitGuess(item)}>{item}</LetterBox>
    })
    const secondRowKeyboard = secondRow.map((item) => {
        const disabledState = chosenLetters.includes(item) ? true : keyboardDisable;
        return <LetterBox disabled={disabledState} onClick={() => submitGuess(item)}>{item}</LetterBox>
    })

    const thirdRowKeyboard = thirdRow.map((item) => {
        const disabledState = chosenLetters.includes(item) ? true : keyboardDisable;
        return <LetterBox disabled={disabledState}onClick={() => submitGuess(item)}>{item}</LetterBox>
    })

    const backToLobby = () => {
        setOpen(false);
        disPatch(setUiState(LOBBY_SCREEN_STATE));
    }


    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                    Enter Room ID:
                </Typography> */}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {won ? "WINNER !!" : "YOU LOST!!"}
                    <div>
                        <Button variant="contained" size="medium" onClick={() => disPatch(setUiState(LOBBY_SCREEN_STATE))}>Back to Lobby</Button>
                    </div>
                </Typography>
                </Box>
            </Modal>
        <UserLifeDiv>No of lives: {userLife}</UserLifeDiv>
        <Image src={`/../public/${6-userLife}.gif`} width={500}height={500}/>
        <CurrentWordStateDiv> {wordState}</CurrentWordStateDiv>
        <KeyboardDiv>
            <div>{firstRowKeyboard}</div>
            <div>{secondRowKeyboard}</div>
            <div>{thirdRowKeyboard}</div>
        </KeyboardDiv>
        </>
    )
}
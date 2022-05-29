import React, { useState, useEffect } from 'react'
import { addPlayer, initNewPlayer, loadPlayers, setReady, startGame } from "../../services/firebase_service";
import { getDatabase, onChildAdded, onChildRemoved, onDisconnect,onValue,push,ref } from 'firebase/database';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setUiState } from '../../features/uiSlice';
import Image from 'next/image';
import notready from '../../public/notready.png';
import readyPic from '../../public/ready.png';
import { Button, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useToggle from '../../app/hooks';
import Constants from "../../app/states";

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

const PageDiv = styled.div`
    display: grid;
    grid-gap: 2rem;
`;

const RoomIdDiv = styled.div`
    display: grid;
    text-align: center;
    color: #C0353C;
    border: 5px solid #C0353C;
    font-size: xx-large;
`;



const UserName = styled.div`
    text-align: center;
    border-bottom: 1px solid red;
`;



const ReadyStateImage = styled(Image)`
    max-height: 100%;
    max-width: 100%;
`;

const LobbyScreen = () => {
    const roomId = useSelector((state) => state.ui.roomId);
    const name = useSelector((state) => state.name.value)
    const hostState = useSelector((state) => state.ui.host);
    const uselessState = useSelector((state) => {console.log(state)});
    //First is current user
    const [firstReadyState, setFirstReadyState] = useToggle();
    const [secondReadyState, setSecondReadyState] = useState();
    const [secondPlayer, setSecondPlayer] = useState("");
    const [currentPlayerId, setCurrentPlayerId] = useState();
    const [startButtonDisabled, setStartButtonDisabled] = useState();

    const StartButton = styled(Button)`
        display: ${hostState ? "none" : "block"};
    `;

    const SecondUserBox = styled.div`
        display: ${secondPlayer!="" ? "block" : "none"};
        border: 1px solid red;

        @media (max-width: 768px) {
            width: 100%;
            height: 200px;
        }

        @media (min-width: 768px) {
            margin: auto;
        }
    `;

    const SecondReadyStateImage = styled(Image)`
        display: ${secondPlayer!="" ? "block" : "none" };
        max-height: 100%;
        max-width: 100%;
    `;

    const SecondUserName = styled.div`
        text-align: center;
        border-bottom: 1px solid red;
        display: ${secondPlayer!="" ? "block" : "none"};
    `;
    const SecondReadyText = styled.div`
        text-align: center;
        border-top: 1px solid red;
        background-color: ${secondReadyState ? "red": "white"};
        display: ${secondPlayer!="" ? "block" : "none" };
    `;


    const FirstReadyText = styled.div`
        text-align: center;
        border-top: 1px solid red;
        background-color: ${firstReadyState ? "red": "white"};
    `;


    useEffect(() => {
        //WARM UP 

        initNewPlayer(roomId, name);
        if(!hostState){
            const playerId = addPlayer(roomId, name);
            setCurrentPlayerId(playerId);
            console.log(playerId);
        }
        loadPlayers(roomId);
    }, [])

    useEffect(() => {
        console.log("ready state changed");
        setReady(roomId, name, firstReadyState);
    }, [firstReadyState])

    useEffect(() => {
        const newPlayerRef = ref(db, "rooms/" + roomId);
        onChildAdded(newPlayerRef, (snapshot)=> {
            console.log("child added");
            console.log(snapshot.toJSON);
        })
        onValue(newPlayerRef, (snapshot) => {
            const length = Object.keys(snapshot.val()).length;
            if(snapshot.exists()) {
                // console.log(snapshot.toJSON());
                //new player joined
                for(let v in snapshot.toJSON()) {
                    if(hostState){
                        // console.log(snapshot.toJSON());
                    }
                    if(v != name) {
                        if(v != "GAME_STATE"){
                            setSecondPlayer(v);
                            setSecondReadyState(snapshot.toJSON()[v]);
                            if(v != name) {
                                setSnackbarState(true);
                            }
                        }
                        if (snapshot.toJSON()[v] && firstReadyState) {
                            console.log("both are ready !")
                        }
                    }
                    if(hostState) {
                        if(snapshot.toJSON()[v] == false) {
                            setStartButtonDisabled(false);
                        }
                        if(firstReadyState && secondReadyState) {
                            setStartButtonDisabled(true);
                        }
                    }
                    if(v == "GAME_STATE") {
                        console.log(v);
                        if(snapshot.toJSON()[v]) {
                            console.log("hello change here pls")
                            disPatch(setUiState(Constants.HANGMAN_GAME_STATE));
                        }
                    }
                    // if(v == name) {
                    //     setFirstReadyState(snapshot.toJSON()[v])
                    // }
                    // if(snapshot.toJSON()[v] != name) {
                    //     setSecondReadyState(snapshot.toJSON()[v].readyState)
                    //     setSecondPlayer(snapshot.toJSON()[v].playerName);
                    //     setSnackbarState(true)
                    // } else {
                    //     setCurrentPlayerId(v);
                    // }
                }
            }

        });
    }, [])

    //onDisconnect()
    //When player crash, offline, close browser, refresh page
    //it will delete the data from 
    //the realtime database. 
    const db = getDatabase();
    const presenceRef = ref(db, "rooms/" + roomId);
    const presenceWordRef = ref(db, "words/" + roomId);
    const stateRef = ref(db, "state/" + roomId);
    const livesWordRef = ref(db, "lives/" + roomId);

    if(hostState){
        onDisconnect(presenceWordRef).remove();
        onDisconnect(presenceRef).remove();
        onDisconnect(livesWordRef).remove(); 
        onDisconnect(stateRef).remove(); 
    }
    if(!hostState) {
        // onDisconnect()
    }
    const [imageState, setImageState] = useState();
    const [snackbarState, setSnackbarState] = useState(false);
    const disPatch = useDispatch();
    const onClick = () => {
        console.log(roomId);
        console.log("hello")
        startGame(roomId);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbarState(false);
      };


  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

    
    
    
    return (
        <PageDiv>
            <RoomIdDiv>
                ROOM ID: {roomId}
            </RoomIdDiv>
            <LobbyScreenDiv>
                <UserBox>
                    <UserName>{name}</UserName>
                    <ReadyStateImage src={firstReadyState?readyPic:notready}></ReadyStateImage>
                    <FirstReadyText>{firstReadyState ? "READY" : "NOT READY"}</FirstReadyText>
                </UserBox>
                <SecondUserBox>
                    <SecondUserName>{secondPlayer}</SecondUserName>
                    <SecondReadyStateImage src={notready}></SecondReadyStateImage>
                    <SecondReadyText>{secondReadyState ? "READY" : "NOT READY"}</SecondReadyText>
                </SecondUserBox>
                <Snackbar 
                    open={snackbarState}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    message={`${JSON.stringify(secondPlayer)} has joined`}
                    action={action}
                />
                <div>
                    <Button onClick={setFirstReadyState} variant="contained">Ready</Button>
                    {hostState ? <StartButton onClick={onClick} disabled={startButtonDisabled} variant="contained">Start</StartButton> : null}
                </div>
            </LobbyScreenDiv>
        </PageDiv>

    );
}

export default LobbyScreen;
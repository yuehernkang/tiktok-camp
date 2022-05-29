import { Box, Button, Input, Modal, TextField, Typography } from "@mui/material";
import { DataSnapshot, get, getDatabase, ref } from "firebase/database";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled  from "styled-components";
import { setHostState, setRoomIdState, setUiState } from "../../features/uiSlice";
import { createRoom, getRoom } from "../../services/firebase_service";
import { ENTER_NAME_SCREEN, INITIAL_STATE, LOBBY_SCREEN_STATE } from "./states";

export const CreateJoinRoom = () => {
    const name = useSelector((state) => state.name.value)
    const ui = useSelector((state) => state.ui.state)
    const disPatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [roomIdInput, setRoomIdInput] = useState();
    const [submitButtonDisabledState, setsubmitButtonDisabledState] = useState(true);
    const [showErrorMessage, setShowErrorMessageState] = useState(false);
  

    const makeRoom = () => {
        const roomId = createRoom(name);
        roomId.then((result) => {
            disPatch(setUiState(LOBBY_SCREEN_STATE))
            disPatch(setRoomIdState(result));
            disPatch(setHostState(true));
        })
   }
   
   const openJoinRoomModal = () => {
        setShowErrorMessageState(false);
        setsubmitButtonDisabledState(true);
        setOpen(true);
    //    disPatch(setUiState(LOBBY_SCREEN_STATE))
   }

   const backAction = () => {
       setOpen(false);
       disPatch(setUiState(INITIAL_STATE));
   }

   const enterRoom = async () => {
        const db = getDatabase();
        const roomRef = ref(db, 'rooms/' + roomIdInput);
        get(roomRef).then((snapshot) => {
            if (snapshot.exists()) {
                disPatch(setRoomIdState(roomIdInput));
                disPatch(setUiState(LOBBY_SCREEN_STATE))
                console.log(snapshot.val());
              } else {
                setShowErrorMessageState(true);
              }
            })
   }

   const TitleText = styled.h2`
        text-align: center;
   `;

    const ButtonDiv=styled.div`
        display: grid;
        grid-template-columns: 1fr 1fr;
        text-align: center;
        color: '#C0353C';
    `;  

   const CreateButton = styled.button`
        margin: auto;
        border: 3px outset #C0353C;
        background-color: white;
        width: 120px;
        height: 50px;
        font-size: 16px;

        :hover{
            background-color: #C0353C;
            border: 3px outset #FFF;
        }
   `;

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

    const ErrorMessage = styled.div`
        color: red;
        display: ${showErrorMessage ? "block" : "none"};
    `;  

    const handleInputChange = e => {
        e.target.value.length == 4 ? setsubmitButtonDisabledState(false) : setsubmitButtonDisabledState(true);

        console.log(e.target.value);
        setRoomIdInput(e.target.value);
    }

    return (
        <>
            <TitleText>Welcome {name}</TitleText>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Enter Room ID:
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <TextField size="small" onChange={handleInputChange} inputProps={{ maxLength: 4 }}/>
                    &nbsp;
                    <Button variant="contained" size="medium" onClick={enterRoom} disabled={submitButtonDisabledState}>Submit</Button>
                    <ErrorMessage>WRONG ROOM ID</ErrorMessage>
                </Typography>
                </Box>
            </Modal>
            <ButtonDiv>
                <CreateButton onClick={makeRoom}>Create Room</CreateButton>
                <CreateButton onClick={openJoinRoomModal}>Join Room</CreateButton>
            </ButtonDiv>
            <CreateButton onClick={backAction}>Back</CreateButton>
        </>

    );
}
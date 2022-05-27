import { useDispatch, useSelector } from "react-redux";
import styled  from "styled-components";
import { setUiState } from "../../features/uiSlice";
import { createRoom } from "../../services/firebase_service";
import { LOBBY_SCREEN_STATE } from "./states";

export const CreateJoinRoom = () => {
    const name = useSelector((state) => state.name.value)
    const ui = useSelector((state) => state.ui.state)
    const disPatch = useDispatch();

    const makeRoom = () => {
        createRoom();
   }
   
   const joinRoom = () => {
       disPatch(setUiState(LOBBY_SCREEN_STATE))
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

   const CreateJoinButton = styled.button`
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




    return (
        <>
            <TitleText>Welcome {name}</TitleText>
            <ButtonDiv>
                <CreateJoinButton onClick={makeRoom}>Create Room</CreateJoinButton>
                <CreateJoinButton onClick={joinRoom}>Join Room</CreateJoinButton>
            </ButtonDiv>
        </>

    );
}
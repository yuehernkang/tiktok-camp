import styled from 'styled-components';
import { getRoom } from '../../services/firebase_service';
import {LOBBY_SCREEN_STATE, LOGIN_SCREEN_STATE} from './states';

export const InitialScreen = ({state, onStateChange}) => {

    const getRoomData = (roomID) => {
        getRoom(roomID);
        onStateChange(LOBBY_SCREEN_STATE);
    }

    const Title = styled.h1``;

    const InputBox = styled.input``;

    const NiceButtons = styled.button``;
    return (<Title>
        Welcome To TikTok Game
        <InputBox placeholder='Enter Game ID'/>
        <NiceButtons onClick={() => onStateChange(LOGIN_SCREEN_STATE)}>Create New Game</NiceButtons>
        <NiceButtons onClick={() => getRoomData("U3Hg")}>Join Game</NiceButtons>
      </Title>);
}
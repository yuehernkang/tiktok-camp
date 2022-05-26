import styled from 'styled-components';
import React, { useState } from 'react';
import {LobbyScreen} from './states/lobby_screen';
import { LoginScreen } from './states/login_screen';
import { InitialScreen } from './states/initial_screen';
import { ENTER_ROOM_STATE, INITIAL_STATE, LOBBY_SCREEN_STATE, LOGIN_SCREEN_STATE } from './states/states';
import {EnterRoomScreen} from './states/enter_room_screen';


const BoxDiv = styled.div`
  height: 50%;
  width: 50%;
  position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`;

export default function Home() {
  const [uiState, setUIState] = useState(INITIAL_STATE);
  var renderUi = <></>;
  switch(uiState) {
    case INITIAL_STATE:
      renderUi = <InitialScreen state={uiState} onStateChange={setUIState}/>;
      break;
    case LOGIN_SCREEN_STATE:
      renderUi = <LoginScreen state={uiState} onStateChange={setUIState}/>;
      break;
    case LOBBY_SCREEN_STATE:
      renderUi = <LobbyScreen state={uiState} onStateChange={setUIState}/>
    case ENTER_ROOM_STATE: 
      renderUi = <EnterRoomScreen state={uiState} onStateChange={setUIState}/>
  }

  return (
    <BoxDiv>
      {renderUi}
    </BoxDiv>
  )
}

//Enter Game ID
//Search for Game ID in Firebase Realtime Database 'rooms' reference

//Create New Game
//Create New Game based on random 4 letters that does not exist?
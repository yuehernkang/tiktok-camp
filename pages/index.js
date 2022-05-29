import styled from 'styled-components';
import React, { useState } from 'react';
import { LobbyScreen } from './states/lobby_screen';
import { LoginScreen } from './states/login_screen';
import { CREATE_JOIN_ROOM, ENTER_NAME_SCREEN, ENTER_ROOM_STATE, HANGMAN_GAME_STATE, INITIAL_STATE, LOBBY_SCREEN_STATE, LOGIN_SCREEN_STATE } from './states/states';
import { EnterRoomScreen } from './states/enter_room_screen';
import { useSelector } from 'react-redux';
import { CreateJoinRoom } from './states/create_join_room';
import { EnterNameScreen } from './states/enter_name_screen';
import { HangmanScreen } from './states/hangman_screen';


const BoxDiv = styled.div`
  display: grid;
`;

export default function Home() {
  // const [uiState, setUIState] = useState(INITIAL_STATE);
  const uiState = useSelector((state) => state.ui.value)
  const name = useSelector((state) => state.name)
  var renderUi = <></>;
  switch(uiState) {
    case INITIAL_STATE:
      renderUi = <EnterNameScreen/>
      break;
    case LOGIN_SCREEN_STATE:
      renderUi = <LoginScreen/>;
      break;
    case LOBBY_SCREEN_STATE:
      console.log(uiState);
      renderUi = <LobbyScreen/>
      break;
    case ENTER_ROOM_STATE: 
      renderUi = <EnterRoomScreen/>
      break;
    case CREATE_JOIN_ROOM:
      renderUi = <CreateJoinRoom/>
      break;  
    case LOBBY_SCREEN_STATE:
      renderUi = <LobbyScreen />
    case HANGMAN_GAME_STATE:
      renderUi = <HangmanScreen />
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
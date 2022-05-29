import styled from 'styled-components';
import React, { useState } from 'react';
import LobbyScreen  from './states/lobby_screen';
import  LoginScreen  from './states/login_screen';
import Constants from "../app/states";

import EnterRoomScreen from './states/enter_room_screen';
import { useSelector } from 'react-redux';
import CreateJoinRoom from './states/create_join_room';
import EnterNameScreen from './states/enter_name_screen';
import HangmanScreen from './states/hangman_screen';


const BoxDiv = styled.div`
  display: grid;
`;

export default function Home() {
  const uiState = useSelector((state) => state.ui.value)
  const name = useSelector((state) => state.name)
  var renderUi = <></>;
  switch(uiState) {
    case Constants.INITIAL_STATE:
      renderUi = <EnterNameScreen/>
      break;
    case Constants.LOGIN_SCREEN_STATE:
      renderUi = <LoginScreen/>;
      break;
    case Constants.LOBBY_SCREEN_STATE:
      renderUi = <LobbyScreen/>
      break;
    case Constants.ENTER_ROOM_STATE: 
      renderUi = <EnterRoomScreen/>
      break;
    case Constants.CREATE_JOIN_ROOM:
      renderUi = <CreateJoinRoom/>
      break;  
    case Constants.LOBBY_SCREEN_STATE:
      renderUi = <LobbyScreen />
      break;  
    case Constants.HANGMAN_GAME_STATE:
      renderUi = <HangmanScreen />
      break;  
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
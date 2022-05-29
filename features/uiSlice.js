import { createSlice } from '@reduxjs/toolkit';
import Constants from "../app/states";

const initialState = {
    value: Constants.INITIAL_STATE,
    roomId: "",
    host: false
}

export const uiSlice = createSlice({
    name:'ui',
    initialState,
    reducers: {
        setUiState: (state, action) => {
            state.value = action.payload
        },
        setRoomIdState: (state, action) => {
            state.roomId = action.payload
        },
        setHostState: (state, action) => {
            state.host = action.payload
        }
    }
})

export const { setUiState, setRoomIdState, setHostState } = uiSlice.actions;

export default uiSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import { CREATE_JOIN_ROOM, INITIAL_STATE } from '../pages/states/states';

const initialState = {
    value: INITIAL_STATE
}

export const uiSlice = createSlice({
    name:'ui',
    initialState,
    reducers: {
        setUiState: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setUiState } = uiSlice.actions;

export default uiSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: "Guest"
}

export const nameSlice = createSlice({
    name:'name',
    initialState,
    reducers: {
        setName: (state, action) => {
            state = action.payload
        }
    }
})

export const { setName } = nameSlice.actions;

export default nameSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

export const userInfoSlice = createSlice({
    name: 'userInfoSlice',
    initialState: {
        userInfo: {}
    } as any,
    reducers: {
        adduserInfo: (state, action) => {
            state.userInfo = action.payload;
        }
    }
})



export const { adduserInfo ,} = userInfoSlice.actions;

// this is for configureStore
export default userInfoSlice.reducer;
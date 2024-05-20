import { createSlice } from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: '1234',
                text: action.payload,
            };
        }
    }
})



export const { addTodo } = dashboardSlice.actions;

// this is for configureStore
export default dashboardSlice.reducer;
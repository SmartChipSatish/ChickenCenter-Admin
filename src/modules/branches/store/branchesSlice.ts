import { createSlice } from '@reduxjs/toolkit';

export const branchesSlice = createSlice({
    name: 'branches',
    initialState: {
        isBrannch: true
    },
    reducers: {
        isBrannch: (state, action) => {
            state.isBrannch = action.payload
        }
    }
})



export const { isBrannch } = branchesSlice.actions;

// this is for configureStore
export default branchesSlice.reducer;
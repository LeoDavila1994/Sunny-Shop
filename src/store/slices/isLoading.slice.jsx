import { createSlice } from '@reduxjs/toolkit';

export const isLoadinSlice = createSlice({
    name: 'isLoading',
    initialState: false,
    reducers: {
        setIsLoading: (_state, action) => {
            const isLoading = action.payload;
            return isLoading;
        }
    }
})

export const { setIsLoading } = isLoadinSlice.actions;

export default isLoadinSlice.reducer;

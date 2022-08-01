import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import getConfig from "../../utils/getConfig"

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (_state, action) => {
            const myPurchases = action.payload;
            return myPurchases;
        }
    }
})

export const purchasesThunk = () => (dispatch) => {
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/purchases`, getConfig())
        .then(res => dispatch(setPurchases(res.data)))
}

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;

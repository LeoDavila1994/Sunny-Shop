import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from "../../utils/getConfig"

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (_state, action) =>{
            const cart = action.payload;
            return cart
        }

    }
});

export const getCartThunk = () => (dispatch) => {
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then(res => dispatch(setCart(res.data)))
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;

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

export const addProductsThunk = add => (dispatch) => {
    return axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, add, getConfig())
        .then(() => dispatch(getCartThunk()))
}

export const checkOutThunk = () => (dispatch) => {
    return axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/purchases`, {}, getConfig())
        .then(() => dispatch(setCart([])))
        .catch(error => console.log(error.response))
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;

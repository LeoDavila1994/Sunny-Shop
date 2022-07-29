import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";



export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (_state, action) => {
            const products = action.payload;
            return products;
        }
    }
})

export const getProductsThunk = () => (dispatch) => {
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
        .then(res => dispatch(setProducts(res.data.data.products)))
}

export const filterInputThunk = inputValue => (dispatch) => {
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${inputValue}`)
        .then(res => dispatch(setProducts(res.data.data.products)))

}

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;

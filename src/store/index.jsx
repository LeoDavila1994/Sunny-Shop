import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/products.slice';
import purchasesSlice from './slices/purchases.slice';

export default configureStore({
    reducer: {
        products: productsSlice,
        purchases: purchasesSlice
    }
})
